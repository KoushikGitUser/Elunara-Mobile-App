import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  CalendarCheck,
  CalendarX,
} from "lucide-react-native";

const RoomsSortingPopup = ({close}) => {
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
            <Text style={{ fontFamily: "Mukta-Regular" }}>Newest First</Text>
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
            <Text style={{ fontFamily: "Mukta-Regular" }}>Oldest First</Text>
          </View>
          <RadioButton selected={selectedStyle === 1}  />
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
            <Text style={{ fontFamily: "Mukta-Regular" }}>A-Z</Text>
          </View>
          <RadioButton selected={selectedStyle === 2}  />
        </Pressable>
        <Pressable
          onPress={() => setSelectedStyle(3)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <ArrowUpNarrowWide strokeWidth={1.25} />
            <Text style={{ fontFamily: "Mukta-Regular" }}>Z-A</Text>
          </View>
          <RadioButton selected={selectedStyle === 3} />
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
    top: 50,
    right: 90,
    zIndex: 999,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 5,
  },
  notesPopupOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "center",
    width: "100%",
    height: 45,
    padding: 9,
    borderRadius: 12,
    paddingRight: 10,
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

export default RoomsSortingPopup;
