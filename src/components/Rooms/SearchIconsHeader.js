import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import React, { useMemo, useRef } from "react";
import { Search } from "lucide-react-native";
import ArrowUpDownIcon from "../../../assets/SvgIconsComponent/AllChatsPageIcons/ArrowUpDownIcon";
import FilterIcon from "../../../assets/SvgIconsComponent/AllChatsPageIcons/FilterIcon";
import { verticalScale } from "../../utils/responsive";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

const SearchIconsHeader = ({ searchQuery, setSearchQuery }) => {
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const inputRef = useRef();

  return (
    <View style={styles.searchAndIcons}>
      <View
        style={[
          styles.searchInputMain,
          { width: searchQuery ? "100%" : "auto" },
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
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search"
          placeholderTextColor="#B5BECE"
          style={[styles.searchInput, { outlineWidth: searchQuery ? 1 : 0 }]}
        />
      </View>
      <View
        style={[styles.iconsMain, { display: searchQuery ? "none" : "flex" }]}
      >
        <ArrowUpDownIcon />
        <FilterIcon />
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
    maxWidth:"70%"
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
    backgroundColor:"white",
  },
  iconsMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
});

export default SearchIconsHeader;
