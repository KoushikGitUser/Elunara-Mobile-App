import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setToggleChatHistorySidebar } from "../../redux/slices/toggleSlice";
import { scaleFont } from "../../utils/responsive";
import { ArrowLeft } from "lucide-react-native";
import { Feather } from "@expo/vector-icons";
import { createStyles } from "../../screens/AllChatsPage/AllChatsPageStyles.style";

const AllRoomsPageHeader = ({ isSearching, setIsSearching, translateX }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const dispatch = useDispatch();

  return (
    <View style={[styles.chatHeader, { marginTop: StatusBar.currentHeight }]}>
      <StatusBar
        backgroundColor="#ff0000ff"
        barStyle="dark-content"
        hidden={false}
        translucent={false}
        animated
      />
      <TouchableOpacity
        onPress={() => {
          Animated.timing(translateX, {
            toValue: toggleStates.toggleChatHistorySidebar
              ? 0
              : SCREEN_WIDTH * 0.75,
            duration: 300,
            useNativeDriver: true,
          }).start();
          dispatch(
            setToggleChatHistorySidebar(!toggleStates.toggleChatHistorySidebar)
          );
        }}
      >
        {isSearching ? (
          <ArrowLeft onPress={() => setIsSearching(false)} strokeWidth={1.25} />
        ) : (
          <Feather name="menu" size={30} color="black" />
        )}
      </TouchableOpacity>
      <Text style={{ fontSize: scaleFont(20), fontWeight: 600,fontFamily:"Mukta-Bold" }}>
        {isSearching ? "Search" : "Learning Labs"}
      </Text>
    </View>
  );
};

export default AllRoomsPageHeader;
