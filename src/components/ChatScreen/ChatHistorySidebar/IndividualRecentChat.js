import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./chatSidebarStyles.styles";
import { MessageCircle } from "lucide-react-native";
import chat from '../../../assets/images/ChatTeardrop.png'

const IndividualRecentChat = ({ title }) => {
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
      style={styles.individualRecentChats}
    >
      <Image source={chat} style={{height:22,width:22,objectFit:"contain"}} />

      <Text>{truncateTitle(title)} </Text>
    </TouchableOpacity>
  );
};

export default IndividualRecentChat;
