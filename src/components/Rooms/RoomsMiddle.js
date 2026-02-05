import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "../../screens/Rooms/Rooms.styles";
import roomLogo from "../../assets/images/Group 40427.png";
import { moderateScale, scaleFont } from "../../utils/responsive";
import { Brain, Link, Check, Trash2 } from "lucide-react-native";
import BigSearchIcon from "../../../assets/SvgIconsComponent/ProfilePageOptionsIcons/BigSearchIcon";
import AuthGradientText from "../common/AuthGradientText";
import ChatsComponent from "../AllChatsPage/ChatsComponent";
import SearchIconsHeader from "./SearchIconsHeader";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";
import RoomChatsOptionsPopup from "./RoomChatsOptionsPopup";
import RemoveFromRoomConfirmPopup from "./RemoveFromRoomConfirmPopup";
import BulkRemoveFromRoomConfirmPopup from "./BulkRemoveFromRoomConfirmPopup";
import { setToggleBulkRemoveFromRoomConfirmPopup, setToggleIsChattingWithAI } from "../../redux/slices/toggleSlice";

const RoomsMiddle = ({ roomName }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const { roomsStates } = useSelector((state) => state.API);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  // Multi-select state
  const [selectedArray, setSelectedArray] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [checked, setChecked] = useState(false);

  // Search state - filter chats by name
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch chats that are IN the room when room is loaded
  useEffect(() => {
    if (roomsStates.currentRoom?.uuid) {
      const payload = {
        method: "GET",
        url: `/rooms/${roomsStates.currentRoom.uuid}/chats`,
        name: "get-room-chats",
      };
      dispatch(commonFunctionForAPICalls(payload));
    }
  }, [roomsStates.currentRoom?.uuid]);

  // Determine what to show based on room chats and description
  const roomChats = roomsStates.roomChats || [];

  // Filter room chats by search query
  const filteredRoomChats = searchQuery.trim()
    ? roomChats.filter(chat =>
        chat.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : roomChats;

  const hasRoomChats = roomChats.length > 0;
  const hasDescription = !!roomsStates.currentRoom?.description;

  // Debug logging for room chats
  console.log("═══════════════════════════════════════════════════════");
  console.log("🏠 ROOM CHATS DEBUG");
  console.log("🏠 Current Room UUID:", roomsStates.currentRoom?.uuid);
  console.log("🏠 Room Chats Count:", roomChats.length);
  console.log("🏠 Room Chats Data:", JSON.stringify(roomChats, null, 2));
  console.log("═══════════════════════════════════════════════════════");

  // Handle select all for room chats
  const handleSelectAll = () => {
    setChecked(!checked);
    if (!checked) {
      const allIds = roomChats.map((chat) => chat.id);
      setSelectedArray(allIds);
    } else {
      setSelectedArray([]);
    }
  };

  // Handle bulk remove from room
  const handleBulkRemoveFromRoom = () => {
    if (!selectedArray || selectedArray.length === 0) {
      return;
    }
    dispatch(setToggleBulkRemoveFromRoomConfirmPopup(true));
  };

  // Reset selection state after bulk operation completes
  const handleBulkOperationComplete = () => {
    setSelectedArray([]);
    setIsSelecting(false);
    setChecked(false);
  };

  // Handle chat press within room - load chat without navigating away
  const handleRoomChatPress = (chatData) => {
    // Fetch chat details
    const chatDetailsPayload = {
      method: "GET",
      url: `/chats/${chatData?.id}`,
      name: "getAllDetailsOfChatByID",
    };
    dispatch(commonFunctionForAPICalls(chatDetailsPayload));

    // Fetch all messages of the chat
    const messagesPayload = {
      method: "GET",
      url: `/chats/${chatData?.id}/messages`,
      name: "getAllMessagesOfParticularChat",
    };
    dispatch(commonFunctionForAPICalls(messagesPayload));

    // Set chatting state to show ChatMiddleWrapper
    dispatch(setToggleIsChattingWithAI(true));
  };

  return (
    <View style={styles.roomMiddleMain}>
      <View style={styles.middleIconAndText}>
        <Image source={roomLogo} style={styles.roomLogo} />
        <View>
          <Text
            style={{
              fontSize: moderateScale(24),
              fontWeight: 600,
              fontFamily: "Mukta-Bold",
            }}
          >
            {roomsStates.currentRoom?.name || roomName}
          </Text>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: "#717680",
              fontFamily: "Mukta-Regular",
            }}
          >
            {roomsStates.currentRoom?.description ||
              "Your Study Lab: view chats, set context, add files, and start new conversations."}
          </Text>
        </View>
      </View>
      {/* Show sources/edit section when there are chats or description */}
      {hasRoomChats && (
        <View style={styles.sources}>
          <View style={styles.sourcesInn}>
            <TouchableOpacity disabled style={styles.sourcesAndInstruction}>
              <Text
                style={{
                  fontSize: scaleFont(12),
                  fontWeight: 500,
                  fontFamily: "Mukta-Medium",
                }}
              >
                {roomsStates.currentRoom?.instructions
                  ? "Instructions added"
                  : "No instructions"}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity disabled style={styles.sourcesAndInstruction}>
              <Text
                style={{
                  fontSize: scaleFont(12),
                  fontWeight: 500,
                  fontFamily: "Mukta-Medium",
                }}
              >
                Sources(
                {roomsStates.currentRoom?.attachments?.length
                  ? roomsStates.currentRoom?.attachments?.length
                  : 0}
                )
              </Text>
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() =>
              navigation.navigate("roomDetails", {
                roomUuid: roomsStates.currentRoom?.uuid,
              })
            }
          >
            <Text
              style={{
                fontSize: scaleFont(14),
                fontWeight: 600,
                fontFamily: "Mukta-Medium",
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Show search header or bulk action bar when there are chats */}
      {hasRoomChats && (
        isSelecting ? (
          <View style={bulkStyles.container}>
            {/* Left side - Select All */}
            <TouchableOpacity
              style={bulkStyles.selectAllContainer}
              onPress={handleSelectAll}
              activeOpacity={0.7}
            >
              <View
                style={[bulkStyles.checkbox, checked && bulkStyles.checkboxChecked]}
              >
                {checked && (
                  <Check strokeWidth={2} size={17} color="white" />
                )}
              </View>
              <Text style={bulkStyles.selectAllText}>Select All</Text>
            </TouchableOpacity>

            {/* Right side - Selected count and Remove from Room */}
            <View style={bulkStyles.rightContainer}>
              <View style={bulkStyles.selectedBadge}>
                <Text style={bulkStyles.selectedText}>
                  {selectedArray.length} Selected
                </Text>
              </View>

              <TouchableOpacity
                onPress={handleBulkRemoveFromRoom}
                style={bulkStyles.actionButton}
                activeOpacity={0.7}
              >
                <Trash2 size={24} color="#1a2233" strokeWidth={1.8} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <SearchIconsHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        )
      )}

      {/* Main content area */}
      {roomsStates.fetchingRoomChats ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 40 }}>
          <ActivityIndicator size="large" color="#081A35" />
        </View>
      ) : hasRoomChats ? (
        // Show available chats
        <ScrollView style={[styles.chatsScrollRooms, { zIndex: 9 }]}>
          {filteredRoomChats.map((chat, chatsIndex) => {
            return (
              <ChatsComponent
                key={chat.uuid || chat.id || chatsIndex}
                index={chat.id}
                title={chat.name || chat.title}
                subject={chat.subject?.name}
                roomName={roomName}
                chatData={chat}
                setPopupPosition={setPopupPosition}
                isRoomContext={true}
                isSelecting={isSelecting}
                selectedArray={selectedArray}
                setIsSelecting={setIsSelecting}
                setSelectedArray={setSelectedArray}
                onChatPress={handleRoomChatPress}
              />
            );
          })}
        </ScrollView>
      ) : hasDescription ? (
        // No chats but has description - show "Start Something Great Today"
        <View
          style={[
            styles.middleBelowAddSection,
            { borderWidth: 0, backgroundColor: "#FAFAFA" },
          ]}
        >
          <View style={styles.noResultMain}>
            <BigSearchIcon />
            <AuthGradientText
              marginBottom={0}
              marginTop={15}
              fullWidth={false}
              widthMultiplier={0.55}
              fontSize={scaleFont(20)}
            >
              Start Something Great Today!
            </AuthGradientText>
            <Text
              style={{
                fontSize: scaleFont(14),
                fontFamily: "Mukta-Regular",
                textAlign: "center",
                width: "100%",
                color: "#757575",
              }}
            >
              Create your first chat to dive into personalised AI help. Chats
              created in this Learning Lab will appear here.
            </Text>
          </View>
        </View>
      ) : (
        // No chats and no description - show add instructions component
        <View style={styles.middleBelowAddSection}>
          <View style={styles.addDetailsOptions}>
            <Brain strokeWidth={1.5} size={25} style={{ marginTop: 5 }} />
            <View style={{ width: "85%" }}>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  fontWeight: 600,
                  fontFamily: "Mukta-Bold",
                }}
              >
                Add Instructions
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(14),
                  color: "#717680",
                  fontFamily: "Mukta-Regular",
                }}
              >
                Tailor the way Elunara AI responds in this Room
              </Text>
            </View>
          </View>
          {/* <View style={styles.addDetailsOptions}>
            <Link strokeWidth={1.5} size={25} style={{ marginTop: 5 }} />
            <View style={{ width: "85%" }}>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  fontWeight: 600,
                  fontFamily: "Mukta-Bold",
                }}
              >
                Add Files or Links
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(14),
                  color: "#717680",
                  fontFamily: "Mukta-Regular",
                }}
              >
                Share sources to set the quicker context
              </Text>
            </View>
          </View> */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("roomDetails", {
                roomUuid: roomsStates.currentRoom?.uuid,
              })
            }
            style={styles.addDetailsBtn}
          >
            <Text
              style={{
                fontSize: moderateScale(14),
                fontWeight: 600,
                fontFamily: "Mukta-Bold",
              }}
            >
              Add room details
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Room Chats Options Popup */}
      <RoomChatsOptionsPopup popupPosition={popupPosition} />
      {/* Remove from Room Confirmation Popup */}
      <RemoveFromRoomConfirmPopup />
      {/* Bulk Remove from Room Confirmation Popup */}
      <BulkRemoveFromRoomConfirmPopup
        selectedChatIds={selectedArray}
        onComplete={handleBulkOperationComplete}
      />
    </View>
  );
};

const bulkStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 20,
    width: "100%",
  },
  selectAllContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#1a2233",
    borderColor: "#1a2233",
  },
  selectAllText: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: "#1a2233",
    letterSpacing: -0.3,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  selectedBadge: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: "#D3DAE5",
    backgroundColor: "transparent",
  },
  selectedText: {
    fontSize: scaleFont(12),
    fontWeight: "500",
    color: "#1a2233",
    letterSpacing: -0.2,
  },
  actionButton: {
    padding: 4,
  },
});

export default RoomsMiddle;
