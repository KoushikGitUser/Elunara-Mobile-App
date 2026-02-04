import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
} from "react-native";
import { useEffect, useMemo, useRef, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";
import {
  setSelecetdFiles,
  clearUploadedAttachmentIds,
  setChatMessagesArray,
  setMessageIDsArray,
  setCurrentAIMessageIndexForRegeneration,
} from "../../redux/slices/globalDataSlice";
import { setToggleIsChattingWithAI } from "../../redux/slices/toggleSlice";

const Rooms = ({ route }) => {
  const { roomName, roomUuid } = route.params || {};
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates, chatCustomisationStates } = useSelector((state) => state.Toggle);
  const { roomsStates, chatsStates } = useSelector((state) => state.API);
  const { globalDataStates } = useSelector((state) => state.Global);
  const translateX = useRef(new Animated.Value(0)).current;

  // Track which chat ID we've already sent first message for (simple single-ref approach)
  const sentFirstMessageForChatIdRef = useRef(null);
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

  // Clear chat state when entering Rooms screen (like ChatScreen does)
  useFocusEffect(
    useCallback(() => {
      dispatch(setChatMessagesArray([]));
      dispatch(setMessageIDsArray([]));
      dispatch(setCurrentAIMessageIndexForRegeneration(null));
      dispatch(setToggleIsChattingWithAI(false));
      // Note: DO NOT reset sentFirstMessageForChatIdRef here - it tracks which chat ID
      // was already processed globally, resetting would cause duplicate sends
    }, [])
  );

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

      // Add LLM ID if not null
      if (chatCustomisationStates?.selectedLLM?.id !== null) {
        messageData.llm_id = typeof chatCustomisationStates.selectedLLM.id === 'number'
          ? chatCustomisationStates.selectedLLM.id
          : parseInt(chatCustomisationStates.selectedLLM.id);
      }

      // Add Response Style ID if not null
      if (chatCustomisationStates?.selectedResponseStyle?.id !== null) {
        messageData.response_style_id = typeof chatCustomisationStates.selectedResponseStyle.id === 'number'
          ? chatCustomisationStates.selectedResponseStyle.id
          : parseInt(chatCustomisationStates.selectedResponseStyle.id);
      }

      // Add Language ID if not null
      if (chatCustomisationStates?.selectedLanguage?.id !== null) {
        messageData.language_id = typeof chatCustomisationStates.selectedLanguage.id === 'number'
          ? chatCustomisationStates.selectedLanguage.id
          : parseInt(chatCustomisationStates.selectedLanguage.id);
      }

      // Add Citation Format ID if not null
      if (chatCustomisationStates?.selectedCitationFormat?.id !== null) {
        messageData.citation_format_id = typeof chatCustomisationStates.selectedCitationFormat.id === 'number'
          ? chatCustomisationStates.selectedCitationFormat.id
          : parseInt(chatCustomisationStates.selectedCitationFormat.id);
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
      style={[styles.mainWrapper, { marginTop: -StatusBar.currentHeight }]}
    >
      <StatusBar
        backgroundColor="#000000ff"
        barStyle="dark-content"
        hidden={false}
        translucent={false}
        animated
      />
      {toggleStates.toggleDeleteChatConfirmPopup && (
        <DeleteConfirmPopup from="rooms" />
      )}
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
            height: StatusBar.currentHeight,
            width: "100%",
            backgroundColor: "#FAFAFA",
            zIndex: 9999,
          }}
        ></View>
        <RoomsHeader translateX={translateX} />
        {toggleStates.toggleIsChattingWithAI ? (
          <ChatMiddleWrapper isFromRooms={true} />
        ) : (
          <RoomsMiddle roomName={roomName} />
        )}
        <View style={{ width: "100%", paddingHorizontal: 20 }}>
          <ChatInputMain roomId={roomsStates.currentRoom?.uuid} isRoomContext={true} />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Rooms;
