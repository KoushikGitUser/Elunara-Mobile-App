import { View, Text, TextInput } from "react-native";
import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather,Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LibraryBig, Mic, Paperclip, Send } from "lucide-react-native";
import { createStyles } from "./ChatHistorySidebar/chatSidebarStyles.styles";
import { useDispatch, useSelector } from "react-redux";
import { setToggleAddItemsToInputPopup, setToggleIsChattingWithAI, setToggleToolsPopup, setToggleTopicsPopup, } from "../../redux/slices/toggleSlice";
import AddItemsToInputPopup from "../Modals/ChatScreen/AddItemsToInputPopup";

const ChatInputMain = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);

  return (
    <View style={styles.chatInputMainWrapper}>
      <View style={styles.chatInputMain}>
        <TextInput
          placeholder="Ask anything"
          placeholderTextColor="grey"
          style={styles.textInput}
        />
        <View style={styles.inputActionIconsMainWrapper}>
          <View style={styles.inputLeftActionIcons}>
            <View style={[styles.parentContainer,{backgroundColor:toggleStates.toggleAddItemsToInputPopup?"#EEF4FF":"transparent",padding:3,borderRadius:8}]}>
              <Paperclip onPress={()=>dispatch(setToggleAddItemsToInputPopup(true))} size={30} strokeWidth={1.25} />
              {toggleStates.toggleAddItemsToInputPopup && <AddItemsToInputPopup/>}
            </View>
           
            <LibraryBig onPress={()=>dispatch(setToggleTopicsPopup(true))} size={30} strokeWidth={1.25} />
            <Ionicons onPress={()=>dispatch(setToggleToolsPopup(true))} name="options-outline" size={30} color="black" />
          </View>
          <View style={styles.inputRightActionIcons}>
            <Mic size={30} strokeWidth={1.25} />
            <Send onPress={()=> dispatch(setToggleIsChattingWithAI(true))} size={30} strokeWidth={1.25} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatInputMain;
