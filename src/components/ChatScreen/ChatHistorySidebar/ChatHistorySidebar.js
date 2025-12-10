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
import React, { useEffect, useMemo } from "react";
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
import RoomCreationPopup from "../../Rooms/RoomCreationPopup";
import UnlockLearningLabPopup from "../../Monetisation/UnlockLearningLabPopup";
import ProPlanUpgradingPopup from "../../Monetisation/ProPlanUpgradingPopup";
import UnlockNewChatLimitPopup from "../../Monetisation/UnlockNewChatLimitPopup";
import { useFonts } from "expo-font";

const ChatHistorySidebar = ({ translateX }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const { toggleStates } = useSelector((state) => state.Toggle);

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
        {/* chat history header */}
        <SidebarHeader translateX={translateX} />
        {/* chat history header */}

        {/* chat history middle */}
        <SidebarMiddle translateX={translateX} />
        {/* chat history middle */}

        {/* chat history footer */}
        <SidebarFooter translateX={translateX} />
        {/* chat history footer */}
      </View>
    </>
  );
};

export default ChatHistorySidebar;
