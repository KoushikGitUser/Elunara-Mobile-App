import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Animated,
  Dimensions,
} from "react-native";
import React, { useEffect, useMemo, useRef, forwardRef, useImperativeHandle } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDown,
  Folder,
  FolderPlus,
  MessageCirclePlus,
  Pin,
  Search,
} from "lucide-react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { moderateScale } from "../../../utils/responsive";
import Octicons from "@expo/vector-icons/Octicons";
import { createStyles } from "./chatSidebarStyles.styles";
import SidebarHeader from "./SidebarHeader";
import SidebarMiddle from "./SidebarMiddle";
import SidebarFooter from "./SidebarFooter";
import { useDispatch, useSelector } from "react-redux";
import { setToggleChatHistorySidebar } from "../../../redux/slices/toggleSlice";
import { StyleSheet } from "react-native";
import RoomCreationPopup from "../../Rooms/RoomCreationPopup";
import UnlockLearningLabPopup from "../../Monetisation/UnlockLearningLabPopup";
import ProPlanUpgradingPopup from "../../Monetisation/ProPlanUpgradingPopup";
import UnlockNewChatLimitPopup from "../../Monetisation/UnlockNewChatLimitPopup";
import { useFonts } from "expo-font";

const ChatHistorySidebar = forwardRef(({ translateX }, ref) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);

  // Refs for child components
  const sidebarHeaderRef = useRef(null);
  const sidebarMiddleRef = useRef(null);

  // Expose measurement methods via ref
  useImperativeHandle(ref, () => ({
    measureLearningLabBtn: async () => {
      if (sidebarHeaderRef.current?.measureLearningLabBtn) {
        return await sidebarHeaderRef.current.measureLearningLabBtn();
      }
      return null;
    },
    measurePinnedSection: async () => {
      if (sidebarMiddleRef.current?.measurePinnedSection) {
        return await sidebarMiddleRef.current.measurePinnedSection();
      }
      return null;
    },
    measureRecentChatsSection: async () => {
      if (sidebarMiddleRef.current?.measureRecentChatsSection) {
        return await sidebarMiddleRef.current.measureRecentChatsSection();
      }
      return null;
    },
  }));

  // Check if guided tour needs touch-blocking overlay
  const shouldBlockTouches =
    globalDataStates.manualGuidedTourRunning &&
    (globalDataStates.navigationBasicsGuideTourSteps >= 2 ||
      globalDataStates.learningLabsGuideTourSteps >= 1);

  const [fontsLoaded] = useFonts({
    "Mukta-Bold": require("../../../../assets/fonts/Mukta-Bold.ttf"),
    "Mukta-Regular": require("../../../../assets/fonts/Mukta-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
    }
  }, [fontsLoaded]);

  // Show nothing (or a loader) while fonts are loading
  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          Animated.timing(translateX, {
            toValue: toggleStates.toggleChatHistorySidebar
              ? 0
              : SCREEN_WIDTH * 0.75,
            duration: 300,
            useNativeDriver: true,
          }).start();
          dispatch(
            setToggleChatHistorySidebar(!toggleStates.toggleChatHistorySidebar)
          );
        }}
        style={[
          styles.chatHistorySidebarBackgroundWrapper,
          { display: toggleStates.toggleChatHistorySidebar ? "flex" : "none" },
        ]}
      ></TouchableOpacity>
      <StatusBar
        backgroundColor="#ff0000ff"
        barStyle="dark-content"
        hidden={false}
        translucent={false}
        animated
      />
      {toggleStates.toggleRoomCreationPopup && <RoomCreationPopup />}
      {toggleStates.toggleLearningLabUnlockPopup && <UnlockLearningLabPopup />}
      {toggleStates.toggleProPlanUpgradePopup && <ProPlanUpgradingPopup />}
      {toggleStates.toggleUnlockNewChatPopup && <UnlockNewChatLimitPopup />}
      <View
        style={[
          styles.chatHistorySidebarWrapper,
          {
            marginLeft: toggleStates.toggleChatHistorySidebar
              ? 0
              : -SCREEN_WIDTH * 0.75,
              top:StatusBar.currentHeight
          },
        ]}
      >
        {/* Touch-blocking overlay for guided tour */}
        {shouldBlockTouches && (
          <View style={sidebarOverlayStyles.touchBlockingOverlay} pointerEvents="box-only" />
        )}

        {/* chat history header */}
        <SidebarHeader ref={sidebarHeaderRef} translateX={translateX} />
        {/* chat history header */}

        {/* chat history middle */}
        <SidebarMiddle ref={sidebarMiddleRef} translateX={translateX} />
        {/* chat history middle */}

        {/* chat history footer */}
        <SidebarFooter translateX={translateX} />
        {/* chat history footer */}
      </View>
    </>
  );
});

const sidebarOverlayStyles = StyleSheet.create({
  touchBlockingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 9998,
  },
});

export default ChatHistorySidebar;
