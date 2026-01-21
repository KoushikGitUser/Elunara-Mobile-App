import { View, Text, TouchableOpacity, Image, Animated, Dimensions } from "react-native";
import React, { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react-native";
import { createStyles } from "./chatSidebarStyles.styles";
import { useNavigation } from "@react-navigation/native";
import chat from "../../../assets/images/ChatTeardrop.png";
import { useDispatch, useSelector } from "react-redux";
import { setToggleChatActionsPopupOnLongPress, setToggleChatHistorySidebar, setToggleIsChattingWithAI } from "../../../redux/slices/toggleSlice";
import { setChatTitleOnLongPress } from "../../../redux/slices/globalDataSlice";
import { setCurrentActionChatDetails, commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";
import ChatIcon from "../../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/ChatIcon";
import { scaleFont } from "../../../utils/responsive";

const IndividualPinnedChat = ({ title, item, translateX }) => {
  const [isLongPressed, setIsLongPressed] = useState(false);

  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;

  // Support both title prop (legacy) and item prop (new)
  const chatTitle = item?.name || title || "Untitled Chat";

  const truncateTitle = (title, limit = 20) => {
    if (title.length <= limit) return title;
    return title.slice(0, limit) + "...";
  };

  const fetchAllMessagesOfChat = () => {
    if (!item?.id) return;

    // First, fetch chat details to get the chat name
    const chatDetailsPayload = {
      method: "GET",
      url: `/chats/${item.id}`,
      name: "getAllDetailsOfChatByID",
    };
    dispatch(commonFunctionForAPICalls(chatDetailsPayload));

    // Then, fetch all messages of the chat
    const messagesPayload = {
      method: "GET",
      url: `/chats/${item.id}/messages`,
      name: "getAllMessagesOfParticularChat",
    };
    dispatch(commonFunctionForAPICalls(messagesPayload));
    dispatch(setToggleIsChattingWithAI(true));
  };

  return (
    <TouchableOpacity
      onPress={() => {
        fetchAllMessagesOfChat();
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
      onLongPress={() => {
        fetchAllMessagesOfChat();
        dispatch(setToggleChatActionsPopupOnLongPress(true));
        dispatch(setChatTitleOnLongPress(chatTitle));
        if (item) {
          dispatch(setCurrentActionChatDetails(item));
        }
        dispatch(setToggleChatHistorySidebar(false));
        Animated.timing(translateX, {
          toValue: toggleStates.toggleChatHistorySidebar
            ? 0
            : SCREEN_WIDTH * 0.75,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }}
      style={styles.individualPinnedChats}
    >
      <ChatIcon />
      <Text style={{fontFamily:"Mukta-Regular",fontSize:scaleFont(14)}}>{truncateTitle(chatTitle)}</Text>
    </TouchableOpacity>
  );
};

export default IndividualPinnedChat;
