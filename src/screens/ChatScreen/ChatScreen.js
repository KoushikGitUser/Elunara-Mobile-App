import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./ChatScreen.styles";
import ChatInputMain from "../../components/ChatScreen/ChatInputMain";
import ChatHeader from "../../components/ChatScreen/ChatHeader";
import ChatMiddleWrapper from "../../components/ChatScreen/ChatMiddleSection/ChatMiddleWrapper";
import ChatHistorySidebar from "../../components/ChatScreen/ChatHistorySidebar/ChatHistorySidebar";
import { useSelector } from "react-redux";

const ChatScreen = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const { toggleChatHistorySidebar } = useSelector((state) => state.Toggle);

  return (
    <SafeAreaView>
      <View style={styles.chatMainWrapper}>
        {/* Header section */}
         <ChatHeader/>
        {/* Header section */}

        {/* chatsidebar section */}
        { toggleChatHistorySidebar && <ChatHistorySidebar/>}
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
