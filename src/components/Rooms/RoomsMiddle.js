import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "../../screens/Rooms/Rooms.styles";
import roomLogo from "../../assets/images/Group 40427.png";
import { moderateScale, scaleFont } from "../../utils/responsive";
import { Brain, Link } from "lucide-react-native";
import BigSearchIcon from "../../../assets/SvgIconsComponent/ProfilePageOptionsIcons/BigSearchIcon";
import AuthGradientText from "../common/AuthGradientText";
import { setToggleAddedRoomDetails } from "../../redux/slices/toggleSlice";
import ChatsComponent from "../AllChatsPage/ChatsComponent";
import SearchIconsHeader from "./SearchIconsHeader";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";

const RoomsMiddle = ({ roomName }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { roomsStates } = useSelector((state) => state.API);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Fetch room chats when room is loaded
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
      {toggleStates.toggleAddedRoomDetails && (
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
      {toggleStates.toggleAddedRoomDetails &&
        !toggleStates.toggleIsRoomEmpty && <SearchIconsHeader />}
      {toggleStates.toggleAddedRoomDetails ? (
        !toggleStates.toggleIsRoomEmpty ? (
          <ScrollView style={[styles.chatsScrollRooms, { zIndex: 9 }]}>
            {roomsStates.fetchingRoomChats ? (
              <ActivityIndicator
                size="large"
                color="#081A35"
                style={{ marginTop: 20 }}
              />
            ) : roomsStates.roomChats?.length > 0 ? (
              roomsStates.roomChats.map((chat, chatsIndex) => {
                return (
                  <ChatsComponent
                    key={chat.uuid || chatsIndex}
                    index={chat.uuid}
                    title={chat.name || chat.title}
                    subject={chat.description || ""}
                    roomName={roomName}
                  />
                );
              })
            ) : (
              <View style={{ marginTop: 20, alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: scaleFont(14),
                    color: "#6B7280",
                    fontFamily: "Mukta-Regular",
                  }}
                >
                  No chats in this room yet
                </Text>
              </View>
            )}
          </ScrollView>
        ) : (
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
        )
      ) : (
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
    </View>
  );
};

export default RoomsMiddle;
