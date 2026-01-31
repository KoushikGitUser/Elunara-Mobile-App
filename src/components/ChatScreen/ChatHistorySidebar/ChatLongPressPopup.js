import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { useDispatch, useSelector } from "react-redux";
import { scaleFont, moderateScale } from "../../../utils/responsive";
import folder from "../../../assets/images/Folder.png";
import archive from "../../../assets/images/Archive.png";
import archiveBox from "../../../assets/images/ArchiveBox.png";
import pencil from "../../../assets/images/PencilSimple.png";
import deleteBin from "../../../assets/images/Trash.png";
import pin from "../../../assets/images/PushPin.png";
import pinGrey from "../../../assets/images/pinGrey.png";
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
import { appColors } from "../../../themes/appColors";

const ChatLongPressPopup = () => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);
  const { chatsStates } = useSelector((state) => state.API);
  const dispatch = useDispatch();

  // Dynamic actions based on is_pinned and is_archived states
  const currentChatDetails = chatsStates.allChatsDatas.currentActionChatDetails;
  const isPinned = currentChatDetails?.is_pinned;
  const isArchived = currentChatDetails?.is_archived || currentChatDetails?.archived;

  // Check if chat already belongs to a room
  const hasRoom = currentChatDetails?.room || currentChatDetails?.room_id;

  // Get room name for header
  const roomName = currentChatDetails?.room?.name || "Room";

  // Get chat ID
  const chatId = currentChatDetails?.id;

  // Show limited options when chat is archived
  const actions = isArchived
    ? [
        { title: "Unarchive", icon: archiveBox, action: "unarchive" },
        { title: "Delete", icon: deleteBin, action: "delete" },
      ]
    : [
        ...(hasRoom
          ? [
              {
                title: "Remove from Room",
                icon: folder,
                action: "removeFromRoom",
              },
            ]
          : [
              {
                title: "Add to Learning Lab",
                icon: folder,
                action: "addToLearningLab",
              },
            ]),
        { title: "Rename", icon: pencil, action: "rename" },
        {
          title: isPinned ? "Unpin" : "Pin",
          icon: isPinned ? pinGrey : pin,
          action: "pinUnpin",
        },
        { title: "Archive", icon: archive, action: "archive" },
        { title: "Delete", icon: deleteBin, action: "delete" },
      ];

  const truncateTitle = (title, limit = 20) => {
    if (!title) return "";
    if (title.length <= limit) return title;
    return title.slice(0, limit) + "...";
  };

  const commonFunction = (actionType) => {
    if (actionType === "addToLearningLab") {
      dispatch(setToggleChatActionsPopupOnLongPress(false));
      dispatch(setToggleAddChatToLearningLabPopup(true));
    } else if (actionType === "rename") {
      dispatch(setToggleChatActionsPopupOnLongPress(false));
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
      dispatch(setToggleChatActionsPopupOnLongPress(false));
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
      dispatch(setToggleChatActionsPopupOnLongPress(false));
    } else if (actionType === "delete") {
      dispatch(setToggleChatActionsPopupOnLongPress(false));
      dispatch(setToggleDeleteChatConfirmPopup(true));
      dispatch(setDeleteConfirmPopupFrom("chat"));
    } else if (actionType === "removeFromRoom") {
      if (!chatId) {
        triggerToast("Error", "Chat ID not found", "error", 3000);
        return;
      }

      dispatch(setToggleChatActionsPopupOnLongPress(false));

      // Remove chat from room
      dispatch(
        commonFunctionForAPICalls({
          method: "DELETE",
          url: `/chats/${chatId}/room`,
          name: "remove-chat-from-room",
        }),
      )
        .unwrap()
        .then(() => {
          // Refetch chat details
          dispatch(
            commonFunctionForAPICalls({
              method: "GET",
              url: `/chats/${chatId}`,
              name: "getAllDetailsOfChatByID",
            }),
          );
          triggerToast("Success", "Chat removed from room", "success", 3000);
        })
        .catch((error) => {
          console.error("Failed to remove chat from room:", error);
          triggerToast(
            "Error",
            "Failed to remove chat from room",
            "error",
            3000,
          );
        });
    }
  };
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
            {/* Room Header - shown when chat is in a room */}
            {hasRoom && !isArchived && (
              <View style={styles.roomHeader}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: "contain",
                    marginRight: 12,
                    tintColor: appColors.navyBlueShade,
                  }}
                  source={folder}
                />
                <View style={{ alignItems: "flex-start", flex: 1 }}>
                  <Text style={styles.roomHeaderLabel}>Part of</Text>
                  <Text style={styles.roomHeaderName} numberOfLines={1}>
                    {roomName}
                  </Text>
                </View>
              </View>
            )}
            {/* Content */}
            <View style={styles.content}>
              {actions.map((item, index) => (
                <Pressable
                  key={index}
                  style={({ pressed }) => [
                    styles.actionButton,
                    pressed && styles.actionButtonPressed,
                  ]}
                  onPress={() => {
                    commonFunction(item.action);
                  }}
                >
                  <View style={styles.actionIcon}>
                    <Image
                      style={{ height: 20, width: 20, resizeMode: "contain", tintColor: appColors.navyBlueShade }}
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
  roomHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 5,
    width: "100%",
  },
  roomHeaderLabel: {
    fontSize: moderateScale(11),
    color: "#757575",
    fontFamily: "Mukta-Regular",
    lineHeight: 14,
  },
  roomHeaderName: {
    fontSize: moderateScale(13),
    color: "#1F2937",
    fontFamily: "Mukta-Regular",
    lineHeight: 18,
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
