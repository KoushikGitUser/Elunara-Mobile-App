import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./chatSidebarStyles.styles";
import { MessageCircle } from "lucide-react-native";
import chat from "../../../assets/images/ChatTeardrop.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleChatActionsPopupOnLongPress,
  setToggleChatHistorySidebar,
} from "../../../redux/slices/toggleSlice";
import ChatIcon from "../../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/ChatIcon";
import { scaleFont } from "../../../utils/responsive";
import { setChatTitleOnLongPress } from "../../../redux/slices/globalDataSlice";

const IndividualRecentChat = ({ title, translateX }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const dispatch = useDispatch();

  const truncateTitle = (title, limit = 20) => {
    if (title.length <= limit) return title;
    return title.slice(0, limit) + "...";
  };

  return (
    <TouchableOpacity
      onLongPress={() => {
        dispatch(setToggleChatActionsPopupOnLongPress(true));
        dispatch(setChatTitleOnLongPress(title));
        dispatch(setToggleChatHistorySidebar(false));
        Animated.timing(translateX, {
          toValue: toggleStates.toggleChatHistorySidebar
            ? 0
            : SCREEN_WIDTH * 0.75,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }}
      style={styles.individualRecentChats}
    >
      <ChatIcon />

      <Text style={{ fontFamily: "Mukta-Regular", fontSize: scaleFont(14) }}>
        {truncateTitle(title)}{" "}
      </Text>
    </TouchableOpacity>
  );
};

export default IndividualRecentChat;
