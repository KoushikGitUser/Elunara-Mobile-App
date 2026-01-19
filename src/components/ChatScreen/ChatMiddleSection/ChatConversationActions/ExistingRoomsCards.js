import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";
import FolderIcon from "../../../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/FolderIcon";
import { CirclePlus } from "lucide-react-native";
import { scaleFont } from "../../../../utils/responsive";
import { useDispatch } from "react-redux";
import { setToggleAddChatToLearningLabPopup } from "../../../../redux/slices/toggleSlice";
import {  triggerToastWithAction } from "../../../../services/toast";

const ExistingRoomsCards = ({ roomName, chats }) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity onPress={() => {
        dispatch(setToggleAddChatToLearningLabPopup(false));
        setTimeout(() => {
            triggerToastWithAction("Successfully added!","Your chat has been added to <Learning lab Name>","success",5000,"Undo",()=>{})
        }, 500);
        
    }} style={styles.cardContainer}>
      <View style={[styles.cardContent]}>
        {/* Chat Icon */}
        <View style={styles.iconContainer}>
          <FolderIcon />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{roomName}</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitleText}>{chats} Chats</Text>
          </View>
        </View>

        {/* Menu Icon */}
        <Pressable
          style={({ pressed }) => [
            styles.menuButton,
            pressed && styles.menuPressed,
          ]}
          onPress={() => {}}
        >
          <CirclePlus strokeWidth={2} size={27} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    fontSize: scaleFont(16),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#3A3A3A",
    marginBottom: 4,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitleText: {
    fontSize: scaleFont(14),
    color: "#757575",
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
  },
  dotSeparator: {
    fontSize: 14,
    color: "#9CA3AF",
    marginHorizontal: 8,
    fontFamily: "Mukta-Regular",
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

export default ExistingRoomsCards;
