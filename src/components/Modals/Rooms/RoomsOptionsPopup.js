import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Modal,
} from "react-native";
import React from "react";
import RenameIcon from "../../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/RenameIcon";
import FilesIcon from "../../../../assets/SvgIconsComponent/RoomsIcons/FilesIcon";
import PinIcon from "../../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/PinIcon";
import TrashIcon from "../../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/TrashIcon";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleDeleteChatConfirmPopup,
  setToggleRenameChatPopup,
} from "../../../redux/slices/toggleSlice";
import { setDeleteConfirmPopupFrom } from "../../../redux/slices/globalDataSlice";
import { triggerToast } from "../../../services/toast";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";

const { width, height } = Dimensions.get("window");

const RoomsOptionsPopup = ({ setRoomOptionsPopup, visible }) => {
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { roomsStates } = useSelector((state) => state.API);
  const dispatch = useDispatch();

  return (
    <Modal
      visible={visible !== undefined ? visible : true}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setRoomOptionsPopup(false)}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setRoomOptionsPopup(false)}
        style={styles.overlay}
      >
        <View style={styles.notesPopup}>
          <Pressable
            onPress={() => {
              setRoomOptionsPopup(false);
              dispatch(setToggleRenameChatPopup(true));
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#EEF4FF" : "transparent",
              },
              styles.notesPopupOptions,
            ]}
          >
            <RenameIcon />
            <Text style={{ fontFamily: "Mukta-Regular" }}>Rename</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setRoomOptionsPopup(false);
              navigation.navigate("roomDetails", {
                roomUuid: roomsStates.currentRoom?.uuid,
              });
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#EEF4FF" : "transparent",
              },
              styles.notesPopupOptions,
            ]}
          >
            <FilesIcon />
            <Text style={{ fontFamily: "Mukta-Regular" }}>Edit Details</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setRoomOptionsPopup(false);
              const roomUuid =
                roomsStates.currentRoom?.uuid || roomsStates.currentRoom?.id;
              if (!roomUuid) return;

              const isPinned = roomsStates.pinnedRooms?.some(
                (r) => (r.uuid || r.id) === roomUuid
              );

              if (isPinned) {
                dispatch(
                  commonFunctionForAPICalls({
                    method: "POST",
                    url: `/rooms/${roomUuid}/unpin`,
                    name: "unpin-room",
                  })
                );
              } else {
                dispatch(
                  commonFunctionForAPICalls({
                    method: "POST",
                    url: `/rooms/${roomUuid}/pin`,
                    name: "pin-room",
                  })
                );
              }
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#EEF4FF" : "transparent",
              },
              styles.notesPopupOptions,
            ]}
          >
            <PinIcon />
            {roomsStates.pinnedRooms?.some(
              (r) =>
                (r.uuid || r.id) ===
                (roomsStates.currentRoom?.uuid || roomsStates.currentRoom?.id)
            ) ? (
              <Text style={{ fontFamily: "Mukta-Regular" }}>Unpin</Text>
            ) : (
              <Text style={{ fontFamily: "Mukta-Regular" }}>Pin</Text>
            )}
          </Pressable>
          <Pressable
            onPress={() => {
              setRoomOptionsPopup(false);
              dispatch(setDeleteConfirmPopupFrom("rooms"));
              dispatch(setToggleDeleteChatConfirmPopup(true));
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#EEF4FF" : "transparent",
              },
              styles.notesPopupOptions,
            ]}
          >
            <TrashIcon />
            <Text style={{ fontFamily: "Mukta-Regular" }}>Delete</Text>
          </Pressable>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  notesPopup: {
    position: "absolute",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 21,
    padding: 7,
    width: "auto",
    top: 60,
    right: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
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
});

export default RoomsOptionsPopup;
