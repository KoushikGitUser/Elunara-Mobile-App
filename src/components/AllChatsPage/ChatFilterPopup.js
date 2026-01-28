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
import SparkleIcon from "../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/SparkleIcon";
import PinIcon from "../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/PinIcon";
import ArchiveDarkIcon from "../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/ArchiveIcon";
import { appColors } from "../../themes/appColors";

const ChatFilterPopup = ({close, top, right, onFilterSelect, currentFilter}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Map filter values to indices for radio button selection
  const filterToIndex = { "active": 0, "pinned": 1, "archived": 2 };
  const [selectedFilter, setSelectedFilter] = useState(currentFilter ? filterToIndex[currentFilter] : null);

  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  const handleFilterOption = (index, filterValue) => {
    setSelectedFilter(index);
    if (onFilterSelect) {
      onFilterSelect(filterValue);
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
          onPress={() => handleFilterOption(0, "active")}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <SparkleIcon color={appColors.navyBlueShade} />
            <Text style={{ fontFamily: "Mukta-Regular" }}>Active</Text>
          </View>
          <RadioButton selected={selectedFilter === 0} />
        </Pressable>
        <Pressable
          onPress={() => handleFilterOption(1, "pinned")}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <PinIcon color={appColors.navyBlueShade} />
            <Text style={{ fontFamily: "Mukta-Regular" }}>Pinned</Text>
          </View>
          <RadioButton selected={selectedFilter === 1}  />
        </Pressable>
        <Pressable
          onPress={() => handleFilterOption(2, "archived")}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <ArchiveDarkIcon />
            <Text style={{ fontFamily: "Mukta-Regular" }}>Archived</Text>
          </View>
          <RadioButton selected={selectedFilter === 2}  />
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
    right: 30,
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

export default ChatFilterPopup;
