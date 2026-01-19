import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";
import RenameIcon from "../../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/RenameIcon";
import FilesIcon from "../../../../assets/SvgIconsComponent/RoomsIcons/FilesIcon";
import PinIcon from "../../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/PinIcon";
import TrashIcon from "../../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/TrashIcon";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setToggleDeleteChatConfirmPopup, setToggleRenameChatPopup } from "../../../redux/slices/toggleSlice";
import { triggerToast } from "../../../services/toast";

const { width, height } = Dimensions.get("window");

const RoomsHeaderOptionsPopup = ({ close }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const closePopup = () => {
    close(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={closePopup}
        style={styles.optionsPopupWrapper}
        activeOpacity={1}
      />
      <View style={styles.notesPopup}>
        <Pressable
          onPress={() => {
            closePopup();
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
            closePopup();
            navigation.navigate("roomDetails");
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
            closePopup();
            triggerToast("Room pinned", "Room pinned successfully", "success", 3000);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <PinIcon />
          <Text style={{ fontFamily: "Mukta-Regular" }}>Pin</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            closePopup();
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
    </>
  );
};

const styles = StyleSheet.create({
  notesPopup: {
    position: "absolute",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 21,
    padding: 7,
    width: "auto",
    top: 50,
    right: 10,
    zIndex: 999,
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
    position: "absolute",
    top: -100,
    left: 0,
    width,
    height,
    zIndex: 99,
    backgroundColor: "transparent",
  },
});

export default RoomsHeaderOptionsPopup;
