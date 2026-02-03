import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "../../screens/Rooms/Rooms.styles";
import roomLogo from "../../assets/images/Group 40427.png";
import { moderateScale, scaleFont } from "../../utils/responsive";
import { Brain, Link } from "lucide-react-native";
import BigSearchIcon from "../../../assets/SvgIconsComponent/ProfilePageOptionsIcons/BigSearchIcon";
import AuthGradientText from "../common/AuthGradientText";
import ChatsComponent from "../AllChatsPage/ChatsComponent";
import SearchIconsHeader from "./SearchIconsHeader";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";
import RoomChatsOptionsPopup from "./RoomChatsOptionsPopup";
import RemoveFromRoomConfirmPopup from "./RemoveFromRoomConfirmPopup";

const RoomsMiddle = ({ roomName }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const { roomsStates } = useSelector((state) => state.API);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

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
  const hasRoomChats = roomChats.length > 0;
  const hasDescription = !!roomsStates.currentRoom?.description;

  // Debug logging for room chats
  console.log("═══════════════════════════════════════════════════════");
  console.log("🏠 ROOM CHATS DEBUG");
  console.log("🏠 Current Room UUID:", roomsStates.currentRoom?.uuid);
  console.log("🏠 Room Chats Count:", roomChats.length);
  console.log("🏠 Room Chats Data:", JSON.stringify(roomChats, null, 2));
  console.log("═══════════════════════════════════════════════════════");

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
            <TouchableOpacity disabled style={styles.sourcesAndInstruction}>
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
            </TouchableOpacity>
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
      {/* Show search header when there are chats */}
      {hasRoomChats && <SearchIconsHeader />}

      {/* Main content area */}
      {roomsStates.fetchingRoomChats ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 40 }}>
          <ActivityIndicator size="large" color="#081A35" />
        </View>
      ) : hasRoomChats ? (
        // Show available chats
        <ScrollView style={[styles.chatsScrollRooms, { zIndex: 9 }]}>
          {roomChats.map((chat, chatsIndex) => {
            return (
              <ChatsComponent
                key={chat.uuid || chat.id || chatsIndex}
                index={chat.uuid || chat.id}
                title={chat.name || chat.title}
                subject={chat.description || ""}
                roomName={roomName}
                chatData={chat}
                setPopupPosition={setPopupPosition}
                isRoomContext={true}
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
          <View style={styles.addDetailsOptions}>
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
          </View>
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
    </View>
  );
};

export default RoomsMiddle;
