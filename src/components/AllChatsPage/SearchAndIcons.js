import { View, Text, Dimensions, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createStyles } from "../../screens/AllChatsPage/AllChatsPageStyles.style";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { MessageCirclePlus, Search } from "lucide-react-native";
import ArrowUpDownIcon from "../../../assets/SvgIconsComponent/AllChatsPageIcons/ArrowUpDownIcon";
import FilterIcon from "../../../assets/SvgIconsComponent/AllChatsPageIcons/FilterIcon";
import RoomsSortingPopup from "../Modals/Rooms/RoomsSortingPopup";
import RoomsFilterPopup from "../Modals/Rooms/RoomsFilterPopup";

const SearchAndIcons = ({ isSearching, setIsSearching }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [toggleSortingPopup, setToggleSortingPopup] = useState(false);
  const [toggleFilterPopup, setToggleFilterPopup] = useState(false);

  useEffect(() => {
    if (!isSearching) {
      inputRef.current.blur();
    }
  }, [isSearching]);

  return (
    <View style={styles.searchAndIcons}>
       {toggleSortingPopup && <RoomsSortingPopup close={setToggleSortingPopup} top={50} right={55} />}
      {toggleFilterPopup && <RoomsFilterPopup close={setToggleFilterPopup} top={50} right={30} />}
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
        <TouchableOpacity onPress={()=>setToggleSortingPopup(true)}>
        <ArrowUpDownIcon />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>setToggleFilterPopup(true)}>
        <FilterIcon />
        </TouchableOpacity>

        <MessageCirclePlus strokeWidth={1.25} />
      </View>
    </View>
  );
};

export default SearchAndIcons;
