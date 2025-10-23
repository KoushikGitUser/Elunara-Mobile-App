import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
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
import { useDispatch } from "react-redux";
import { setToggleChatHistorySidebar } from "../../../redux/slices/toggleSlice";

const ChatHistorySidebar = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <>
      <TouchableOpacity
        onPress={() => dispatch(setToggleChatHistorySidebar(false))}
        style={styles.chatHistorySidebarBackgroundWrapper}
      ></TouchableOpacity>
      <View style={styles.chatHistorySidebarWrapper}>
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
