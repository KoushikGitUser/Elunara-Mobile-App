import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import BackArrowLeftIcon from "../../../assets/SvgIconsComponent/BackArrowLeftIcon";
import { scaleFont, verticalScale } from "../../utils/responsive";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import RoomsSortingPopup from "../../components/Modals/Rooms/RoomsSortingPopup";
import RoomsFilterPopup from "../../components/Modals/Rooms/RoomsFilterPopup";
import ArrowUpDownIcon from "../../../assets/SvgIconsComponent/AllChatsPageIcons/ArrowUpDownIcon";
import FilterIcon from "../../../assets/SvgIconsComponent/AllChatsPageIcons/FilterIcon";
import { Search } from "lucide-react-native";

const AnalyticsCompletedTopicsPage = ({ scrollY,isSearching, setIsSearching }) => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [toggleSortingPopup, setToggleSortingPopup] = useState(false);
  const [toggleFilterPopup, setToggleFilterPopup] = useState(false);

  const [fontsLoaded] = useFonts({
    "Mukta-Bold": require("../../../assets/fonts/Mukta-Bold.ttf"),
    "Mukta-Regular": require("../../../assets/fonts/Mukta-Regular.ttf"),
    "Mukta-Medium": require("../../../assets/fonts/Mukta-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
    }
  }, [fontsLoaded]);

  const navigation = useNavigation();
  const borderOpacity = scrollY
    ? scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [0, 1],
        extrapolate: "clamp",
      })
    : new Animated.Value(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <View style={styles.headerWrapper}>
        <View style={[styles.chatHeader]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <BackArrowLeftIcon />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: scaleFont(20),
              fontWeight: 600,
              fontFamily: "Mukta-Bold",
            }}
          >
            Finance
          </Text>
        </View>

        {/* Animated Border */}
        <Animated.View
          style={[
            styles.headerBorder,
            {
              opacity: borderOpacity,
            },
          ]}
        />
      </View>
      <View
        style={[
          styles.searchAndIcons,
          { paddingHorizontal: 20, marginTop: 15 },
        ]}
      >
        {toggleSortingPopup && (
          <RoomsSortingPopup close={setToggleSortingPopup} />
        )}
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
          <TouchableOpacity onPress={() => setToggleSortingPopup(true)}>
            <ArrowUpDownIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setToggleFilterPopup(true)}>
            <FilterIcon />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: "#FAFAFA",
    zIndex: 9,
  },
  chatHeader: {
    width: "100%",
    minHeight: verticalScale(64),
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    gap: 20,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  headerBorder: {
    height: 1,
    backgroundColor: "#D3DAE5",
    width: "100%",
  },
});

export default AnalyticsCompletedTopicsPage;
