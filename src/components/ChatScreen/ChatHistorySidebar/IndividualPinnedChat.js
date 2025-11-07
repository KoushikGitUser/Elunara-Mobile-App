import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react-native";
import { createStyles } from "./chatSidebarStyles.styles";
import { useNavigation } from "@react-navigation/native";
import chat from '../../../assets/images/ChatTeardrop.png'
import { useDispatch } from "react-redux";
import { setToggleChatActionsPopupOnLongPress } from "../../../redux/slices/toggleSlice";
import { setChatTitleOnLongPress } from "../../../redux/slices/globalDataSlice";
import ChatIcon from "../../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/ChatIcon";

const IndividualPinnedChat = ({ title }) => {
  const [isLongPressed, setIsLongPressed] = useState(false);

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
            dispatch(setChatTitleOnLongPress(title));
          }}
      style={styles.individualPinnedChats}
    >
      <ChatIcon/>
      <Text>{truncateTitle(title)}</Text>
    </TouchableOpacity>
  );
};

export default IndividualPinnedChat;
