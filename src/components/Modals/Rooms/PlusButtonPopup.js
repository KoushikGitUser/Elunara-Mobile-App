import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { MessageCirclePlus } from "lucide-react-native";
import FilesIcon from "../../../../assets/SvgIconsComponent/RoomsIcons/FilesIcon";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setToggleIsRoomEmpty } from "../../../redux/slices/toggleSlice";

const { width, height } = Dimensions.get("window");

const PlusButtonPopup = ({ setAddOptionsPopup }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <>
      <TouchableOpacity
        onPress={() => setAddOptionsPopup(false)}
        style={styles.optionsPopupWrapper}
      ></TouchableOpacity>
      <View style={styles.notesPopup}>
        <Pressable
          onPress={() => {
            setAddOptionsPopup(false);
            dispatch(setToggleIsRoomEmpty(false))
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <MessageCirclePlus strokeWidth={1.25} />
          <Text>New Chat</Text>
        </Pressable>
        <Pressable
          onPress={() => setAddOptionsPopup(false)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <FilesIcon />
          <Text>Add Chat to Learning Lab</Text>
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
    top: 60,
    right: 0,
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
    paddingRight: 10,
  },
  optionsPopupWrapper: {
    position: "absolute",
    top: 0,
    left: -20,
    width,
    height,
    zIndex: 99,
    backgroundColor: "transparent",
  },
});

export default PlusButtonPopup;
