import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./ChatScreenCompo.styles";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MessageCirclePlus } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { setToggleChatHistorySidebar } from "../../redux/slices/toggleSlice";

const ChatHeader = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleChatHistorySidebar } = useSelector((state) => state.Toggle);
  
  return (
    <View style={styles.chatHeader}>
      <Feather onPress={() => dispatch(setToggleChatHistorySidebar(!toggleChatHistorySidebar))} name="menu" size={30} color="black" />
      <TouchableOpacity style={styles.upgradeButton}>
        <MaterialCommunityIcons
          name="lightning-bolt-outline"
          size={24}
          color="black"
        />
        <Text>Upgrade Plan</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <MessageCirclePlus size={30} strokeWidth={1.25} />
      </TouchableOpacity>
    </View>
  );
};

export default ChatHeader;
