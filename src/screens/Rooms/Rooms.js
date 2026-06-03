import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
  Platform,
  Modal,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useEffect, useMemo, useRef, useCallback } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { createStyles } from "./Rooms.styles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import RoomsHeader from "../../components/Rooms/RoomsHeader";
import ChatInputMain from "../../components/ChatScreen/ChatInputMain";
import RoomsMiddle from "../../components/Rooms/RoomsMiddle";
import ChatMiddleWrapper from "../../components/ChatScreen/ChatMiddleSection/ChatMiddleWrapper";
import ChatHistorySidebar from "../../components/ChatScreen/ChatHistorySidebar/ChatHistorySidebar";
import AddChatToRoomPopup from "../../components/Rooms/AddChatToRoomPopup";
import { useFonts } from "expo-font";
import DeleteConfirmPopup from "../../components/ChatScreen/ChatMiddleSection/ChatConversationActions/DeleteConfirmPopup";
import RenameChatPopup from "../../components/ChatScreen/ChatMiddleSection/ChatConversationActions/RenameChatPopup";
import RoomToolsOptionsPopup from "../../components/Rooms/RoomToolsPopup/RoomToolsOptionsPopup";
import TopicsCompo from "../../components/ChatScreen/ChatInputCompos/TopicsCompo";
import ToasterWithAction from "../../components/UniversalToaster/ToasterWithAction";
import ChangeLLMPopup from "../../components/ChatScreen/Messages/ChatQuickActionsPopups/ChangeResponse/ChangeLLMPopup";
import ChangeLangPopup from "../../components/ChatScreen/Messages/ChatQuickActionsPopups/ChangeLang/ChangeLangPopup";
import ChangeResponseStylePopup from "../../components/ChatScreen/Messages/ChatQuickActionsPopups/ChangeStyle/ChangeResponseStylePopup";
import NotHelpfulFeedbackPopup from "../../components/ChatScreen/Messages/ChatQuickActionsPopups/Feedback/NotHelpfulFeedbackPopup";
import UserMessageActionPopup from "../../components/ChatScreen/Messages/UserMessageActionPopup";
import ChatLongPressPopup from "../../components/ChatScreen/ChatHistorySidebar/ChatLongPressPopup";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";
import {
  setSelecetdFiles,
  clearUploadedAttachmentIds,
  setChatMessagesArray,
  setMessageIDsArray,
  setCurrentAIMessageIndexForRegeneration,
} from "../../redux/slices/globalDataSlice";
import { setToggleIsChattingWithAI, initializeRoomCustomisation } from "../../redux/slices/toggleSlice";

