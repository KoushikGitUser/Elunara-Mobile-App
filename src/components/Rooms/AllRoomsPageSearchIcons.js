import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { Search } from "lucide-react-native";
import ArrowUpDownIcon from "../../../assets/SvgIconsComponent/AllChatsPageIcons/ArrowUpDownIcon";
import FilterIcon from "../../../assets/SvgIconsComponent/AllChatsPageIcons/FilterIcon";
import FolderPlusIcon from "../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/FolderPlusIcon";
import { verticalScale } from "../../utils/responsive";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import RoomsSortingPopup from "../Modals/Rooms/RoomsSortingPopup";
import RoomsFilterPopup from "../Modals/Rooms/RoomsFilterPopup";

const AllRoomsPageSearchIcons = ({ isSearching, setIsSearching }) => {
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [toggleSortingPopup, setToggleSortingPopup] = useState(false);
  const [toggleFilterPopup, setToggleFilterPopup] = useState(false);
  return (
    <View
      style={[styles.searchAndIcons, { paddingHorizontal: 20, marginTop: 15 }]}
    >
      {toggleSortingPopup && <RoomsSortingPopup close={setToggleSortingPopup} />}
      {toggleFilterPopup && <RoomsFilterPopup close={setToggleFilterPopup} />}
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
         
          placeholder="Search"
          placeholderTextColor="#B5BECE"
          style={[styles.searchInput, { outlineWidth: isSearching ? 1 : 0 }]}
        />
      </View>
      <View
        style={[styles.iconsMain, { display: isSearching ? "none" : "flex" }]}
      >
        <TouchableOpacity onPress={()=>setToggleSortingPopup(true)}>
          <ArrowUpDownIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setToggleFilterPopup(true)}>
          <FilterIcon />
        </TouchableOpacity>
        <TouchableOpacity>
          <FolderPlusIcon />
        </TouchableOpacity>
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
    height: "100%",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#ABB8CC",
    paddingLeft: 30,
    backgroundColor: "white",
    fontFamily:"Mukta-Regular"
  },
  iconsMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
});

export default AllRoomsPageSearchIcons;
