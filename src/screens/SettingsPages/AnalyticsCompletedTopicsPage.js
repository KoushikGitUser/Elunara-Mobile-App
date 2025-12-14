import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  Image,
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
import { ArrowUpRight, Book, Search } from "lucide-react-native";
import { topicsexploredArray } from "../../data/datas";
import BigSearchIcon from "../../../assets/SvgIconsComponent/ProfilePageOptionsIcons/BigSearchIcon";
import GradientText from "../../components/common/GradientText";
import serachIcon from '../../assets/images/searchtopic.png'

const AnalyticsCompletedTopicsPage = ({
  scrollY,
  isSearching,
  setIsSearching,
}) => {
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
          <RoomsSortingPopup
            top={45}
            right={60}
            close={setToggleSortingPopup}
          />
        )}
        {toggleFilterPopup && (
          <RoomsFilterPopup top={45} right={20} close={setToggleFilterPopup} />
        )}
        <View
          style={[
            styles.searchInputMain,
            { width: isSearching ? "100%" : "auto" },
          ]}
        >
          <Text
            style={{
              fontFamily: "Mukta-Regular",
              fontSize: scaleFont(16),
              color: "#5E5E5E",
            }}
          >
            12/14 topics explored
          </Text>
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
      <View
        style={[
          styles.searchAndIcons,
          { paddingHorizontal: 20, marginTop: 30 },
        ]}
      >
        <Text
          style={{
            fontFamily: "Mukta-Regular",
            fontSize: scaleFont(16),
            color: "#757575",
          }}
        >
          Topic name
        </Text>
        <Text
          style={{
            fontFamily: "Mukta-Regular",
            fontSize: scaleFont(16),
            color: "#757575",
          }}
        >
          Last accessed
        </Text>
      </View>

      <ScrollView style={styles.scroll}>
        
        {topicsexploredArray?.map((topics, topicIndex) => {
          return (
            <TouchableOpacity key={topicIndex} style={styles.container}>
              <View
                style={[
                  styles.card,
                  {
                    paddingVertical: topics.accessed ? 10 : 20,
                    backgroundColor: topics.accessed ? "#F3F3F3" : "white",
                    borderColor: "#D3DAE5",
                    borderWidth: topics.accessed ? 0 : 1,
                  },
                ]}
              >
                <View style={styles.leftSection}>
                  <Book size={24} color="#888888" strokeWidth={1.5} />

                  <Text style={styles.title}>{topics.title}</Text>
                </View>

                {topics.accessed ? (
                  <View style={styles.rightSection}>
                    <Text style={styles.date}>{topics.date} </Text>

                    <Text style={styles.time}>{topics.time} </Text>
                  </View>
                ) : (
                  <ArrowUpRight strokeWidth={1.25} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
              <View
        style={[
          styles.middleBelowAddSection,
          { borderWidth: 0, backgroundColor: "#FAFAFA" },
        ]}
      >
        <View style={styles.noResultMain}>
          <Image source={serachIcon} style={{height:50,width:50,objectFit:"contain"}} />
          <GradientText
            marginBottom={0}
            marginTop={15}
            children="No Topics Explored Yet"
            fullWidth={false}
            widthNumber={0.48}
            fontSize={scaleFont(20)}
          />
          <Text
            style={{
              fontSize: scaleFont(14),
              fontFamily: "Mukta-Regular",
              textAlign: "center",
              width: "100%",
              color: "#757575",
            }}
          >
            You haven't explored any topics in this subject so far. Start diving
            in now to build your knowledge!
          </Text>
        </View>
      </View>
        <View style={{ height: 40 }} />
      </ScrollView>
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
  searchAndIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  searchInputMain: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    backgroundColor: "#F0F0F0",
    borderRadius: 50,
    paddingHorizontal: 20,
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
    fontFamily: "Mukta-Regular",
  },
  iconsMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  scroll: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },

  container: {
    width: "100%",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#F3F3F3",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 500,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 16,
  },
  title: {
    fontSize: scaleFont(14),
    color: "#5E5E5E",
    fontFamily: "Mukta-Regular",
    flex: 1,
  },
  rightSection: {
    alignItems: "flex-end",
    marginLeft: 16,
  },
  date: {
    fontSize: scaleFont(12),
    color: "#5E5E5E",
    fontFamily: "Mukta-Regular",
  },
  time: {
    fontSize: scaleFont(12),
    color: "#757575",
    fontFamily: "Mukta-Regular",
    marginTop: 2,
  },
  middleBelowAddSection: {
    minHeight: verticalScale(192),
    width: "100%",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#D3DAE5",
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  noResultMain: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
  },
});

export default AnalyticsCompletedTopicsPage;
