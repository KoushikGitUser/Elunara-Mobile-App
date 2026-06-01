import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Folder,
  Pin,
  RefreshCw,
  RotateCw,
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
import {
  setToggleChatHistorySidebar,
  setTriggerLearningLabsHighlightTour,
} from "../../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice"; 

const SidebarMiddle = forwardRef(({ translateX }, ref) => {
  const [recentChatsOpened, setRecentChatsOpened] = useState(true);
  const [pinnedChatsOpened, setPinnedChatsOpened] = useState(false);
  const [pinnedRoomsOpened, setPinnedRoomsOpened] = useState(false);
  const [roomsOpened, setRoomsOpened] = useState(false);
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { roomsStates, chatsStates } = useSelector((state) => state.API);
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const SCREEN_WIDTH = Dimensions.get("window").width;

  // Refs for guided tour measurement
  const pinnedSectionRef = useRef(null);
  const recentChatsSectionRef = useRef(null);

  // Refs + animated values for the chat-functions "highlight labs" tour
  const sidebarScrollRef = useRef(null);
  const labsBlinkOpacity = useRef(new Animated.Value(0)).current;
  const triggerLearningLabsHighlightTour =
    toggleStates.triggerLearningLabsHighlightTour;

  useEffect(() => {
    if (!triggerLearningLabsHighlightTour) return;

    // Step A (t=0): slide the sidebar in. Animation runs ~400ms.
    Animated.timing(translateX, {
      toValue: SCREEN_WIDTH * 0.75,
      duration: 400,
      useNativeDriver: true,
    }).start();
    dispatch(setToggleChatHistorySidebar(true));

    // Step B (t=700ms): expand the Learning Labs accordion. Buffer of 300ms
    // after the slide finishes so the slide animation doesn't share frames
    // with a heavy layout update on low-end devices.
    const expandTimer = setTimeout(() => setRoomsOpened(true), 700);

    // Step C (t=1200ms): scroll to the bottom. We retry once because RN may
    // not have laid out the newly-expanded labs section by the first attempt
    // (especially on slower devices), and scrollToEnd against a stale
    // contentSize is a no-op.
    const scrollTimer = setTimeout(() => {
      sidebarScrollRef.current?.scrollToEnd({ animated: true });
    }, 1200);

    const scrollRetryTimer = setTimeout(() => {
      sidebarScrollRef.current?.scrollToEnd({ animated: true });
    }, 1500);

    // Step D (t=1900ms): blink the labs container border. Animate opacity on
    // the native (UI) thread so the pulses stay frame-perfect even if the JS
    // thread is briefly busy with redux / scroll fallout. Sequence is flat —
    // nested sequences sometimes drop frames between segments.
    const PULSE = 600;
    const blinkTimer = setTimeout(() => {
      Animated.sequence([
        Animated.timing(labsBlinkOpacity, { toValue: 1, duration: PULSE, useNativeDriver: true }),
        Animated.timing(labsBlinkOpacity, { toValue: 0, duration: PULSE, useNativeDriver: true }),
      ]).start(() => {
        // Step E: reset the trigger so it can fire again next time.
        dispatch(setTriggerLearningLabsHighlightTour(false));
      });
    }, 1900);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(scrollTimer);
      clearTimeout(scrollRetryTimer);
      clearTimeout(blinkTimer);
    };
  }, [triggerLearningLabsHighlightTour]);

  // Fetch rooms and pinned rooms on mount
  useEffect(() => {
    dispatch(
      commonFunctionForAPICalls({
        method: "GET",
        url: "/rooms",
        name: "get-rooms",
      }),
    );
    dispatch(
      commonFunctionForAPICalls({
        method: "GET",
        url: "/rooms?pinned=true",
        name: "get-pinned-rooms",
      }),
    );
  }, []);

  const fetchAllRecentChats = () => {
    // Only fetch if not already fetched (check if loader state is not true)
    if (chatsStates.loaderStates.isAllRecentChatsFetched !== true) {
      const payload = {
        method: "GET",
        url: "/chats/recent?limit=10",
        name: "getAllRecentChats",
      };
      dispatch(commonFunctionForAPICalls(payload));
    }
  };

  // Fetch recent chats when the sidebar OPENS (i.e., user taps the menu icon
  // in ChatHeader). The internal guard in fetchAllRecentChats ensures this
  // only actually hits the API if the data isn't already cached — so opening
  // the sidebar multiple times in a row won't re-fetch. Other flows (chat
  // create / delete / archive / rename) reset `isAllRecentChatsFetched` so
  // the next sidebar open refetches fresh data.
  useEffect(() => {
    if (toggleStates.toggleChatHistorySidebar) {
      fetchAllRecentChats();
    }
  }, [toggleStates.toggleChatHistorySidebar]);

  const fetchAllPinnedChats = () => {
    // Only fetch if not already fetched (check if loader state is not true)
    if (chatsStates.loaderStates.isAllUserChatsFetched !== true) {
      const payload = {
        method: "GET",
        url: "/chats",
        name: "fetchAllUserChatsAvailable",
      };
      dispatch(commonFunctionForAPICalls(payload));
    }
  };

  // Expose measurement methods via ref
  useImperativeHandle(ref, () => ({
    measurePinnedSection: () => {
      return new Promise((resolve) => {
        if (pinnedSectionRef.current) {
          pinnedSectionRef.current.measureInWindow((x, y, width, height) => {
            resolve({ x, y, width, height });
          });
        } else {
          resolve(null);
        }
      });
    },
    measureRecentChatsSection: () => {
      return new Promise((resolve) => {
        if (recentChatsSectionRef.current) {
          recentChatsSectionRef.current.measureInWindow(
            (x, y, width, height) => {
              resolve({ x, y, width, height });
            },
          );
        } else {
          resolve(null);
        }
      });
    },
  }));

  const pinnedChatsCount = chatsStates.allChatsDatas.allUserChatsAvailable?.filter(
    (chat) => chat.is_pinned,
  )?.length || 0;
  const pinnedRoomsCount = roomsStates.pinnedRooms?.length || 0;

  return (
    <ScrollView ref={sidebarScrollRef} style={styles.chatHistorySidebarMiddle}>
      <View ref={pinnedSectionRef} style={[styles.pinnedSectionMain, pinnedChatsCount === 0 && pinnedRoomsCount === 0 && chatsStates.loaderStates.isAllUserChatsFetched === true && { borderBottomWidth: 0 }]}>
        {(pinnedChatsCount > 0 || chatsStates.loaderStates.isAllUserChatsFetched !== true) && (
          <>
            <TouchableOpacity
              onPress={() => {
                setPinnedChatsOpened(!pinnedChatsOpened);
                fetchAllPinnedChats();
              }}
              style={styles.pinnedBtn}
            >
              <PinIcon color="#888888" />
              <Text
                style={{
                  fontSize: moderateScale(15),
                  marginLeft: 20,
                  fontFamily: "Mukta-Regular",
                }}
              >
                Pinned Chats ({pinnedChatsCount})
              </Text>
              {pinnedChatsOpened ? (
                <ChevronUp style={{ marginLeft: "auto" }} strokeWidth={1.25} />
              ) : (
                <ChevronDown style={{ marginLeft: "auto" }} strokeWidth={1.25} />
              )}
            </TouchableOpacity>
            {pinnedChatsOpened && (
              <View style={styles.individualPinnedChatsMain}>
                {chatsStates.loaderStates.isAllUserChatsFetched == true ? (
                  pinnedChatsCount > 0 ? (
                    chatsStates.allChatsDatas.allUserChatsAvailable
                      .filter((chat) => chat.is_pinned)
                      .map((chat, chatIndex) => {
                        return (
                          <IndividualPinnedChat
                            translateX={translateX}
                            key={chatIndex}
                            item={chat}
                          />
                        );
                      })
                  ) : (
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 20,
                      }}
                    >
                      <Text style={{ color: "#081A35" }}>
                        No pinned chats{"   "}
                      </Text>
                    </View>
                  )
                ) : chatsStates.loaderStates.isAllUserChatsFetched == "pending" ? (
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingVertical: 20,
                    }}
                  >
                    <ActivityIndicator color="#081A35" size="small" />
                  </View>
                ) : (
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingVertical: 20,
                    }}
                  >
                    <Text style={{ color: "#ff7474ff" }}>
                      Something went wrong{"   "}
                    </Text>
                    <RotateCw onPress={fetchAllPinnedChats} color="#081A35" />
                  </View>
                )}
              </View>
            )}
          </>
        )}
        {pinnedRoomsCount > 0 && (
          <>
            <TouchableOpacity
              onPress={() => setPinnedRoomsOpened(!pinnedRoomsOpened)}
              style={styles.pinnedBtn}
            >
              <PinIcon color="#888888" />
              <Text
                style={{
                  fontSize: moderateScale(15),
                  marginLeft: 20,
                  fontFamily: "Mukta-Regular",
                }}
              >
                Pinned Learning Labs ({pinnedRoomsCount})
              </Text>
              {pinnedRoomsOpened ? (
                <ChevronUp style={{ marginLeft: "auto" }} strokeWidth={1.25} />
              ) : (
                <ChevronDown style={{ marginLeft: "auto" }} strokeWidth={1.25} />
              )}
            </TouchableOpacity>
            {pinnedRoomsOpened && (
              <View style={styles.individualPinnedChatsMain}>
                {roomsStates.pinnedRooms.map((room, roomIndex) => (
                  <IndividualPinnedRoom
                    translateX={translateX}
                    key={room.uuid || roomIndex}
                    title={room.name}
                    room={room}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </View>
      <View ref={recentChatsSectionRef} style={styles.pinnedSectionMain}>
        <TouchableOpacity
          onPress={() => setRecentChatsOpened(!recentChatsOpened)}
          style={[styles.pinnedBtn, { paddingLeft: 0 }]}
        >
          <Text
            style={{
              fontSize: moderateScale(15),
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
            {chatsStates.loaderStates.isAllRecentChatsFetched == true ? (
              chatsStates.allChatsDatas.allRecentChats?.length > 0 ? (
                chatsStates.allChatsDatas.allRecentChats.map(
                  (chat, chatIndex) => {
                    return (
                      <IndividualRecentChat
                        translateX={translateX}
                        key={chatIndex}
                        item={chat}
                      />
                    );
                  },
                )
              ) : (
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 20,
                  }}
                >
                  <Text style={{ color: "#081A35" }}>
                    No chats to show{"   "}
                  </Text>
                </View>
              )
            ) : chatsStates.loaderStates.isAllRecentChatsFetched ==
              "pending" ? (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 20,
                }}
              >
                <ActivityIndicator color="#081A35" size="small" />
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 20,
                }}
              >
                <Text style={{ color: "#ff7474ff" }}>
                  Something went wrong{"   "}
                </Text>
                <RotateCw onPress={fetchAllRecentChats} color="#081A35" />
              </View>
            )}
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
              fontSize: moderateScale(15),
              marginLeft: 20,
              fontFamily: "Mukta-Regular",
            }}
          >
            Learning Labs
          </Text>
          {roomsOpened ? (
            <ChevronUp style={{ marginLeft: "auto" }} strokeWidth={1.25} />
          ) : (
            <ChevronDown style={{ marginLeft: "auto" }} strokeWidth={1.25} />
          )}
        </TouchableOpacity>
        {roomsOpened && (
          <View style={styles.individualPinnedChatsMain}>
            {/* Tour highlight: light-blue background blink, rendered first so
                it sits BEHIND the labs content (siblings stack in JSX order). */}
            <Animated.View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: "#E9F2FF",
                  borderRadius: 12,
                  opacity: labsBlinkOpacity,
                },
              ]}
            />
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
                No learning labs yet
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
                View all Learning Labs
              </Text>
              <ChevronRight style={{ marginLeft: "auto" }} strokeWidth={1.25} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
});

export default SidebarMiddle;
