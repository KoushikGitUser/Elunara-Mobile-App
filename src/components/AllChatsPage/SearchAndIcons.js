import { View, Text, Dimensions, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createStyles } from "../../screens/AllChatsPage/AllChatsPageStyles.style";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { MessageCirclePlus, Search } from "lucide-react-native";
import ArrowUpDownIcon from "../../../assets/SvgIconsComponent/AllChatsPageIcons/ArrowUpDownIcon";
import FilterIcon from "../../../assets/SvgIconsComponent/AllChatsPageIcons/FilterIcon";
import RoomsSortingPopup from "../Modals/Rooms/RoomsSortingPopup";
import ChatFilterPopup from "./ChatFilterPopup";
import { setToggleIsChattingWithAI } from "../../redux/slices/toggleSlice";
import { setUserMessagePrompt, setSelecetdFiles, setChatInputContentLinesNumber } from "../../redux/slices/globalDataSlice";

const SearchAndIcons = ({ isSearching, setIsSearching, onSortSelect, onFilterSelect, onSearch }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const inputRef = useRef();
  const debounceTimeout = useRef(null);
  const [toggleSortingPopup, setToggleSortingPopup] = useState(false);
  const [toggleFilterPopup, setToggleFilterPopup] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!isSearching) {
      inputRef.current.blur();
      setSearchText("");
    }
  }, [isSearching]);

  // Debounced search
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (onSearch) {
        onSearch(searchText);
      }
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchText]);

  return (
    <View style={styles.searchAndIcons}>
       {toggleSortingPopup && <RoomsSortingPopup close={setToggleSortingPopup} top={50} right={55} onSortSelect={onSortSelect} from="chats" />}
      {toggleFilterPopup && <ChatFilterPopup close={setToggleFilterPopup} top={50} right={30} onFilterSelect={onFilterSelect} />}
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
          value={searchText}
          onChangeText={setSearchText}
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

        <TouchableOpacity onPress={() => {
          // Reset all input states
          dispatch(setUserMessagePrompt(""));
          dispatch(setSelecetdFiles([]));
          dispatch(setChatInputContentLinesNumber(0));
          dispatch(setToggleIsChattingWithAI(false));

          // Navigate to chat screen
          navigation.navigate("chat");
        }}>
          <MessageCirclePlus strokeWidth={1.25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchAndIcons;
