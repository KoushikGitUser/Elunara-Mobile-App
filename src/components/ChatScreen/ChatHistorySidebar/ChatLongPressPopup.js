import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { useDispatch, useSelector } from "react-redux";
import { scaleFont } from "../../../utils/responsive";
import folder from "../../../assets/images/Folder.png";
import archive from "../../../assets/images/Archive.png";
import archiveBox from "../../../assets/images/ArchiveBox.png";
import pencil from "../../../assets/images/PencilSimple.png";
import deleteBin from "../../../assets/images/Trash.png";
import pin from "../../../assets/images/PushPin.png";
import pinGrey from "../../../assets/images/pinGrey.png";
import chat from "../../../assets/images/ChatTeardrop.png";
import {
  setToggleAddChatToLearningLabPopup,
  setToggleChatActionsPopupOnLongPress,
  setToggleDeleteChatConfirmPopup,
  setToggleRenameChatPopup,
} from "../../../redux/slices/toggleSlice";
import ChatIcon from "../../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/ChatIcon";
import { triggerToast } from "../../../services/toast";
import { setDeleteConfirmPopupFrom } from "../../../redux/slices/globalDataSlice";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";

const ChatLongPressPopup = () => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);
  const { chatsStates } = useSelector((state) => state.API);

  // Dynamic actions based on is_pinned and is_archived states
  const isPinned = chatsStates.allChatsDatas.currentActionChatDetails?.is_pinned;
  const isArchived = chatsStates.allChatsDatas.currentActionChatDetails?.is_archived;

  const actions = [
    { title: "Add to Learning Lab", icon: folder },
    { title: "Rename", icon: pencil },
    {
      title: isPinned ? "Unpin" : "Pin",
      icon: isPinned ? pinGrey : pin
    },
    {
      title: isArchived ? "Unarchive" : "Archive",
      icon: isArchived ? archiveBox : archive
    },
    { title: "Delete", icon: deleteBin },
  ];

  const truncateTitle = (title, limit = 20) => {
    if (title.length <= limit) return title;
    return title.slice(0, limit) + "...";
  };

  const commonFunction = (title) => {
    if (title == 0) {
      dispatch(setToggleAddChatToLearningLabPopup(true));
    } else if (title == 1) {
      dispatch(setToggleRenameChatPopup(true));
    } else if (title == 2) {
      // Pin/Unpin API call
      const chatId = chatsStates.allChatsDatas.currentActionChatDetails?.id;
      const action = isPinned ? "unpin" : "pin";

      if (!chatId) {
        triggerToast("Error", "Chat ID not found", "error", 3000);
        return;
      }

      const payload = {
        method: "POST",
        url: `/chats/${chatId}/${action}`,
        name: "pinOrUnpinChat"
      };

      dispatch(commonFunctionForAPICalls(payload));
      dispatch(setToggleChatActionsPopupOnLongPress(false));
    } else if (title == 3) {
      // Archive/Unarchive API call
      const chatId = chatsStates.allChatsDatas.currentActionChatDetails?.id;
      const action = isArchived ? "unarchive" : "archive";

      if (!chatId) {
        triggerToast("Error", "Chat ID not found", "error", 3000);
        return;
      }

      const payload = {
        method: "POST",
        url: `/chats/${chatId}/${action}`,
        name: "archiveOrUnarchiveChat"
      };

      dispatch(commonFunctionForAPICalls(payload));
      dispatch(setToggleChatActionsPopupOnLongPress(false));
    } else if (title == 4) {
      dispatch(setToggleDeleteChatConfirmPopup(true));
      dispatch(setDeleteConfirmPopupFrom("chat"));
    }
  };

  const dispatch = useDispatch();
  return (
    <Modal
      visible={toggleStates.toggleChatActionsPopupOnLongPress}
      transparent={true}
      animationType="fade"
      onRequestClose={() =>
        dispatch(setToggleChatActionsPopupOnLongPress(false))
      }
    >
      <View style={styles.container}>
        {/* Blur Background */}
        <BlurView style={styles.blurView} blurType="light" blurAmount={7} />
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => dispatch(setToggleChatActionsPopupOnLongPress(false))}
        />

        {/* Highlighted Message (shown at its original position) */}
        <View
          style={[
            styles.highlightedMessage,
            {
              position: "relative",
              left: 20,
            },
          ]}
        >
          <ChatIcon />
          <Text style={styles.messageText}>
            {" "}
            {truncateTitle(globalDataStates.chatTitleOnLongPress)}{" "}
          </Text>
          <View
            style={[
              styles.modalSheet,
              {
                position: "absolute",
                right: 0,
                backgroundColor: "white",
                top: 60,
              },
            ]}
          >
            {/* Content */}
            <View style={styles.content}>
              {actions.map((item, index) => (
                <Pressable
                  key={index}
                  style={({ pressed }) => [
                    styles.actionButton,
                    pressed && styles.actionButtonPressed, // applies background when pressed
                  ]}
                  onPress={() => {
                    dispatch(setToggleChatActionsPopupOnLongPress(false));
                    commonFunction(index);
                  }}
                >
                  <View style={styles.actionIcon}>
                    <Image
                      style={{ height: 20, width: 20, resizeMode: "contain" }}
                      source={item.icon}
                    />
                  </View>
                  <Text style={styles.actionText}>{item.title}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Action Menu Popup */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#0000004e",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  highlightedMessage: {
    backgroundColor: "#ffffffff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    maxWidth: "70%",
    top: "40%",
    right: 16,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    justifyContent: "flex-start",
  },
  messageText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "400",
  },
  modalSheet: {
    backgroundColor: "white",
    borderRadius: 18,
    minWidth: 180,
    overflow: "hidden",
    top: 60,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    paddingHorizontal: 5,
  },
  content: {
    paddingVertical: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    paddingRight: 25,
    borderRadius: 16,
  },
  actionButtonPressed: {
    backgroundColor: "#EEF4FF",
  },
  actionIcon: {
    marginRight: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 18,
  },
  actionText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "400",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 16,
  },
  // Remove unused styles
  btnsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  verifiedIcon: {
    height: 55,
    width: 50,
    objectFit: "contain",
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: scaleFont(23),
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(12),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    letterSpacing: 0.2,
  },
  button: {
    width: "48%",
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(11),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});

export default ChatLongPressPopup;
