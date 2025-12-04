import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./chatSidebarStyles.styles";
import { MessageCircle } from "lucide-react-native";
import chat from '../../../assets/images/ChatTeardrop.png'
import { useDispatch } from "react-redux";
import { setToggleChatActionsPopupOnLongPress } from "../../../redux/slices/toggleSlice";
import ChatIcon from "../../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/ChatIcon";
import { scaleFont } from "../../../utils/responsive";

const IndividualRecentChat = ({ title }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const truncateTitle = (title, limit = 20) => {
    if (title.length <= limit) return title;
    return title.slice(0, limit) + "...";
  };

  return (
    <TouchableOpacity
      onLongPress={()=>{dispatch(setToggleChatActionsPopupOnLongPress(true));

      }}
      style={styles.individualRecentChats}
    >
     <ChatIcon/>

      <Text style={{fontFamily:"Mukta-Regular",fontSize:scaleFont(14)}}>{truncateTitle(title)} </Text>
    </TouchableOpacity>
  );
};

export default IndividualRecentChat;
