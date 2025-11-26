import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { MessageCircle, MoreVertical } from "lucide-react-native";
import { scaleFont, verticalScale } from "../../utils/responsive";
import RoomsOptionsPopup from "../Modals/Rooms/RoomsOptionsPopup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import FolderIcon from "../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/FolderIcon";
import { setToggleAllChatsOptionsPopup } from "../../redux/slices/toggleSlice";

const ChatsScrollForAllRoomsPage = ({ title, subject, roomName, onPress, index }) => {
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const [optionsIndex, setOptionsIndex] = useState(null);

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View
        style={[
          styles.cardContent,
          { zIndex: optionsIndex == index ? 99999 : 9 },
        ]}
      >
        {toggleStates.toggleAllChatsOptionsPopup && optionsIndex == index && (
          <RoomsOptionsPopup setRoomOptionsPopup={setOptionsIndex} />
        )}
        {/* Chat Icon */}
        <View style={styles.iconContainer}>
          <FolderIcon/>
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitleText}>{subject}</Text>
          </View>
        </View>

        {/* Menu Icon */}
        <Pressable
          style={({ pressed }) => [
            styles.menuButton,
            pressed && styles.menuPressed,
          ]}
          onPress={() => {
            dispatch(setToggleAllChatsOptionsPopup(true));
            setOptionsIndex(index);
          }}
        >
          <MoreVertical size={24} color="#000000ff" strokeWidth={2} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  allChatsScrollMain: {
    width: "100%",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  cardContainer: {
    paddingVertical: 16,
    zIndex: 5,
    width: "100%",
  },
  cardPressed: {
    backgroundColor: "#F9FAFB",
  },
  cardContent: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  iconContainer: {
    alignSelf: "flex-start",
    marginTop: 3,
    marginRight: 18,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  titleText: {
    fontSize: scaleFont(15),
    fontWeight: "600",
    color: "#3A3A3A",
    marginBottom: 4,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitleText: {
    fontSize: scaleFont(13),
    color: "#757575",
    fontWeight: "400",
  },
  dotSeparator: {
    fontSize: 14,
    color: "#9CA3AF",
    marginHorizontal: 8,
  },
  menuButton: {
    marginLeft: "auto",
  },
  menuPressed: {
    opacity: 0.5,
  },
  separator: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginHorizontal: 16,
  },
});

export default ChatsScrollForAllRoomsPage;
