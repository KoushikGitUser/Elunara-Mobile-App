import { View, Text, TouchableOpacity, TextInput, StatusBar } from "react-native";
import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./ChatScreen.styles";
import ChatInputMain from "../../components/ChatScreen/ChatInputMain";
import ChatHeader from "../../components/ChatScreen/ChatHeader";
import ChatMiddleWrapper from "../../components/ChatScreen/ChatMiddleSection/ChatMiddleWrapper";
import ChatHistorySidebar from "../../components/ChatScreen/ChatHistorySidebar/ChatHistorySidebar";
import { useSelector } from "react-redux";
import ChatOptionsPopup from "../../components/Modals/ChatScreen/ChatOptionsPopup";
import ToolsOptionsPopup from "../../components/ChatScreen/ChatInputCompos/ToolsOptionsPopup";

const ChatScreen = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);

  return (
    <SafeAreaView>
      <View style={styles.chatMainWrapper}>
        {toggleStates.toggleChatMenuPopup && <ChatOptionsPopup/> }
        {toggleStates.toggleToolsPopup && <ToolsOptionsPopup/>}
        {/* Header section */}
         <ChatHeader/>
        {/* Header section */}

        {/* chatsidebar section */}
        { toggleStates.toggleChatHistorySidebar && <ChatHistorySidebar/>}
         {/* chatsidebar section */}

        {/* middle section */}
        <ChatMiddleWrapper/>
        {/* middle section */}

        {/* chatInput section */}
         <ChatInputMain/> 
        {/* chatInput section */}

      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
