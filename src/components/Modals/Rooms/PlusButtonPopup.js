import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import React from "react";
import { MessageCirclePlus } from "lucide-react-native";
import FilesIcon from "../../../../assets/SvgIconsComponent/RoomsIcons/FilesIcon";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  setToggleAddExistingChatToRoomPopup,
  setToggleIsRoomEmpty,
} from "../../../redux/slices/toggleSlice";

const { width, height } = Dimensions.get("window");

const PlusButtonPopup = ({ setAddOptionsPopup, visible }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Modal
      visible={visible !== undefined ? visible : true}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setAddOptionsPopup(false)}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setAddOptionsPopup(false)}
        style={styles.overlay}
      >
        <View style={styles.notesPopup}>
          <Pressable
            onPress={() => {
              setAddOptionsPopup(false);
              dispatch(setToggleIsRoomEmpty(false));
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#EEF4FF" : "transparent",
              },
              styles.notesPopupOptions,
            ]}
          >
            <MessageCirclePlus strokeWidth={1.25} />
            <Text style={{ fontFamily: "Mukta-Regular" }}>New Chat</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setAddOptionsPopup(false);
              dispatch(setToggleAddExistingChatToRoomPopup(true));
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#EEF4FF" : "transparent",
              },
              styles.notesPopupOptions,
            ]}
          >
            <FilesIcon />
            <Text style={{ fontFamily: "Mukta-Regular" }}>
              Add Chat to Learning Lab
            </Text>
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
    paddingRight: 10,
  },
});

export default PlusButtonPopup;
