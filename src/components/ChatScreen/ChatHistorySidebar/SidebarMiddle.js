import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useMemo, useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Folder,
  Pin,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./chatSidebarStyles.styles";
import { moderateScale } from "../../../utils/responsive";
import { recentChats } from "../../../data/datas";
import IndividualRecentChat from "./IndividualRecentChat";
import IndividualPinnedChat from "./IndividualPinnedChat";
import IndividualPinnedRoom from "./IndividualPinnedRoom";
import pin from "../../../assets/images/pinGrey.png";
import room from "../../../assets/images/FolderSimple.png";
import chat from "../../../assets/images/ChatsTeardrop.png";
import PinIcon from "../../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/PinIcon";
import FolderIcon from "../../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/FolderIcon";
import ChatsIcon from "../../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/ChatsIcon";
import { useDispatch, useSelector } from "react-redux";
import { setToggleChatHistorySidebar } from "../../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";

const SidebarMiddle = ({ translateX }) => {
  const [recentChatsOpened, setRecentChatsOpened] = useState(false);
  const [pinnedChatsOpened, setPinnedChatsOpened] = useState(false);
  const [pinnedRoomsOpened, setPinnedRoomsOpened] = useState(false);
  const [roomsOpened, setRoomsOpened] = useState(false);
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { roomsStates } = useSelector((state) => state.API);
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const SCREEN_WIDTH = Dimensions.get("window").width;

  // Fetch rooms and pinned rooms on mount
  useEffect(() => {
    dispatch(
      commonFunctionForAPICalls({
        method: "GET",
        url: "/rooms",
        name: "get-rooms",
      })
    );
    dispatch(
      commonFunctionForAPICalls({
        method: "GET",
        url: "/rooms?pinned=true",
        name: "get-pinned-rooms",
      })
    );
  }, []);

  return (
    <ScrollView style={styles.chatHistorySidebarMiddle}>
      <View style={styles.pinnedSectionMain}>
        <TouchableOpacity
          onPress={() => setPinnedChatsOpened(!pinnedChatsOpened)}
          style={styles.pinnedBtn}
        >
          <PinIcon />
          <Text
            style={{
              fontSize: moderateScale(12.5),
              marginLeft: 20,
              fontFamily: "Mukta-Regular",
            }}
          >
            Pinned Chats (06)
          </Text>
          {pinnedChatsOpened ? (
            <ChevronUp style={{ marginLeft: "auto" }} strokeWidth={1.25} />
          ) : (
            <ChevronDown style={{ marginLeft: "auto" }} strokeWidth={1.25} />
          )}
        </TouchableOpacity>
        {pinnedChatsOpened && (
          <View style={styles.individualPinnedChatsMain}>
            {recentChats.map((chat, chatIndex) => {
              return (
                <IndividualPinnedChat
                  translateX={translateX}
                  key={chatIndex}
                  title={chat?.title}
                />
              );
            })}
          </View>
        )}
        <TouchableOpacity
          onPress={() => setPinnedRoomsOpened(!pinnedRoomsOpened)}
          style={styles.pinnedBtn}
        >
          <PinIcon />
          <Text
            style={{
              fontSize: moderateScale(12.5),
              marginLeft: 20,
              fontFamily: "Mukta-Regular",
            }}
          >
            Pinned Learning Labs ({roomsStates.pinnedRooms?.length || 0})
          </Text>
          {pinnedRoomsOpened ? (
            <ChevronUp style={{ marginLeft: "auto" }} strokeWidth={1.25} />
          ) : (
            <ChevronDown style={{ marginLeft: "auto" }} strokeWidth={1.25} />
          )}
        </TouchableOpacity>
        {pinnedRoomsOpened && (
          <View style={styles.individualPinnedChatsMain}>
            {roomsStates.pinnedRooms?.length > 0 ? (
              roomsStates.pinnedRooms.map((room, roomIndex) => (
                <IndividualPinnedRoom
                  translateX={translateX}
                  key={room.uuid || roomIndex}
                  title={room.name}
                  room={room}
                />
              ))
            ) : (
              <Text style={{ paddingLeft: 20, fontSize: 12, color: "#6B7280" }}>
                No pinned rooms
              </Text>
            )}
          </View>
        )}
      </View>
      <View style={styles.pinnedSectionMain}>
        <TouchableOpacity
          onPress={() => setRecentChatsOpened(!recentChatsOpened)}
          style={[styles.pinnedBtn, { paddingLeft: 0 }]}
        >
          <Text
            style={{
              fontSize: moderateScale(13),
              marginLeft: 20,
              fontFamily: "Mukta-Regular",
            }}
          >
            Recent chats
          </Text>
          {recentChatsOpened ? (
            <ChevronUp style={{ marginLeft: "auto" }} strokeWidth={1.25} />
          ) : (
            <ChevronDown style={{ marginLeft: "auto" }} strokeWidth={1.25} />
          )}
        </TouchableOpacity>
        {recentChatsOpened && (
          <View style={styles.individualRecentChatsMain}>
            {recentChats.map((chat, chatIndex) => {
              return (
                <IndividualRecentChat
                  translateX={translateX}
                  key={chatIndex}
                  title={chat?.title}
                />
              );
            })}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("allchats");
                dispatch(setToggleChatHistorySidebar(false));
                Animated.timing(translateX, {
                  toValue: toggleStates.toggleChatHistorySidebar
                    ? 0
                    : SCREEN_WIDTH * 0.75,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              }}
              style={[styles.pinnedBtn, { paddingLeft: 0, width: "90%" }]}
            >
              <ChatsIcon />
              <Text
                style={{
                  fontSize: moderateScale(13),
                  marginLeft: 20,
                  fontFamily: "Mukta-Regular",
                }}
              >
                View all Chats
              </Text>
              <ChevronRight style={{ marginLeft: "auto" }} strokeWidth={1.25} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.pinnedSectionMain}>
        <TouchableOpacity
          onPress={() => setRoomsOpened(!roomsOpened)}
          style={[styles.pinnedBtn]}
        >
          <FolderIcon />
          <Text
            style={{
              fontSize: moderateScale(13),
              marginLeft: 20,
              fontFamily: "Mukta-Regular",
            }}
          >
            Rooms
          </Text>
          {roomsOpened ? (
            <ChevronUp style={{ marginLeft: "auto" }} strokeWidth={1.25} />
          ) : (
            <ChevronDown style={{ marginLeft: "auto" }} strokeWidth={1.25} />
          )}
        </TouchableOpacity>
        {roomsOpened && (
          <View style={styles.individualPinnedChatsMain}>
            {roomsStates.rooms?.length > 0 ? (
              roomsStates.rooms
                .slice(0, 5)
                .map((room, roomIndex) => (
                  <IndividualPinnedRoom
                    translateX={translateX}
                    key={room.uuid || roomIndex}
                    title={room.name}
                    room={room}
                  />
                ))
            ) : (
              <Text style={{ paddingLeft: 20, fontSize: 12, color: "#6B7280" }}>
                No rooms yet
              </Text>
            )}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("allRooms");
                dispatch(setToggleChatHistorySidebar(false));
                Animated.timing(translateX, {
                  toValue: toggleStates.toggleChatHistorySidebar
                    ? 0
                    : SCREEN_WIDTH * 0.75,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              }}
              style={[styles.pinnedBtn, { paddingLeft: 0, width: "90%" }]}
            >
              <FolderIcon />
              <Text
                style={{
                  fontSize: moderateScale(13),
                  marginLeft: 20,
                  fontFamily: "Mukta-Regular",
                }}
              >
                View all Rooms
              </Text>
              <ChevronRight style={{ marginLeft: "auto" }} strokeWidth={1.25} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SidebarMiddle;
