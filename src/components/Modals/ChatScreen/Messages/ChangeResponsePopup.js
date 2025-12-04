import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import React from "react";
import LLMIcon from "../../../../../assets/SvgIconsComponent/ToolsOptionsIcons/LLMIcon";
import ResStyleIcon from "../../../../../assets/SvgIconsComponent/ToolsOptionsIcons/ResStyleIcon";
import ResLangIcon from "../../../../../assets/SvgIconsComponent/ToolsOptionsIcons/ResLangIcon";

const ChangeResponsePopup = ({setChangeResponsePopup}) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => setChangeResponsePopup(false)}
        style={styles.optionsPopupWrapper}
      ></TouchableOpacity>
      <View style={styles.notesPopup}>
        <View
          style={[
            styles.notesPopupOptions,
            {borderBottomWidth:1,
                borderColor:"#D3DAE5"
            }
          ]}
        >
          <Text style={{fontWeight:600,fontFamily:"Mukta-Bold",fontSize:16}}>Change Response</Text>
        </View>
        <Pressable
          onPress={() => {
            setChangeResponsePopup(false);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <LLMIcon color="#081A35" />
          <Text style={{fontFamily:"Mukta-Regular",fontSize:17}}>LLM</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setChangeResponsePopup(false);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <ResStyleIcon color="#081A35" />
          <Text style={{fontFamily:"Mukta-Regular",fontSize:17}}>Style</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setChangeResponsePopup(false);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <ResLangIcon color="#081A35" />
          <Text style={{fontFamily:"Mukta-Regular",fontSize:17}}>Language</Text>
        </Pressable>
      </View>
    </>
  );
};
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  notesPopup: {
    position: "absolute",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 21,
    padding: 7,
    width: "auto",
    bottom: 33,
    left: 130,
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
    bottom: 0,
    left: -20,
    width,
    height,
    zIndex: 99,
    backgroundColor: "transparent",
  },
});

export default ChangeResponsePopup;
