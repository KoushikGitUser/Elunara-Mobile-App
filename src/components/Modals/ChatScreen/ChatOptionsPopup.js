import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import React, { useMemo, useRef } from "react";
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
import { useEffect } from "react";
import ArchiveIcon from "../../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/ArchiveIcon";
import TrashIcon from "../../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/TrashIcon";
import PinIcon from "../../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/PinIcon";
import FolderPlusIcon from "../../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/FolderPlusIcon";
import RenameIcon from "../../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/RenameIcon";
import NotesIcon from "../../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/NotesIcon";

const ChatOptionsPopup = ({ chatUuid }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { toggleStates } = useSelector((state) => state.Toggle);
  const { chatsStates } = useSelector((state) => state.API);
  const { width, height } = Dimensions.get("window");

  // Dynamic actions based on is_pinned and is_archived states
  const currentChatDetails = chatsStates.allChatsDatas.currentActionChatDetails;
  const createdChatDetails = chatsStates.allChatsDatas.createdChatDetails;
  const chatId = createdChatDetails?.id;

  // Get the correct chat details - only use data that matches the current chat ID
  // This prevents showing stale data from a previous chat
  const getRelevantChatDetails = () => {
    // Prefer currentActionChatDetails if it matches the current chat ID
    if (currentChatDetails?.id === chatId) {
      return currentChatDetails;
    }
    // Fall back to createdChatDetails if it matches
    if (createdChatDetails?.id === chatId) {
      return createdChatDetails;
    }
    // If neither match (shouldn't happen), return createdChatDetails
    return createdChatDetails;
  };

  const relevantChatDetails = getRelevantChatDetails();

  // Ref to track if we've already fetched for this popup session
  const hasFetchedRef = useRef(false);

  // Reset fetch flag when popup closes
  useEffect(() => {
    if (!toggleStates.toggleChatMenuPopup) {
      hasFetchedRef.current = false;
    }
  }, [toggleStates.toggleChatMenuPopup]);

  // Fetch chat details when popup opens - always fetch to ensure fresh data
  useEffect(() => {
    if (toggleStates.toggleChatMenuPopup && chatId && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      const payload = {
        method: "GET",
        url: `/chats/${chatId}`,
        name: "getAllDetailsOfChatByID",
      };
      dispatch(commonFunctionForAPICalls(payload));
    }
  }, [toggleStates.toggleChatMenuPopup, chatId]);

  // Use only the relevant chat details for the current chat ID
  const isPinned = relevantChatDetails?.is_pinned || false;

  // Check both possible field names from API
  const isArchived =
    relevantChatDetails?.is_archived ||
    relevantChatDetails?.archived ||
    false;

  // Check if chat already belongs to a room - only from relevant chat details
  const hasRoom = relevantChatDetails?.room || relevantChatDetails?.room_id || false;

  // Get room name for header
  const roomName = relevantChatDetails?.room?.name || "Room";

  // Show limited options when chat is archived
  const actions = isArchived
    ? [
        { title: "Unarchive", icon: <ArchiveIcon />, action: "unarchive" },
        { title: "Delete", icon: <TrashIcon />, action: "delete" },
      ]
    : [
        { title: "Open Notes", icon: <NotesIcon />, action: "openNotes" },
        ...(hasRoom
          ? [
              {
                title: "Remove from Room",
                icon: <FolderPlusIcon />,
                action: "removeFromRoom",
              },
            ]
          : [
              {
                title: "Add to Learning Lab",
                icon: <FolderPlusIcon />,
                action: "addToLearningLab",
              },
            ]),
        { title: "Rename", icon: <RenameIcon />, action: "rename" },
        {
          title: isPinned ? "Unpin" : "Pin",
          icon: <PinIcon />,
          action: "pinUnpin",
        },
        { title: "Archive", icon: <ArchiveIcon />, action: "archive" },
        { title: "Delete", icon: <TrashIcon />, action: "delete" },
      ];

  const commonFunctions = (actionType) => {
    if (actionType === "openNotes") {
      dispatch(setToggleChatMenuPopup(false));
      navigation.navigate("notes", { chatUuid: chatId });
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

      dispatch(commonFunctionForAPICalls(payload))
        .unwrap()
        .then(() => {
          // Refetch recent chats
          dispatch(
            commonFunctionForAPICalls({
              method: "GET",
              url: "/chats/recent?limit=10",
              name: "getAllRecentChats",
            })
          );
          // Refetch all user chats to update pinned chats in sidebar
          dispatch(
            commonFunctionForAPICalls({
              method: "GET",
              url: "/chats",
              name: "fetchAllUserChatsAvailable",
            })
          );
          // Refetch current chat details to update the pin state
          dispatch(
            commonFunctionForAPICalls({
              method: "GET",
              url: `/chats/${chatId}`,
              name: "getAllDetailsOfChatByID",
            })
          );
        })
        .catch((error) => {
          console.error("Failed to pin/unpin chat:", error);
        });
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
    } else if (actionType === "removeFromRoom") {
      if (!chatId) {
        triggerToast("Error", "Chat ID not found", "error", 3000);
        return;
      }

      dispatch(setToggleChatMenuPopup(false));

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
          // Refetch chat details to remove room name
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
        {/* Room Header - shown when chat is in a room */}
        {hasRoom && !isArchived && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderBottomWidth: 1,
              borderBottomColor: "#E5E7EB",
              marginBottom: 5,
              width: "100%",
            }}
          >
            <View style={{ marginRight: 12 }}>
              <FolderPlusIcon />
            </View>
            <View style={{ alignItems: "flex-start", flex: 1 }}>
              <Text
                style={{
                  fontSize: moderateScale(11),
                  color: "#757575",
                  fontFamily: "Mukta-Regular",
                  lineHeight: 14,
                }}
              >
                Part of
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(13),
                  color: "#1F2937",
                  fontFamily: "Mukta-Regular",
                  lineHeight: 18,
                }}
                numberOfLines={1}
              >
                {roomName}
              </Text>
            </View>
          </View>
        )}
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
              {actionItem.icon}
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
