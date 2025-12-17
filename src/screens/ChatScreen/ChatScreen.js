import {
  View,
  Dimensions,
  Animated,
  StatusBar,
  BackHandler,
  Alert,
} from "react-native";
import React, { useEffect, useMemo, useCallback, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { createStyles } from "./ChatScreen.styles";
import ChatInputMain from "../../components/ChatScreen/ChatInputMain";
import ChatHeader from "../../components/ChatScreen/ChatHeader";
import ChatMiddleWrapper from "../../components/ChatScreen/ChatMiddleSection/ChatMiddleWrapper";
import ChatHistorySidebar from "../../components/ChatScreen/ChatHistorySidebar/ChatHistorySidebar";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToggleChatScreenGuideStart } from "../../redux/slices/toggleSlice";
import { setGuidedTourStepsCount } from "../../redux/slices/globalDataSlice";
import ChatOptionsPopup from "../../components/Modals/ChatScreen/ChatOptionsPopup";
import ToolsOptionsPopup from "../../components/ChatScreen/ChatInputCompos/ToolsOptionsPopup";
import TopicsCompo from "../../components/ChatScreen/ChatInputCompos/TopicsCompo";
import DeleteConfirmPopup from "../../components/ChatScreen/ChatMiddleSection/ChatConversationActions/DeleteConfirmPopup";
import RenameChatPopup from "../../components/ChatScreen/ChatMiddleSection/ChatConversationActions/RenameChatPopup";
import UserMessageActionPopup from "../../components/ChatScreen/Messages/UserMessageActionPopup";
import ChatLongPressPopup from "../../components/ChatScreen/ChatHistorySidebar/ChatLongPressPopup";
import UnlockArchiveLimitPopup from "../../components/Monetisation/UnlockArchiveLimitPopup";
import UnlockPersonalisationLimitPopup from "../../components/Monetisation/UnlockPersonalisationLimitPopup";
import ElunaraProWelcomePopup from "../../components/Monetisation/ElunaraProWelcomePopup";
import UniversalTooltip from "../../components/GuidedTourTooltip/UniversalTooltip";
import ToasterWithAction from "../../components/UniversalToaster/ToasterWithAction";
import { useFonts } from "expo-font";
import ChangeLLMPopup from "../../components/ChatScreen/Messages/ChatQuickActionsPopups/ChangeResponse/ChangeLLMPopup";
import ChangeLangPopup from "../../components/ChatScreen/Messages/ChatQuickActionsPopups/ChangeLang/ChangeLangPopup";
import ChangeResponseStylePopup from "../../components/ChatScreen/Messages/ChatQuickActionsPopups/ChangeStyle/ChangeResponseStylePopup";
import NotHelpfulFeedbackPopup from "../../components/ChatScreen/Messages/ChatQuickActionsPopups/Feedback/NotHelpfulFeedbackPopup";
import AddChatToLearningLabPopup from "../../components/ChatScreen/ChatMiddleSection/ChatConversationActions/AddChatToLearningLabPopup";
import ExitAppConfirmationPopup from "../../components/ChatScreen/ExitAppConfirmationPopup";

const ChatScreen = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const translateX = useRef(new Animated.Value(0)).current;
  const [toggleExitAppConfirmPopup, setToggleExitAppConfirmPopup] = useState(false);

  const [fontsLoaded] = useFonts({
    "Mukta-Bold": require("../../../assets/fonts/Mukta-Bold.ttf"),
    "Mukta-Regular": require("../../../assets/fonts/Mukta-Regular.ttf"),
    "Mukta-Medium": require("../../../assets/fonts/Mukta-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const checkNewUser = async () => {
      const isNewUser = await AsyncStorage.getItem("isNewUser");
      if (isNewUser === null) {
        dispatch(setToggleChatScreenGuideStart(true));
        dispatch(setGuidedTourStepsCount(1));
      }
    };
    checkNewUser();
  }, []);

    useEffect(() => {
    const backAction = () => {
      setToggleExitAppConfirmPopup(true);
      return true; // prevent default behavior (exit)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // clean up
  }, [toggleExitAppConfirmPopup]);


  // Show nothing (or a loader) while fonts are loading
  if (!fontsLoaded) {
    return null;
  }


  return (
    <SafeAreaView
      style={{ flex: 1, width: "100%", marginTop: -StatusBar.currentHeight }}
    >
      <ChatHistorySidebar translateX={translateX} />
      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        <View
          style={{
            height: StatusBar.currentHeight,
            width: "100%",
            backgroundColor: "#FAFAFA",
            zIndex: 9999,
          }}
        ></View>
        <ChatHeader translateX={translateX} />
        <View style={styles.chatMainWrapper}>
          {toggleStates.toggleChatMenuPopup && <ChatOptionsPopup />}
          {toggleStates.toggleToolsPopup && <ToolsOptionsPopup />}
          {toggleStates.toggleTopicsPopup && <TopicsCompo />}
          {toggleStates.toggleDeleteChatConfirmPopup && <DeleteConfirmPopup />}
          {toggleStates.toggleRenameChatPopup && <RenameChatPopup />}
          {toggleStates.toggleChangeResponseLLMWhileChatPopup && (
            <ChangeLLMPopup />
          )}
          {toggleExitAppConfirmPopup && <ExitAppConfirmationPopup setToggleExitAppConfirmPopup={setToggleExitAppConfirmPopup} toggleExitAppConfirmPopup={toggleExitAppConfirmPopup} />}
          {toggleStates.toggleChangeLangWhileChatPopup && <ChangeLangPopup />}
          {toggleStates.toggleChangeResponseStyleWhileChatPopup && (
            <ChangeResponseStylePopup />
          )}
          {toggleStates.toggleNotHelpfulFeedbackPopup && (
            <NotHelpfulFeedbackPopup />
          )}
          {toggleStates.toggleAddChatToLearningLabPopup && (
            <AddChatToLearningLabPopup />
          )}
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
          {toggleStates.toggleChatScreenGuideStart && globalDataStates.guidedTourStepsCount == 1 && (
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
              pointerLeft={60} 
            />
          )}
          {toggleStates.toggleChatScreenGuideStart && globalDataStates.guidedTourStepsCount == 2 && (
            <UniversalTooltip
              title="Organise your work quickly."
              description="Start a new learning lab easily from the sidebar to keep everything focused."
              isBelowButtonPresent={false}
              pointerPosition="up"
              pointerAlignment="left"
              modalPosition="up"
              modalAlignment="left"
              top ={105}
              left={10}
              pointerLeft={20}
            />
          )}
          <ToasterWithAction />
          {/* middle section */}
          <ChatMiddleWrapper />
          {/* middle section */}

          {/* chatInput section */}
          <View style={{ width: "100%", marginBottom: 30 }}>
            <ChatInputMain />
          </View>
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
