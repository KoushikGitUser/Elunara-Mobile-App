import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

const FeedbackPopup = ({ close }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedStyle, setSelectedStyle] = useState(null);
  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <>
      <TouchableOpacity
        onPress={() => close(false)}
        style={styles.optionsPopupWrapper}
      ></TouchableOpacity>
      <View style={styles.notesPopup}>
        <View
          style={[
            styles.notesPopupOptions,
            { borderBottomWidth: 1, borderColor: "#D3DAE5" },
          ]}
        >
          <Text style={{ fontWeight: 600,color:"#3A3A3A",fontFamily:"Mukta-Bold" }}>This response is</Text>
        </View>
        <Pressable
          onPress={() => {
            setSelectedStyle(0);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <ThumbsUp strokeWidth={1.25} />
            <Text style={{fontFamily:"Mukta-Regular",fontSize:17}}>Helpful</Text>
          </View>
          <RadioButton selected={selectedStyle === 0} />
        </Pressable>
        <Pressable
          onPress={() => setSelectedStyle(1)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <ThumbsDown strokeWidth={1.25} />
            <Text style={{fontFamily:"Mukta-Regular",fontSize:17}}>Not Helpful</Text>
          </View>
          <RadioButton selected={selectedStyle === 1} />
        </Pressable>
      </View>
    </>
  );
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

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
    left: 85,
    zIndex: 999,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 5,
  },
  notesPopupOptions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 30,
    alignItems: "center",
    width: "100%",
    height: 45,
    padding: 9,
    borderRadius: 12,
    paddingRight: 10,
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
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#D3DAE5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    marginLeft:"auto"
  },
  radioInner: {
    width: "80%",
    height: "80%",
    borderRadius: 50,
    backgroundColor: "#000000ff",
  },
});

export default FeedbackPopup;
