import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Animated,
  StatusBar,
} from "react-native";
import React, { useMemo, useState } from "react";
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
import DeleteConfirmPopup from "../../components/ChatScreen/ChatMiddleSection/ChatConversationActions/DeleteConfirmPopup";
import RenameChatPopup from "../../components/ChatScreen/ChatMiddleSection/ChatConversationActions/RenameChatPopup";
import UserMessageActionPopup from "../../components/ChatScreen/Messages/UserMessageActionPopup";
import ChatLongPressPopup from "../../components/ChatScreen/ChatHistorySidebar/ChatLongPressPopup";
import RoomCreationPopup from "../../components/Rooms/RoomCreationPopup";
import UnlockArchiveLimitPopup from "../../components/Monetisation/UnlockArchiveLimitPopup";
import UnlockPersonalisationLimitPopup from "../../components/Monetisation/UnlockPersonalisationLimitPopup";
import ElunaraProWelcomePopup from "../../components/Monetisation/ElunaraProWelcomePopup";
import UniversalTooltip from "../../components/GuidedTourTooltip/UniversalTooltip";
import Toaster from "../../components/UniversalToaster/Toaster";

const ChatScreen = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const translateX = React.useRef(new Animated.Value(0)).current;
  const [showToast, setShowToast] = useState(false);

  const triggerToast = () => {
    setShowToast(true);

    // hide modal after animation completes
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
      <ChatHistorySidebar translateX={translateX} />
      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        <ChatHeader triggerToast={triggerToast} translateX={translateX} />
        <View style={styles.chatMainWrapper}>
          {toggleStates.toggleChatMenuPopup && <ChatOptionsPopup />}
          {toggleStates.toggleToolsPopup && <ToolsOptionsPopup />}
          {toggleStates.toggleTopicsPopup && <TopicsCompo />}
          {toggleStates.toggleDeleteChatConfirmPopup && <DeleteConfirmPopup />}
          {toggleStates.toggleRenameChatPopup && <RenameChatPopup />}
          {toggleStates.toggleUserMessageActionPopup && (
            <UserMessageActionPopup />
          )}
          {toggleStates.toggleChatActionsPopupOnLongPress && (
            <ChatLongPressPopup />
          )}
          {toggleStates.toggleUnlockArchiveLimitPopup && (
            <UnlockArchiveLimitPopup />
          )}
          {toggleStates.toggleUnlockPersonalisationLimitPopup && (
            <UnlockPersonalisationLimitPopup />
          )}
          {toggleStates.toggleElunaraProWelcomePopup && (
            <ElunaraProWelcomePopup />
          )}
          {toggleStates.toggleChatScreenGuideStart && (
            <UniversalTooltip
              title="Customise Your AI"
              description="Customize how Elunara responds, choose the AI model, response style, language, and citation format, all tailored to your needs."
              isBelowButtonPresent={false}
              pointerPosition="down"
              pointerAlignment="left"
              modalPosition="down"
              modalAlignment="right"
              bottom={140}
              right={20}
            />
          )}
          <Toaster visible={showToast} message="Upload limit reached!" />
          {/* middle section */}
          <ChatMiddleWrapper />
          {/* middle section */}

          {/* chatInput section */}
          <ChatInputMain />
          {/* chatInput section */}
        </View>
      </Animated.View>
      <StatusBar
        backgroundColor="#ff0000ff"
        barStyle="dark-content"
        hidden={false}
        translucent={false}
        animated
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
