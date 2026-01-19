import {
  View,
  Text,
  Animated,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import AddRoomDetailsHeader from "../../components/Rooms/AddRoomDetailsHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import ScrollListIcon from "../../../assets/SvgIconsComponent/RoomsIcons/ScrollListIcon";
import { scaleFont } from "../../utils/responsive";
import BrainMindIcon from "../../../assets/SvgIconsComponent/RoomsIcons/BrainMindIcon";
import SlidersToolsIcon from "../../../assets/SvgIconsComponent/RoomsIcons/SlidersToolsIcon";
import ToolsContainers from "../../components/ChatScreen/ChatInputCompos/ToolsContainers";
import { MoreVertical, Paperclip, Plus, Trash2 } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ToolsOptionsPopup from "../../components/ChatScreen/ChatInputCompos/ToolsOptionsPopup";
import { useDispatch, useSelector } from "react-redux";
import SourcesPopup from "../../components/Modals/Rooms/SourcesPopup";
import { setToggleAddedRoomDetails } from "../../redux/slices/toggleSlice";
import pdfLogo from "../../assets/images/pdf.png";
import AddLinkPopup from "../../components/common/AddLinkPopup";
import { triggerToast } from "../../services/toast";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";
import {
  setTempRoomProperty,
  resetTempRoomSettings,
} from "../../redux/slices/apiCommonSlice";
const { width } = Dimensions.get("window");

const AddRoomDetails = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [sourcesPopup, setSourcesPopup] = useState(false);
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false },
  );
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { roomsStates } = useSelector((state) => state.API);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  // Get roomUuid from route params or currentRoom in Redux
  const roomUuid = route.params?.roomUuid || roomsStates.currentRoom?.uuid;

  // Fetch room data when screen opens
  useEffect(() => {
    if (roomUuid) {
      const payload = {
        method: "GET",
        url: `/rooms/${roomUuid}`,
        name: "get-room",
      };
      dispatch(commonFunctionForAPICalls(payload));
    }
  }, [roomUuid]);

  // Load existing room data when it's fetched
  useEffect(() => {
    if (roomsStates.currentRoom) {
      setDescription(roomsStates.currentRoom.description || "");
      setInstructions(roomsStates.currentRoom.instructions || "");

      // Initialize temp settings
      dispatch(
        setTempRoomProperty({
          key: "llm_id",
          value:
            roomsStates.currentRoom.llm_id || roomsStates.currentRoom.llm?.id,
        }),
      );
      dispatch(
        setTempRoomProperty({
          key: "response_style_id",
          value:
            roomsStates.currentRoom.response_style_id ||
            roomsStates.currentRoom.response_style?.id,
        }),
      );
      dispatch(
        setTempRoomProperty({
          key: "response_language_id",
          value:
            roomsStates.currentRoom.response_language_id ||
            roomsStates.currentRoom.response_language?.id,
        }),
      );
      dispatch(
        setTempRoomProperty({
          key: "citation_format_id",
          value:
            roomsStates.currentRoom.citation_format_id ||
            roomsStates.currentRoom.citation_format?.id,
        }),
      );
    }
  }, [roomsStates.currentRoom]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      dispatch(resetTempRoomSettings());
    };
  }, []);

  const handleSaveDetails = () => {
    // Use roomUuid from route params or currentRoom as fallback
    const effectiveRoomUuid =
      route.params?.roomUuid || roomsStates.currentRoom?.uuid;

    if (!effectiveRoomUuid) {
      triggerToast("Error", "Room not found", "error", 3000);
      return;
    }

    const payload = {
      method: "PUT",
      url: `/rooms/${effectiveRoomUuid}`,
      name: "update-room",
      data: {
        description: description,
        instructions: instructions,
        llm_id: roomsStates.tempRoomSettings.llm_id,
        response_style_id: roomsStates.tempRoomSettings.response_style_id,
        response_language_id: roomsStates.tempRoomSettings.response_language_id,
        citation_format_id: roomsStates.tempRoomSettings.citation_format_id,
      },
    };

    dispatch(commonFunctionForAPICalls(payload));
    navigation.navigate("rooms", {
      roomName: roomsStates.currentRoom?.name || "Room",
      roomUuid: roomsStates.currentRoom?.uuid || roomsStates.currentRoom?.id,
    });
    dispatch(setToggleAddedRoomDetails(true));
  };

  return (
    <SafeAreaView
      style={{ flex: 1, width: "100%", backgroundColor: "#FAFAFA" }}
    >
      {toggleStates.toggleAddLinkPopup && <AddLinkPopup />}
      {toggleStates.toggleToolsPopup && <ToolsOptionsPopup />}
      <AddRoomDetailsHeader scrollY={scrollY} />
      <ScrollView
        onScroll={handleScroll}
        style={{ flex: 1, width: "100%", zIndex: 9 }}
      >
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <ScrollListIcon />
            <Text style={styles.title}>Add Description</Text>
          </View>
          <Text style={styles.subtitle}>
            Briefly describe what this Room is about
          </Text>
          <View style={styles.inputLarge}>
            <TextInput
              style={styles.inputText}
              placeholder='e.g. "Preparing for final exams in biology"...'
              placeholderTextColor="#9CA3AF"
              returnKeyType="done"
              value={description}
              onChangeText={setDescription}
              multiline={true}
            />
          </View>
        </View>
        <View style={[styles.header, { marginTop: 35 }]}>
          <View style={styles.headerTitleContainer}>
            <BrainMindIcon />
            <Text style={styles.title}>Add Instructions</Text>
          </View>
          <Text style={styles.subtitle}>
            Help Elunara AI support you better by outlining goals or task
            instructions here
          </Text>
          <View style={styles.inputLarge}>
            <TextInput
              style={styles.inputText}
              placeholder="Answer as if I'm new — keep it beginner-friendly."
              placeholderTextColor="#9CA3AF"
              returnKeyType="done"
              value={instructions}
              onChangeText={setInstructions}
              multiline={true}
            />
          </View>
        </View>
        <View style={[styles.header, { marginTop: 35 }]}>
          <View style={styles.headerTitleContainer}>
            <SlidersToolsIcon />
            <Text style={styles.title}>Tools</Text>
          </View>
          <Text style={styles.subtitle}>
            Help Elunara AI support you better by outlining goals or task
            instructions here
          </Text>
        </View>
        <View style={styles.mainOptionsContainer}>
          <View style={styles.toolsContainer}>
            <ToolsContainers />
          </View>
        </View>
        <View style={[styles.card, { marginTop: 10 }]}>
          <View style={styles.contentWrapper}>
            {sourcesPopup && <SourcesPopup setSourcesPopup={setSourcesPopup} />}
            {/* Left Content */}
            <View style={styles.leftContent}>
              {/* Header with Icon and Title */}
              <View style={[styles.titleSection, { marginBottom: 15 }]}>
                <Paperclip size={26} color="#888888" strokeWidth={1.5} />
                <Text style={styles.title}>Sources (Files or Links)</Text>
              </View>

              {/* Description */}
              <Text style={[styles.description, { width: "100%" }]}>
                Share references you want the AI to use
              </Text>
            </View>

            {/* Plus Button - Centered to left content */}
            <TouchableOpacity
              onPress={() => setSourcesPopup(true)}
              style={styles.addButton}
            >
              <Plus size={28} color="#1F2937" strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
          {/* Dynamic File List */}
          {roomsStates.currentRoom?.attachments?.map((file, index) => (
            <TouchableOpacity key={index} style={styles.linksMain}>
              {/* Link Icon based on type (simplified for now to PDF logo or generic) */}
              <View style={styles.pdfLogoContainer}>
                <Image
                  source={pdfLogo}
                  style={{ height: 25, width: 25, objectFit: "contain" }}
                />
              </View>

              {/* Link Details */}
              <View style={styles.linkDetails}>
                <Text style={styles.url}>{file.filename || file.name} </Text>
                <Text style={styles.description}>
                  {file.type === "document" ? "PDF" : "File"}{" "}
                </Text>
              </View>

              {/* More Options Button acting as Delete for now */}
              <TouchableOpacity
                style={styles.moreButton}
                onPress={() => {
                  Alert.alert(
                    "Delete Attachment",
                    "Are you sure you want to delete this attachment?",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => {
                          const payload = {
                            method: "DELETE",
                            url: `/attachments/${file.id || file.uuid}`, // Ensure correct ID field
                            name: "delete-attachment",
                          };
                          dispatch(commonFunctionForAPICalls(payload)).then(
                            () => {
                              // Refresh room
                              dispatch(
                                commonFunctionForAPICalls({
                                  method: "GET",
                                  url: `/rooms/${roomUuid}`,
                                  name: "get-room",
                                }),
                              );
                            },
                          );
                        },
                      },
                    ],
                  );
                }}
              >
                <Trash2 size={20} color="#EF4444" strokeWidth={2} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.verifyButton, { marginBottom: 25 }]}
            onPress={handleSaveDetails}
            activeOpacity={0.8}
            disabled={roomsStates.updatingRoom}
          >
            {roomsStates.updatingRoom ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.verifyButtonText}>Save details</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 15,
  },
  bellIcon: {
    marginRight: 16,
  },
  title: {
    fontSize: scaleFont(17),
    fontWeight: "600",
    fontFamily: "Mukta-Medium",
    color: "#1F2937",
    letterSpacing: -0.5,
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: scaleFont(13),
    fontFamily: "Mukta-Regular",
    color: "#6B7280",
    marginTop: 10,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  inputLarge: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 26,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#1F2937",
    letterSpacing: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    height: 120,
    marginTop: 20,
  },
  inputText: {
    backgroundColor: "#FFFFFF",
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    color: "#1F2937",
    letterSpacing: 0.2,
    flex: 1,
    textAlignVertical: "top",
  },
  mainOptionsContainer: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  toolsContainer: {
    width: "100%",
    paddingVertical: 7,
    paddingHorizontal: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    backgroundColor: "white",
    borderRadius: 19,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    position: "relative",
  },
  leftContent: {
    width: "80%",
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: "#1F2937",
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: scaleFont(14),
    lineHeight: 20,
    color: "#757575",
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
  },
  card: {
    borderRadius: 16,
    padding: 20,
    width: "100%",
    zIndex: 9999,
  },
  verifyButton: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
  verifyButtonDisabled: {
    backgroundColor: "#CDD5DC",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontWeight: "500",
    fontFamily: "Mukta-Bold",
    letterSpacing: 0.3,
  },
  sourcesPopupWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "red",
    top: 0,
    left: 0,
    zIndex: 99,
  },
  iconContainer: {
    width: 55,
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CDD5DC",
  },
  linkDetails: {
    flex: 1,
    gap: 4,
  },
  url: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    fontFamily: "Mukta-Medium",
    color: "#1F2937",
    lineHeight: 24,
  },
  moreButton: {
    padding: 4,
  },
  linksMain: {
    backgroundColor: "#EBF1FB",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
    width: width - 32,
    gap: 14,
    alignSelf: "center",
    marginTop: 20,
  },
  pdfLogoContainer: {
    height: "100%",
    width: 60,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#c3cddcff",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddRoomDetails;
