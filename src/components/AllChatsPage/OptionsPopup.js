import {
  View,
  Text,
  Pressable,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleAllChatsOptionsPopup,
  setToggleDeleteChatPopup,
  setToggleArchiveChatPopup,
  setToggleRenameChatPopup,
  setToggleAddChatToLearningLabPopup,
} from "../../redux/slices/toggleSlice";
import FolderIconDark from "../../../assets/SvgIconsComponent/AllChatsPageIcons/FolderIconDark";
import RenameIcon from "../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/RenameIcon";
import PinIcon from "../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/PinIcon";
import ArchiveIcon from "../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/ArchiveIcon";
import TrashIcon from "../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/TrashIcon";
import { commonFunctionForAPICalls, resetChatPinUnpinUpdated, resetChatTitleUpdated } from "../../redux/slices/apiCommonSlice";
import { triggerToast } from "../../services/toast";

const OptionsPopup = ({ popupPosition }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { chatsStates } = useSelector((state) => state.API);
  const { width, height } = Dimensions.get("window");

  const currentChat = chatsStates.allChatsDatas.currentActionChatDetails;
  const isPinned = currentChat?.is_pinned;
  // Check both possible field names from API
  const isArchived = currentChat?.is_archived || currentChat?.archived;

  // Dynamic options based on chat data
  const dynamicOptions = isArchived
    ? [
        {
          title: "Unarchive",
          icon: <ArchiveIcon />,
          action: "archiveUnarchive"
        },
        {
          title: "Delete",
          icon: <TrashIcon />,
          action: "delete"
        },
      ]
    : [
        {
          title: "Add to Room",
          icon: <FolderIconDark />,
          action: "addToRoom"
        },
        {
          title: "Rename",
          icon: <RenameIcon />,
          action: "rename"
        },
        {
          title: isPinned ? "Unpin" : "Pin",
          icon: <PinIcon />,
          action: "pinUnpin"
        },
        {
          title: "Archive",
          icon: <ArchiveIcon />,
          action: "archiveUnarchive"
        },
        {
          title: "Delete",
          icon: <TrashIcon />,
          action: "delete"
        },
      ];

  const commonFunctions = (action) => {
    const chatId = currentChat?.id;

    if (action === "addToRoom") {
      // Open AddChatToLearningLabPopup to select a room
      dispatch(setToggleAddChatToLearningLabPopup(true));
      closePopup();
    } else if (action === "rename") {
      dispatch(setToggleRenameChatPopup(true));
      closePopup();
    } else if (action === "pinUnpin") {
      if (!chatId) {
        triggerToast("Error", "Chat ID not found", "error", 3000);
        return;
      }

      const apiAction = isPinned ? "unpin" : "pin";
      const payload = {
        method: "POST",
        url: `/chats/${chatId}/${apiAction}`,
        name: "pinOrUnpinChat"
      };

      dispatch(commonFunctionForAPICalls(payload));
      closePopup();
    } else if (action === "archiveUnarchive") {
      dispatch(setToggleArchiveChatPopup(true));
      closePopup();
    } else if (action === "delete") {
      dispatch(setToggleDeleteChatPopup(true));
      closePopup();
    }
  };

  // Handle pin/unpin success
  useEffect(() => {
    if (chatsStates.loaderStates.isChatPinUnpinUpdated === true) {
      // Refetch all chats
      dispatch(commonFunctionForAPICalls({
        method: "GET",
        url: "/chats?page=1&per_page=20",
        name: "fetchAllUserChatsAvailable"
      }));

      // Refresh recent chats list
      dispatch(commonFunctionForAPICalls({
        method: "GET",
        url: "/chats/recent?limit=10",
        name: "getAllRecentChats"
      }));

      // Reset loader state
      dispatch(resetChatPinUnpinUpdated());
    }
  }, [chatsStates.loaderStates.isChatPinUnpinUpdated]);

  // Handle rename success
  useEffect(() => {
    if (chatsStates.loaderStates.isChatTitleUpdated === true) {
      // Refetch all chats
      dispatch(commonFunctionForAPICalls({
        method: "GET",
        url: "/chats?page=1&per_page=20",
        name: "fetchAllUserChatsAvailable"
      }));

      // Reset loader state
      dispatch(resetChatTitleUpdated());
    }
  }, [chatsStates.loaderStates.isChatTitleUpdated]);

  const closePopup = () => {
    dispatch(setToggleAllChatsOptionsPopup(false));
  };

  if (!toggleStates.toggleAllChatsOptionsPopup || !popupPosition) {
    return null;
  }

  return (
    <Modal
      visible={toggleStates.toggleAllChatsOptionsPopup}
      transparent={true}
      animationType="fade"
      onRequestClose={closePopup}
    >
      <TouchableOpacity
        onPress={closePopup}
        style={styles.optionsPopupWrapper}
        activeOpacity={1}
      >
        <View style={[styles.notesPopup, { top: popupPosition.y, right: width - popupPosition.x }]}>
          {dynamicOptions?.map((options, optionIndex) => {
            return (
              <Pressable
                key={optionIndex}
                onPress={() => {
                  commonFunctions(options.action);
                }}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#EEF4FF" : "transparent",
                  },
                  styles.notesPopupOptions,
                ]}
              >
                {options?.icon}
                <Text style={{ fontFamily: "Mukta-Regular", fontSize: 17 }}>{options.title} </Text>
              </Pressable>
            )
          })}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  notesPopup: {
    position: "absolute",
    backgroundColor: "#ffffffff",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 21,
    padding: 7,
    width: "auto",
    right: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 5,
  },
  notesPopupOptions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    alignItems: "center",
    width: "100%",
    height: 45,
    padding: 9,
    borderRadius: 12,
    paddingRight: 40,
  },
  optionsPopupWrapper: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

export default OptionsPopup;
