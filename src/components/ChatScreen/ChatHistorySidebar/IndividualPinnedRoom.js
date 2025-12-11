import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import React, { useMemo, useState } from "react";
import { Folder } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./chatSidebarStyles.styles";
import folder from "../../../assets/images/FolderSimple.png";
import FolderIcon from "../../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/FolderIcon";
import { scaleFont } from "../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { setToggleChatHistorySidebar } from "../../../redux/slices/toggleSlice";

const IndividualPinnedRoom = ({ title, translateX }) => {
  const [isLongPressed, setIsLongPressed] = useState(false);

  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const truncateTitle = (title, limit = 20) => {
    if (title.length <= limit) return title;
    return title.slice(0, limit) + "...";
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("rooms", { roomName: title });
        dispatch(setToggleChatHistorySidebar(false));
        Animated.timing(translateX, {
          toValue: toggleStates.toggleChatHistorySidebar
            ? 0
            : SCREEN_WIDTH * 0.75,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }}
      onLongPress={() => {
        setIsLongPressed(!isLongPressed);
        dispatch(setToggleChatHistorySidebar(false));
        Animated.timing(translateX, {
          toValue: toggleStates.toggleChatHistorySidebar
            ? 0
            : SCREEN_WIDTH * 0.75,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }}
      style={styles.individualPinnedRooms}
    >
      <FolderIcon />
      <Text style={{ fontFamily: "Mukta-Regular", fontSize: scaleFont(14) }}>
        {truncateTitle(title)}{" "}
      </Text>
    </TouchableOpacity>
  );
};

export default IndividualPinnedRoom;
