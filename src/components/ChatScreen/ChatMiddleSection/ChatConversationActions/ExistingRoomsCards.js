import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import FolderIcon from "../../../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/FolderIcon";
import { CirclePlus } from "lucide-react-native";
import { scaleFont } from "../../../../utils/responsive";
import { useDispatch } from "react-redux";
import { setToggleAddChatToLearningLabPopup } from "../../../../redux/slices/toggleSlice";
import { triggerToastWithAction, triggerToast } from "../../../../services/toast";
import { commonFunctionForAPICalls } from "../../../../redux/slices/apiCommonSlice";

const ExistingRoomsCards = ({ roomId, roomName, chats, chatUuid }) => {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToRoom = async () => {
    console.log("🏠 ADD TO ROOM: Pressed", { roomId, roomName, chatUuid });

    if (isAdding) {
      console.log("🏠 ADD TO ROOM: Already adding, skipping");
      return;
    }

    if (!chatUuid) {
      console.log("🏠 ADD TO ROOM: chatUuid is missing");
      triggerToast("Error", "No chat selected to add", "error", 3000);
      return;
    }

    if (!roomId) {
      console.log("🏠 ADD TO ROOM: roomId is missing");
      triggerToast("Error", "Room ID is missing", "error", 3000);
      return;
    }

    setIsAdding(true);

    try {
      console.log("🏠 ADD TO ROOM: Making API call", {
        url: `/chats/${chatUuid}/room`,
        data: { room_id: roomId },
      });

      await dispatch(
        commonFunctionForAPICalls({
          method: "POST",
          url: `/chats/${chatUuid}/room`,
          data: { room_id: roomId },
          name: "add-chat-to-room",
        })
      ).unwrap();

      console.log("🏠 ADD TO ROOM: Success!");

      // Refetch chat details to update room name under chat title
      dispatch(
        commonFunctionForAPICalls({
          method: "GET",
          url: `/chats/${chatUuid}`,
          name: "getAllDetailsOfChatByID",
        })
      );

      dispatch(setToggleAddChatToLearningLabPopup(false));

      setTimeout(() => {
        triggerToastWithAction(
          "Successfully added!",
          `Your chat has been added to ${roomName}`,
          "success",
          5000,
          "Undo",
          async () => {
            // Undo action - remove from room
            await dispatch(
              commonFunctionForAPICalls({
                method: "DELETE",
                url: `/chats/${chatUuid}/room`,
                name: "remove-chat-from-room",
              })
            ).unwrap();

            // Refetch chat details to remove room name from chat title
            dispatch(
              commonFunctionForAPICalls({
                method: "GET",
                url: `/chats/${chatUuid}`,
                name: "getAllDetailsOfChatByID",
              })
            );
          }
        );
      }, 500);
    } catch (error) {
      console.error("🏠 ADD TO ROOM: Failed", error);
      triggerToast("Error", "Failed to add chat to room", "error", 3000);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <TouchableOpacity onPress={handleAddToRoom} style={styles.cardContainer}>
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

        {/* Add Icon / Loader */}
        <View style={styles.menuButton}>
          {isAdding ? (
            <ActivityIndicator size="small" color="#081A35" />
          ) : (
            <CirclePlus strokeWidth={2} size={27} />
          )}
        </View>
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
