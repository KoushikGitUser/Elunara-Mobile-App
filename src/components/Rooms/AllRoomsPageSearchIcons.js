import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import React, { useRef } from "react";
import { Search } from "lucide-react-native";
import ArrowUpDownIcon from "../../../assets/SvgIconsComponent/AllChatsPageIcons/ArrowUpDownIcon";
import FilterIcon from "../../../assets/SvgIconsComponent/AllChatsPageIcons/FilterIcon";
import FolderPlusIcon from "../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/FolderPlusIcon";
import { verticalScale } from "../../utils/responsive";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

const AllRoomsPageSearchIcons = ({ isSearching, setIsSearching }) => {
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const inputRef = useRef();
  return (
    <View style={[styles.searchAndIcons,{paddingHorizontal:20,marginTop:15}]}>
      <View
        style={[
          styles.searchInputMain,
          { width: isSearching ? "100%" : "auto" },
        ]}
      >
        <Search
          size={22}
          strokeWidth={1.25}
          color="#B5BECE"
          style={styles.searchIcon}
        />
        <TextInput
          ref={inputRef}
          onFocus={() => setIsSearching(true)}
          placeholder="Search"
          placeholderTextColor="#B5BECE"
          style={[styles.searchInput, { outlineWidth: isSearching ? 1 : 0 }]}
        />
      </View>
      <View
        style={[styles.iconsMain, { display: isSearching ? "none" : "flex" }]}
      >
        <ArrowUpDownIcon />
        <FilterIcon />
        <FolderPlusIcon />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchAndIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  searchInputMain: {
    flex: 1,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "70%",
  },
  searchIcon: {
    position: "absolute",
    left: 10,
  },
  searchInput: {
    width: "100%",
    height: verticalScale(40),
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#ABB8CC",
    paddingLeft: 40,
    backgroundColor: "white",
  },
  iconsMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
});

export default AllRoomsPageSearchIcons;
