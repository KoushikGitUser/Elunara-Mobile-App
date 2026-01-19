import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import FolderIcon from "../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/FolderIcon";
import { scaleFont } from "../../utils/responsive";
import { CirclePlus } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { setToggleAddExistingChatToRoomPopup } from "../../redux/slices/toggleSlice";
import { triggerToast } from "../../services/toast";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";

const ExistingChatsCards = ({ chatName, projects, chat }) => {
  const dispatch = useDispatch();
  const { roomsStates } = useSelector((state) => state.API);

  const handleAddChat = () => {
    if (roomsStates.currentRoom?.uuid && (chat.uuid || chat.id)) {
      const payload = {
        method: "POST",
        url: `/rooms/${roomsStates.currentRoom.uuid}/chats`,
        name: "add-chats-to-room",
        data: { chat_ids: [chat.uuid || chat.id] },
      };

      dispatch(commonFunctionForAPICalls(payload));

      // Close popup immediately or wait for success?
      // Usually better to close and let background handle it, or show loading.
      // For now, mirroring previous behavior + API call.
      dispatch(setToggleAddExistingChatToRoomPopup(false));
      // Toast is handled by the reducer handler now (Step 14, line 259 triggers success toast)
      // So we can remove the manual triggerToast here to avoid double toasts.
    } else {
      triggerToast("Error", "Could not identify room or chat", "error", 3000);
    }
  };

  return (
    <TouchableOpacity onPress={handleAddChat} style={styles.cardContainer}>
      <View style={[styles.cardContent]}>
        {/* Chat Icon */}
        <View style={styles.iconContainer}>
          <FolderIcon />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{chatName}</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitleText}>{projects} Projects</Text>
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
    fontSize: scaleFont(15),
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
    fontSize: scaleFont(13),
    color: "#757575",
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
  },
  dotSeparator: {
    fontSize: 14,
    fontFamily: "Mukta-Regular",
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

export default ExistingChatsCards;
