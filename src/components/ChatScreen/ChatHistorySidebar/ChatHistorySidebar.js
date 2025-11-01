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
import React, { useMemo } from "react";
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

const ChatHistorySidebar = ({ translateX }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const { toggleStates } = useSelector((state) => state.Toggle);

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
        style={[styles.chatHistorySidebarBackgroundWrapper,{display:toggleStates.toggleChatHistorySidebar?"flex":"none"}]}
      ></TouchableOpacity>
      <View style={[styles.chatHistorySidebarWrapper,{marginLeft:toggleStates.toggleChatHistorySidebar?0:-SCREEN_WIDTH*0.75}]}>
        {/* chat history header */}
        <SidebarHeader />
        {/* chat history header */}

        {/* chat history middle */}
        <SidebarMiddle />
        {/* chat history middle */}

        {/* chat history footer */}
        <SidebarFooter />
        {/* chat history footer */}
      </View>
    </>
  );
};

export default ChatHistorySidebar;
