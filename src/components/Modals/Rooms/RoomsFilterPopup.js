import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  CalendarCheck,
  CalendarX,
} from "lucide-react-native";

const RoomsFilterPopup = ({ close,top,right }) => {
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
      <View style={[styles.notesPopup,{top:top,right:right}]}>
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
            <CalendarCheck size={22} strokeWidth={1.25} />
            <Text style={{ fontFamily: "Mukta-Regular" }}>All topics</Text>
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
            <CalendarX size={22} strokeWidth={1.25} />
            <Text style={{ fontFamily: "Mukta-Regular" }}>Explored topics</Text>
          </View>
          <RadioButton selected={selectedStyle === 1} />
        </Pressable>
        <Pressable
          onPress={() => setSelectedStyle(2)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <ArrowDownWideNarrow strokeWidth={1.25} />
            <Text style={{ fontFamily: "Mukta-Regular" }}>Unexplored topics</Text>
          </View>
          <RadioButton selected={selectedStyle === 2} />
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
    top: 60,
    right: 50,
    zIndex: 999,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 5,
  },
  notesPopupOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
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
    radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#D3DAE5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  radioInner: {
    width: "80%",
    height: "80%",
    borderRadius: 50,
    backgroundColor: "#000000ff",
  },
});

export default RoomsFilterPopup;