const Rooms = ({ route }) => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === 'ios' ? insets.top : (StatusBar.currentHeight || 0);
  const { roomName, roomUuid } = route.params || {};
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates, chatCustomisationStates, roomCustomisationStates } = useSelector((state) => state.Toggle);
  const { roomsStates, chatsStates } = useSelector((state) => state.API);
  const { globalDataStates } = useSelector((state) => state.Global);
  const translateX = useRef(new Animated.Value(0)).current;

  // Track which chat ID we've already sent first message for (simple single-ref approach)
  const sentFirstMessageForChatIdRef = useRef(null);
  // Track which messageIDsArray we've already copied into globalDataStates, so
  // the picker effect below doesn't keep re-dispatching on every re-render.
  const lastProcessedMessagesRef = useRef(null);
  const isChatCreatedWithAI = chatsStates?.loaderStates?.isChatCreatedWithAI;
  const createdChatDetails = chatsStates?.allChatsDatas?.createdChatDetails;
  const [fontsLoaded] = useFonts({
    "Mukta-Bold": require("../../../assets/fonts/Mukta-Bold.ttf"),
    "Mukta-Regular": require("../../../assets/fonts/Mukta-Regular.ttf"),
  });

  useEffect(() => {
    const uuid = roomUuid || roomsStates.currentRoom?.uuid;
    if (uuid) {
      dispatch(
        commonFunctionForAPICalls({
          method: "GET",
          url: `/rooms/${uuid}`,
          name: "get-room",
        }),
      );
    }
  }, [roomUuid]);

  // Keep roomCustomisationStates in sync with the loaded room. Without this,
  // chats sent from inside Rooms would use the default null tools instead of
  // the room's saved llm / response style / language / citation. This also
  // re-runs after AddRoomDetails saves edits (which updates currentRoom server-
  // side), so changes flow back into Rooms automatically.
  useEffect(() => {
    if (!roomsStates.currentRoom) return;
    dispatch(
      initializeRoomCustomisation({
        llm: roomsStates.currentRoom.llm || { id: null, name: "Auto" },
        response_style: roomsStates.currentRoom.response_style || { id: null, name: "Auto" },
        response_language: roomsStates.currentRoom.response_language || { id: null, name: "English" },
        citation_format: roomsStates.currentRoom.citation_format || { id: null, name: "Harvard" },
      })
    );
  }, [
    roomsStates.currentRoom?.uuid,
    roomsStates.currentRoom?.llm?.id,
    roomsStates.currentRoom?.response_style?.id,
    roomsStates.currentRoom?.response_language?.id,
    roomsStates.currentRoom?.citation_format?.id,
  ]);

  // Clear chat state on FIRST focus only (initial mount of this Rooms
  // instance). Subsequent re-focuses (e.g., user navigates to Notes / Profile
  // / AddRoomDetails and comes back) MUST NOT clear — otherwise an in-room
  // chat the user was viewing gets wiped, AND it leaves the picker effect's
  // lastProcessedMessagesRef out of sync (it still holds the old key, so
  // re-tapping the same chat won't re-populate the array → blank chat).
  //
  // Different room (different roomUuid in route params) → new Rooms mount →
  // fresh isFirstFocusRef → clear fires again. So switching between rooms
  // still starts blank.
  const isFirstFocusRef = useRef(true);
  useFocusEffect(
    useCallback(() => {
      if (!isFirstFocusRef.current) return;
      isFirstFocusRef.current = false;
      dispatch(setChatMessagesArray([]));
      dispatch(setMessageIDsArray([]));
      dispatch(setCurrentAIMessageIndexForRegeneration(null));
      dispatch(setToggleIsChattingWithAI(false));
      // Note: DO NOT reset sentFirstMessageForChatIdRef here - it tracks which chat ID
      // was already processed globally, resetting would cause duplicate sends
    }, [])
  );

  // Pick up fetched messages from chat history and copy them into
  // globalDataStates.chatMessagesArray / messageIDsArray.
  //
  // Background: `getAllMessagesOfParticularChat`'s fulfilled handler writes the
  // transformed messages into `chatsStates.allChatsDatas.fetchedMessages` (a
  // staging slot), not directly into the global slice that ChatMiddleWrapper
  // reads. ChatScreen has the same effect (ChatScreen.js:462-487). Without it
  // here, the loader closes (since isAllMessagesOfChatFetched flips to true)
  // but the messages never make it into the array ChatMiddleWrapper renders —
  // so the room chat appears blank forever after the loader vanishes.
  useEffect(() => {
    const fetched = chatsStates?.allChatsDatas?.fetchedMessages;
    if (
      chatsStates?.loaderStates?.isAllMessagesOfChatFetched === true &&
      fetched
    ) {
      const messagesKey = JSON.stringify(fetched.messageIDsArray);
      if (lastProcessedMessagesRef.current === messagesKey) return;
      lastProcessedMessagesRef.current = messagesKey;
      dispatch(setChatMessagesArray(fetched.chatMessagesArray));
      dispatch(setMessageIDsArray(fetched.messageIDsArray));
    }
  }, [
    chatsStates?.loaderStates?.isAllMessagesOfChatFetched,
    chatsStates?.allChatsDatas?.fetchedMessages,
  ]);

  // Reset the picker's dedup ref whenever chatMessagesArray is cleared
  // externally (e.g., user taps "New Chat" in PlusButtonPopup which dispatches
  // setChatMessagesArray([])). Without this, re-tapping the SAME chat after
  // the array is cleared would no-op: the fetch completes with the identical
  // messageIDsArray → same messagesKey → matches the ref → picker dedupes →
  // array stays empty forever.
  useEffect(() => {
    if (globalDataStates.chatMessagesArray.length === 0) {
      lastProcessedMessagesRef.current = null;
    }
  }, [globalDataStates.chatMessagesArray.length]);

  // Reset chat state only when Rooms is actually popped off the stack (e.g.,
  // native back to ChatScreen). Uses ONLY `beforeRemove` — it fires
  // exclusively when this screen is being removed from the navigator state,
  // never on push navigation (Rooms → Notes / AddRoomDetails / Profile).
  //
  // Previously had a `transitionStart` listener gated by `e.data.closing` for
  // the iOS swipe-back glitch fix. In practice that event fired on push too
  // — clearing the chat as soon as the user navigated to Notes — which broke
  // the "return from Notes shows ongoing chat" behavior. Trade-off accepted:
  // beforeRemove fires before the swipe-back animation completes, so any
  // residual flash of stale chat during the iOS animation is minor and the
  // Notes-persistence is far more important.
  useEffect(() => {
    const unsub = navigation.addListener("beforeRemove", () => {
      dispatch(setChatMessagesArray([]));
      dispatch(setMessageIDsArray([]));
      dispatch(setCurrentAIMessageIndexForRegeneration(null));
      dispatch(setToggleIsChattingWithAI(false));
    });
    return unsub;
  }, [navigation]);

  // When chat is created, send first message to get AI response (only when Rooms is focused)
  // IMPORTANT: Only handle chats that were created WITH a room (to avoid conflict with ChatScreen)
  useFocusEffect(
    useCallback(() => {
      // Only proceed if chat was just created
      if (isChatCreatedWithAI !== true || !createdChatDetails?.id) {
        return;
      }

      // Only proceed if this chat was created from a room (has room info in response)
      // This prevents conflict with ChatScreen which handles non-room chats
      const isRoomChat = createdChatDetails?.room || createdChatDetails?.room_id;
      if (!isRoomChat) {
        console.log("🟣 ROOMS: Chat has no room info, skipping (ChatScreen will handle)");
        return;
      }

      // Skip if we've already sent for this exact chat ID
      if (sentFirstMessageForChatIdRef.current === createdChatDetails.id) {
        console.log("🟣 ROOMS: Already sent for this chat ID, skipping");
        return;
      }

      // Mark as sent for this chat ID BEFORE dispatching
      sentFirstMessageForChatIdRef.current = createdChatDetails.id;
      const chatId = createdChatDetails.id;

      console.log("═══════════════════════════════════════════════════════");
      console.log("🟣 ROOMS: Chat created WITH ROOM, sending first message");
      console.log("🟣 Chat ID:", chatId);
      console.log("🟣 Room info:", JSON.stringify(createdChatDetails?.room));
      console.log("🟣 uploadedAttachmentIds from Redux:", JSON.stringify(globalDataStates.uploadedAttachmentIds));
      console.log("🟣 chatMessagesArray:", JSON.stringify(globalDataStates.chatMessagesArray));

      const messageData = {
        content:
          globalDataStates.chatMessagesArray[
            globalDataStates.chatMessagesArray.length - 1
          ]?.message || "Hello",
        content_type: "text",
        attachment_ids: globalDataStates.uploadedAttachmentIds || [],
      };

      // First message of a newly-created room chat MUST use the ROOM's tools,
      // not the global chat tools — chats inside a room inherit the room's
      // customisation. Subsequent messages already use room tools via
      // ChatInputMain (isRoomContext={true}).
      if (roomCustomisationStates?.selectedRoomLLM?.id !== null) {
        messageData.llm_id = typeof roomCustomisationStates.selectedRoomLLM.id === 'number'
          ? roomCustomisationStates.selectedRoomLLM.id
          : parseInt(roomCustomisationStates.selectedRoomLLM.id);
      }

      if (roomCustomisationStates?.selectedRoomResponseStyle?.id !== null) {
        messageData.response_style_id = typeof roomCustomisationStates.selectedRoomResponseStyle.id === 'number'
          ? roomCustomisationStates.selectedRoomResponseStyle.id
          : parseInt(roomCustomisationStates.selectedRoomResponseStyle.id);
      }

      if (roomCustomisationStates?.selectedRoomLanguage?.id !== null) {
        messageData.language_id = typeof roomCustomisationStates.selectedRoomLanguage.id === 'number'
          ? roomCustomisationStates.selectedRoomLanguage.id
          : parseInt(roomCustomisationStates.selectedRoomLanguage.id);
      }

      if (roomCustomisationStates?.selectedRoomCitationFormat?.id !== null) {
        messageData.citation_format_id = typeof roomCustomisationStates.selectedRoomCitationFormat.id === 'number'
          ? roomCustomisationStates.selectedRoomCitationFormat.id
          : parseInt(roomCustomisationStates.selectedRoomCitationFormat.id);
      }

      const payload = {
        method: "POST",
        url: `/chats/${chatId}/messages`,
        data: messageData,
        name: "sendPromptAndGetMessageFromAI",
      };

      console.log("🟣 ROOMS: Full API payload:", JSON.stringify(payload, null, 2));
      console.log("═══════════════════════════════════════════════════════");

      dispatch(commonFunctionForAPICalls(payload));

      // Clear attachments after sending
      dispatch(setSelecetdFiles([]));
      dispatch(clearUploadedAttachmentIds());
    }, [isChatCreatedWithAI, createdChatDetails?.id])
  );

  useEffect(() => {
    if (fontsLoaded) {
    }
  }, [fontsLoaded]);

  // Show nothing (or a loader) while fonts are loading
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={[styles.mainWrapper, { marginTop: -statusBarHeight }]}
    >
      <StatusBar
        backgroundColor="#000000ff"
        barStyle="dark-content"
        hidden={false}
        translucent={false}
        animated
      />
      {/* Full-screen loader while a room chat's messages are being fetched */}
      {chatsStates?.loaderStates?.isAllMessagesOfChatFetched === "pending" && (
        <Modal visible={true} transparent={true} animationType="fade">
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/authLoader.gif")}
              style={{ width: 150, height: 150 }}
            />
          </View>
        </Modal>
      )}
      {toggleStates.toggleDeleteChatConfirmPopup && (
        <DeleteConfirmPopup from="rooms" />
      )}
      {/* Rename popup is shared with ChatScreen / AllChats — RenameChatPopup
          internally decides whether to rename a room or a chat based on
          whether currentActionChatDetails is set (chat) or not (room). */}
      {toggleStates.toggleRenameChatPopup && <RenameChatPopup />}
      {/* In Rooms the tools button opens the ROOM tools popup (reads/writes
          roomCustomisationStates). Changes are in-memory only — they affect
          the next chat message but don't persist to the room on the server
          (only AddRoomDetails → Save does that). ChatScreen renders the
          regular ToolsOptionsPopup for its own chat tools — unchanged. */}
      {toggleStates.toggleRoomToolsPopup && <RoomToolsOptionsPopup />}
      {/* Topics / Subjects popup is a Modal — needs to be mounted in the
          currently visible screen so it can render above Rooms on the native
          stack. */}
      {toggleStates.toggleTopicsPopup && <TopicsCompo />}
      {/* ToasterWithAction is the toaster variant used by triggerToastWithAction
          (e.g. "Response saved in note" → "View" action). Without it mounted
          here, only the plain triggerToast() toasts show — which is why
          "removed from notes" worked but "added to notes" didn't. */}
      <ToasterWithAction />
      {/* Regeneration / message-action popups — Modals that must be mounted in
          the currently visible screen on the native stack. Same as ChatScreen's
          ChatQuickActionsPopups renders. */}
      {toggleStates.toggleChangeResponseLLMWhileChatPopup && <ChangeLLMPopup />}
      {toggleStates.toggleChangeLangWhileChatPopup && <ChangeLangPopup />}
      {toggleStates.toggleChangeResponseStyleWhileChatPopup && (
        <ChangeResponseStylePopup />
      )}
      {toggleStates.toggleNotHelpfulFeedbackPopup && <NotHelpfulFeedbackPopup />}
      {toggleStates.toggleUserMessageActionPopup && <UserMessageActionPopup />}
      {toggleStates.toggleChatActionsPopupOnLongPress &&
        !globalDataStates.manualGuidedTourRunning && <ChatLongPressPopup />}
      <ChatHistorySidebar translateX={translateX} />
      {toggleStates.toggleAddExistingChatToRoomPopup && <AddChatToRoomPopup />}

      <Animated.View
        style={[
          styles.mainWrapper,
          {
            flex: 1,
            transform: [{ translateX }],
            width: "100%",
            paddingHorizontal: 0,
          },
        ]}
      >
        <View
          style={{
            height: statusBarHeight,
            width: "100%",
            backgroundColor: "#FAFAFA",
            zIndex: 9999,
          }}
        ></View>
        {/* Middle area + overlay header. The middle (RoomsMiddle ScrollView or
            ChatMiddleWrapper) fills this flex:1 container. RoomsHeader is
            absolute-positioned at top:0 with zIndex so content scrolls behind
            it. Both middles already include paddingTop in their scroll content
            so first items aren't hidden under the header (RoomsMiddle: 100,
            ChatMiddleWrapper greetings: 100, ChatMiddleWrapper chatting: 120). */}
        <View style={{ flex: 1, width: "100%", position: "relative" }}>
          {toggleStates.toggleIsChattingWithAI ? (
            <ChatMiddleWrapper isFromRooms={true} />
          ) : (
            <RoomsMiddle roomName={roomName} />
          )}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 999,
              }}
            >
              <RoomsHeader translateX={translateX} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          {/* zIndex/elevation: the AddItemsToInputPopup inside ChatInputMain
              uses position:absolute and extends UP above the input. Without
              an explicit stack above the flex:1 middle container, the popup
              gets visually covered by the middle area. */}
          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
              marginBottom: -insets.bottom + 8,
              zIndex: 1000,
              elevation: 1000,
            }}
          >
            <ChatInputMain roomId={roomsStates.currentRoom?.uuid} isRoomContext={true} />
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Rooms;
