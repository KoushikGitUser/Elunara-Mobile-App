import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react-native";
import { createStyles } from "./chatSidebarStyles.styles";
import { useNavigation } from "@react-navigation/native";
import chat from '../../../assets/images/ChatTeardrop.png'

const IndividualPinnedChat = ({ title }) => {
  const [isLongPressed, setIsLongPressed] = useState(false);

  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();

  const truncateTitle = (title, limit = 20) => {
    if (title.length <= limit) return title;
    return title.slice(0, limit) + "...";
  };

  return (
    <TouchableOpacity
      onLongPress={() => setIsLongPressed(!isLongPressed)}
      style={styles.individualPinnedChats}
    >
      <Image source={chat} style={{height:22,width:22,objectFit:"contain"}} />
      <Text>{truncateTitle(title)}</Text>
    </TouchableOpacity>
  );
};

export default IndividualPinnedChat;
