import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import React, { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react-native";
import { createStyles } from "./chatSidebarStyles.styles";
import { useNavigation } from "@react-navigation/native";
import chat from "../../../assets/images/ChatTeardrop.png";
import { useDispatch, useSelector } from "react-redux";
import { setToggleChatActionsPopupOnLongPress, setToggleChatHistorySidebar } from "../../../redux/slices/toggleSlice";
import { setChatTitleOnLongPress } from "../../../redux/slices/globalDataSlice";
import ChatIcon from "../../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/ChatIcon";
import { scaleFont } from "../../../utils/responsive";

const IndividualPinnedChat = ({ title, translateX }) => {
  const [isLongPressed, setIsLongPressed] = useState(false);

  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);

  const truncateTitle = (title, limit = 20) => {
    if (title.length <= limit) return title;
    return title.slice(0, limit) + "...";
  };

  return (
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
        navigation.navigate("chat");
      }}
      onLongPress={() => {
        dispatch(setToggleChatActionsPopupOnLongPress(true));
        dispatch(setChatTitleOnLongPress(title));
      }}
      style={styles.individualPinnedChats}
    >
      <ChatIcon />
      <Text style={{fontFamily:"Mukta-Regular",fontSize:scaleFont(14)}}>{truncateTitle(title)}</Text>
    </TouchableOpacity>
  );
};

export default IndividualPinnedChat;
