import { View, Text, Dimensions, TextInput } from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import { createStyles } from "../../screens/AllChatsPage/AllChatsPageStyles.style";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { MessageCirclePlus, Search } from "lucide-react-native";
import ArrowUpDownIcon from "../../../assets/SvgIconsComponent/AllChatsPageIcons/ArrowUpDownIcon";
import FilterIcon from "../../../assets/SvgIconsComponent/AllChatsPageIcons/FilterIcon";

const SearchAndIcons = ({ isSearching, setIsSearching }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const inputRef = useRef();
  
  useEffect(()=>{
    if(!isSearching){
        inputRef.current.blur();
    }
  },[isSearching])

  return (
    <View style={styles.searchAndIcons}>
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
          style={[styles.searchInput,{outlineWidth:isSearching?1:0}]}
        />
      </View>
      <View
        style={[styles.iconsMain, { display: isSearching ? "none" : "flex" }]}
      >
        <ArrowUpDownIcon />
        <FilterIcon />
        <MessageCirclePlus strokeWidth={1.25} />
      </View>
    </View>
  );
};

export default SearchAndIcons;
