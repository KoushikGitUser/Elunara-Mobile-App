import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import DetailedIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/DetailedIcon";
import { scaleFont } from "../../../../../utils/responsive";
import ConciseIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/ConciseIcon";
import CreativeIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/CreativeIcon";
const { width, height } = Dimensions.get("window");

const OtherStylesPopup = ({setIsExpandedFirst,setIsExpandedSecond,isFirst}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <>
      <TouchableOpacity
        onPress={() => {setIsExpandedFirst(false);
            setIsExpandedSecond(false)
        }}
        style={[styles.optionsPopupWrapper,{top:isFirst?-250:"",bottom:isFirst?"":-350}]}
      ></TouchableOpacity>
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 10,
            }}
          >
            <DetailedIcon />
            <Text>Detailed</Text>
          </View>
        </Pressable>
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 10,
            }}
          >
            <ConciseIcon />
            <Text>Concise</Text>
          </View>
          <TouchableOpacity style={styles.badge}>
            <Text style={styles.btnText}>Current style</Text>
          </TouchableOpacity>
        </Pressable>
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 10,
            }}
          >
            <CreativeIcon />
            <Text>Creative</Text>
          </View>
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
    top: 40,
    right: 0,
    zIndex: 999,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 9,
    elevation:15
  },
  notesPopupOptions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 40,
    alignItems: "center",
    width: "100%",
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
  badge: {
    backgroundColor: "#F3F3F3",
    borderColor: "#D8DCE4",
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  btnText: {
    fontSize: scaleFont(12),
    color: "#1A1A1A",
    fontFamily: "Mukta-Regular",
    
  },
});

export default OtherStylesPopup;
