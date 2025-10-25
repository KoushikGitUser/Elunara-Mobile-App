import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./ChatScreenCompo.styles";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { EllipsisVertical, MessageCirclePlus } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { setToggleChatHistorySidebar, setToggleChatMenuPopup } from "../../redux/slices/toggleSlice";
import ChatOptionsPopup from "../Modals/ChatScreen/ChatOptionsPopup";


const ChatHeader = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  
  return (
    <View style={styles.chatHeader}>
      <TouchableOpacity onPress={() => dispatch(setToggleChatHistorySidebar(!toggleStates.toggleChatHistorySidebar))}>
      <Feather  name="menu" size={30} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.upgradeButton}>
        <MaterialCommunityIcons
          name="lightning-bolt-outline"
          size={24}
          color="black"
        />
        <Text>Upgrade Plan</Text> 
      </TouchableOpacity>
      <View style={styles.rightChatHeaderIcons}>
      <TouchableOpacity onPress={()=>navigation.navigate("notes")}>
        <MessageCirclePlus size={30} strokeWidth={1.25} />
      </TouchableOpacity>
       <TouchableOpacity style={{backgroundColor:toggleStates.toggleChatMenuPopup?"#E7ECF5":"transparent",zIndex:9,borderRadius:5}} onPress={()=>dispatch(setToggleChatMenuPopup(!toggleStates.toggleChatMenuPopup))}>
        <EllipsisVertical strokeWidth={1.25} size={30}/>
      </TouchableOpacity>
        
      </View>

    </View>
  );
};

export default ChatHeader;
