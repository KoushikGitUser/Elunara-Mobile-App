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
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleRoomChatsOptionsPopup,
  setToggleRemoveFromRoomConfirmPopup,
  setToggleRenameChatPopup,
} from "../../redux/slices/toggleSlice";
import FolderIconDark from "../../../assets/SvgIconsComponent/AllChatsPageIcons/FolderIconDark";
import RenameIcon from "../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/RenameIcon";
import TrashIcon from "../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/TrashIcon";
import { commonFunctionForAPICalls, resetChatTitleUpdated } from "../../redux/slices/apiCommonSlice";
import { triggerToast } from "../../services/toast";

const RoomChatsOptionsPopup = ({ popupPosition }) => {
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { chatsStates, roomsStates } = useSelector((state) => state.API);
  const { width } = Dimensions.get("window");

  const currentChat = chatsStates.allChatsDatas.currentActionChatDetails;

  // Options for room chats: Remove from Room, Rename, Delete
  const dynamicOptions = [
    {
      title: "Remove from Room",
      icon: <FolderIconDark />,
      action: "removeFromRoom"
    },
    {
      title: "Rename",
      icon: <RenameIcon />,
      action: "rename"
    },
    {
      title: "Delete",
      icon: <TrashIcon />,
      action: "delete"
    },
  ];

  const commonFunctions = (action) => {
    const chatId = currentChat?.id;
    const roomUuid = roomsStates.currentRoom?.uuid;

    if (action === "removeFromRoom") {
      if (!chatId) {
        triggerToast("Error", "Chat ID not found", "error", 3000);
        return;
      }

      closePopup();

      // Remove chat from room using the same endpoint as ChatOptionsPopup
      dispatch(
        commonFunctionForAPICalls({
          method: "DELETE",
          url: `/chats/${chatId}/room`,
          name: "remove-chat-from-room",
        })
      )
        .unwrap()
        .then(() => {
          // Refetch chats that are IN the room
          if (roomUuid) {
            dispatch(
              commonFunctionForAPICalls({
                method: "GET",
                url: `/rooms/${roomUuid}/chats`,
                name: "get-room-chats",
              })
            );
          }
        })
        .catch(() => {
          triggerToast("Error", "Failed to remove chat from room", "error", 3000);
        });
    } else if (action === "rename") {
      dispatch(setToggleRenameChatPopup(true));
      closePopup();
    } else if (action === "delete") {
      dispatch(setToggleRemoveFromRoomConfirmPopup(true));
      closePopup();
    }
  };

  // Handle rename success - refetch room chats
  useEffect(() => {
    if (chatsStates.loaderStates.isChatTitleUpdated === true) {
      const roomUuid = roomsStates.currentRoom?.uuid;
      if (roomUuid) {
        dispatch(commonFunctionForAPICalls({
          method: "GET",
          url: `/rooms/${roomUuid}/chats`,
          name: "get-room-chats"
        }));
      }
      dispatch(resetChatTitleUpdated());
    }
  }, [chatsStates.loaderStates.isChatTitleUpdated]);

  const closePopup = () => {
    dispatch(setToggleRoomChatsOptionsPopup(false));
  };

  if (!toggleStates.toggleRoomChatsOptionsPopup || !popupPosition) {
    return null;
  }

  return (
    <Modal
      visible={toggleStates.toggleRoomChatsOptionsPopup}
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

export default RoomChatsOptionsPopup;
