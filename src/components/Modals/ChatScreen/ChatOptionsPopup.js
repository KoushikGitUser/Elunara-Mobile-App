import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
  Image,
} from "react-native";
import React, { useMemo } from "react";
import { createStyles } from "./chatModals.styles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { menuOptions } from "../../../data/datas";
import { moderateScale } from "../../../utils/responsive";
import {
  setToggleAddChatToLearningLabPopup,
  setToggleChatMenuPopup,
  setToggleDeleteChatConfirmPopup,
  setToggleRenameChatPopup,
  setToggleUnlockArchiveLimitPopup,
} from "../../../redux/slices/toggleSlice";
import { triggerToast } from "../../../services/toast";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";
import archiveBox from "../../../assets/images/ArchiveBox.png";
import deleteBin from "../../../assets/images/deleteBin.png";
import pin from "../../../assets/images/PushPin.png";
import pinGrey from "../../../assets/images/pinGrey.png";
import archive from "../../../assets/images/Archive.png";
import folder from "../../../assets/images/FolderSimple.png";
import pencil from "../../../assets/images/PencilSimple.png";
import { useEffect } from "react";
import bookmarkIcon from "../../../assets/images/BookmarkSimple.png";

const ChatOptionsPopup = ({ chatUuid }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { toggleStates } = useSelector((state) => state.Toggle);
  const { chatsStates } = useSelector((state) => state.API);
  const { width, height } = Dimensions.get("window");

  const chatId = chatsStates.allChatsDatas.createdChatDetails?.id;

  // Fetch chat details when popup opens
  useEffect(() => {
    if (toggleStates.toggleChatMenuPopup && chatId) {
      const payload = {
        method: "GET",
        url: `/chats/${chatId}`,
        name: "getAllDetailsOfChatByID",
      };
      dispatch(commonFunctionForAPICalls(payload));
    }
  }, [toggleStates.toggleChatMenuPopup, chatId]);

  // Dynamic actions based on is_pinned and is_archived states
  const currentChatDetails = chatsStates.allChatsDatas.currentActionChatDetails;
  const createdChatDetails = chatsStates.allChatsDatas.createdChatDetails;
  const isPinned =
    currentChatDetails?.is_pinned || createdChatDetails?.is_pinned;
  // Check both possible field names from API
  const isArchived =
    currentChatDetails?.is_archived ||
    currentChatDetails?.archived ||
    createdChatDetails?.is_archived ||
    createdChatDetails?.archived;

  // Check if chat already belongs to a room
  const hasRoom =
    currentChatDetails?.room ||
    currentChatDetails?.room_id ||
    createdChatDetails?.room ||
    createdChatDetails?.room_id;

  // Show limited options when chat is archived
  const actions = isArchived
    ? [
        { title: "Unarchive", icon: archiveBox, action: "unarchive" },
        { title: "Delete", icon: deleteBin, action: "delete" },
      ]
    : [
        { title: "Open Notes", icon: bookmarkIcon, action: "openNotes" },
        ...(!hasRoom
          ? [
              {
                title: "Add to Learning Lab",
                icon: folder,
                action: "addToLearningLab",
              },
            ]
          : []),
        { title: "Rename", icon: pencil, action: "rename" },
        {
          title: isPinned ? "Unpin" : "Pin",
          icon: isPinned ? pinGrey : pin,
          action: "pinUnpin",
        },
        { title: "Archive", icon: archive, action: "archive" },
        { title: "Delete", icon: deleteBin, action: "delete" },
      ];

  const commonFunctions = (actionType) => {
    if (actionType === "openNotes") {
      dispatch(setToggleChatMenuPopup(false));
      navigation.navigate("notes");
    } else if (actionType === "addToLearningLab") {
      dispatch(setToggleChatMenuPopup(false));
      dispatch(setToggleAddChatToLearningLabPopup(true));
    } else if (actionType === "rename") {
      dispatch(setToggleChatMenuPopup(false));
      dispatch(setToggleRenameChatPopup(true));
    } else if (actionType === "pinUnpin") {
      if (!chatId) {
        triggerToast("Error", "Chat ID not found", "error", 3000);
        return;
      }

      const action = isPinned ? "unpin" : "pin";
      const payload = {
        method: "POST",
        url: `/chats/${chatId}/${action}`,
        name: "pinOrUnpinChat",
      };

      dispatch(commonFunctionForAPICalls(payload));
      dispatch(setToggleChatMenuPopup(false));
    } else if (actionType === "archive" || actionType === "unarchive") {
      if (!chatId) {
        triggerToast("Error", "Chat ID not found", "error", 3000);
        return;
      }

      const action = isArchived ? "unarchive" : "archive";
      const payload = {
        method: "POST",
        url: `/chats/${chatId}/${action}`,
        name: "archiveOrUnarchiveChat",
      };

      dispatch(commonFunctionForAPICalls(payload));
      dispatch(setToggleChatMenuPopup(false));
    } else if (actionType === "delete") {
      dispatch(setToggleChatMenuPopup(false));
      dispatch(setToggleDeleteChatConfirmPopup(true));
    }
  };

  return (
    <View
      style={{
        backgroundColor: "transparent",
        position: "absolute",
        width,
        height,
        top: -5,
        left: 0,
        zIndex: 99,
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => dispatch(setToggleChatMenuPopup(false))}
      >
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <View style={[styles.menuModalMain, isArchived && { minHeight: "auto" }]}>
        {actions.map((actionItem, actionIndex) => {
          return (
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#EEF4FF" : "transparent",
                },
                styles.menuOptionsMain,
              ]}
              onPress={(e) => {
                e.stopPropagation();
                commonFunctions(actionItem.action);
              }}
              key={actionIndex}
            >
              <Image
                style={{ height: 20, width: 20, resizeMode: "contain" }}
                source={actionItem.icon}
              />
              <Text
                numberOfLines={1}
                style={{
                  fontSize: moderateScale(16),
                  flexShrink: 1,
                  fontFamily: "Mukta-Regular",
                }}
              >
                {actionItem.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default ChatOptionsPopup;
