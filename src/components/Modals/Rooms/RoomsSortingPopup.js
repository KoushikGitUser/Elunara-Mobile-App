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

const RoomsSortingPopup = ({close, top, right, onSortSelect, from = "rooms", currentSort}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Map sort values to indices for radio button selection
  const sortToIndex = { "newest": 0, "oldest": 1, "a-z": 2, "z-a": 3 };
  const [selectedStyle, setSelectedStyle] = useState(currentSort ? sortToIndex[currentSort] : null);

  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  const handleSortOption = (index, sortValue) => {
    setSelectedStyle(index);
    if (onSortSelect) {
      onSortSelect(sortValue);
    }
    close(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => close(false)}
        style={styles.optionsPopupWrapper}
      ></TouchableOpacity>
      <View style={[styles.notesPopup,{top:top,right:right}]}>
        <Pressable
          onPress={() => handleSortOption(0, "newest")}
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
          onPress={() => handleSortOption(1, "oldest")}
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
          onPress={() => handleSortOption(2, "a-z")}
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
          onPress={() => handleSortOption(3, "z-a")}
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
    minWidth: 180,
    top: 35,
    right: -60,
    zIndex: 999,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between",
    gap: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  notesPopupOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "center",
    height: 45,
    padding: 9,
    borderRadius: 12,
    paddingRight: 10,
  },
  optionsPopupWrapper: {
    position: "absolute",
    top: -300,
    left: -width,
    width: width * 2,
    height: height * 2,
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
