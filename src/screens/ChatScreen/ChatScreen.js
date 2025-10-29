import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
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
import TopicsCompo from "../../components/ChatScreen/ChatInputCompos/TopicsCompo";
import { StatusBar } from "expo-status-bar";

const ChatScreen = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);

  return (
      <SafeAreaView style={{flex:1,width:"100%",}}>
        <StatusBar backgroundColor="black" style="dark" />
        <ChatHeader />
        <View style={styles.chatMainWrapper}>
          {toggleStates.toggleChatMenuPopup && <ChatOptionsPopup />}
          {toggleStates.toggleToolsPopup && <ToolsOptionsPopup />}
          {toggleStates.toggleTopicsPopup && <TopicsCompo />}
          {/* Header section */}

          {/* Header section */}
          {/* chatsidebar section */}
          {toggleStates.toggleChatHistorySidebar && <ChatHistorySidebar />}
          {/* chatsidebar section */}

          {/* middle section */}
          <ChatMiddleWrapper />
          {/* middle section */}

          {/* chatInput section */}
          <ChatInputMain />
          {/* chatInput section */}
        </View>
      </SafeAreaView>

  );
};

export default ChatScreen;
