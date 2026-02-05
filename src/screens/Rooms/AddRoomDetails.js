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
  Modal,
  Platform,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import AddRoomDetailsHeader from "../../components/Rooms/AddRoomDetailsHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import ScrollListIcon from "../../../assets/SvgIconsComponent/RoomsIcons/ScrollListIcon";
import { scaleFont } from "../../utils/responsive";
import BrainMindIcon from "../../../assets/SvgIconsComponent/RoomsIcons/BrainMindIcon";
import SlidersToolsIcon from "../../../assets/SvgIconsComponent/RoomsIcons/SlidersToolsIcon";
import RoomToolsContainer from "../../components/Rooms/RoomToolsContainer";
import { MoreVertical, Paperclip, Plus, Trash2 } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import RoomToolsOptionsPopup from "../../components/Rooms/RoomToolsPopup/RoomToolsOptionsPopup";
import UnsavedChangesConfirmPopup from "../../components/Rooms/UnsavedChangesConfirmPopup";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import SourcesPopup from "../../components/Modals/Rooms/SourcesPopup";
import {
  setToggleAddedRoomDetails,
  setToggleAddLinkPopup,
  initializeRoomCustomisation,
  resetRoomCustomisation,
  setToggleUnsavedChangesConfirmPopup,
} from "../../redux/slices/toggleSlice";
import pdfLogo from "../../assets/images/pdf.png";
import deleteBin from "../../assets/images/deleteBin.png";
import AddLinkPopup from "../../components/common/AddLinkPopup";
import { BlurView } from "@react-native-community/blur";
import { triggerToast } from "../../services/toast";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";
const { width } = Dimensions.get("window");

const AddRoomDetails = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [sourcesPopup, setSourcesPopup] = useState(false);
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [pendingNavigationAction, setPendingNavigationAction] = useState(null);

  // Delete Popup States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sourceToDelete, setSourceToDelete] = useState(null);
  const [isDeletingSource, setIsDeletingSource] = useState(false);
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false },
  );
  const { toggleStates, roomCustomisationStates } = useSelector((state) => state.Toggle);
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
  // Track if initial load has happened
  const hasInitialized = React.useRef(false);
  const initialValues = React.useRef({});

  useEffect(() => {
    if (roomsStates.currentRoom) {
      const desc = roomsStates.currentRoom.description || "";
      const inst = roomsStates.currentRoom.instructions || "";

      setDescription(desc);
      setInstructions(inst);

      // Only initialize room customisation states on first load, not on every room update
      // This prevents overwriting user selections when the room is updated
      if (!hasInitialized.current) {
        hasInitialized.current = true;

        // Store initial values for comparison
        initialValues.current = {
          description: desc,
          instructions: inst,
          llm_id: roomsStates.currentRoom.llm?.id,
          response_style_id: roomsStates.currentRoom.response_style?.id,
          response_language_id: roomsStates.currentRoom.response_language?.id,
          citation_format_id: roomsStates.currentRoom.citation_format?.id,
        };

        dispatch(
          initializeRoomCustomisation({
            llm: roomsStates.currentRoom.llm || { id: null, name: "Auto" },
            response_style: roomsStates.currentRoom.response_style || { id: null, name: "Auto" },
            response_language: roomsStates.currentRoom.response_language || { id: null, name: "English" },
            citation_format: roomsStates.currentRoom.citation_format || { id: null, name: "Harvard" },
          }),
        );
      }
    }
  }, [roomsStates.currentRoom]);

  // Track changes to set unsaved changes flag
  useEffect(() => {
    if (!hasInitialized.current) return;

    const hasChanges =
      description !== initialValues.current.description ||
      instructions !== initialValues.current.instructions ||
      roomCustomisationStates.selectedRoomLLM?.id !== initialValues.current.llm_id ||
      roomCustomisationStates.selectedRoomResponseStyle?.id !== initialValues.current.response_style_id ||
      roomCustomisationStates.selectedRoomLanguage?.id !== initialValues.current.response_language_id ||
      roomCustomisationStates.selectedRoomCitationFormat?.id !== initialValues.current.citation_format_id;

    setHasUnsavedChanges(hasChanges);
  }, [description, instructions, roomCustomisationStates.selectedRoomLLM, roomCustomisationStates.selectedRoomResponseStyle, roomCustomisationStates.selectedRoomLanguage, roomCustomisationStates.selectedRoomCitationFormat]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      dispatch(resetRoomCustomisation());
    };
  }, []);

  // Handle back button press with unsaved changes alert
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!hasUnsavedChanges) {
        // If we don't have unsaved changes, just let the action proceed
        return;
      }

      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Store the navigation action and show custom modal
      setPendingNavigationAction(e.data.action);
      dispatch(setToggleUnsavedChangesConfirmPopup(true));
    });

    return unsubscribe;
  }, [navigation, hasUnsavedChanges]);

  const  handleSaveDetails = () => {
    // Use roomUuid from route params or currentRoom as fallback
    const effectiveRoomUuid =
      route.params?.roomUuid || roomsStates.currentRoom?.uuid;

    if (!effectiveRoomUuid) {
      triggerToast("Error", "Room not found", "error", 3000);
      return;
    }

    // Include ALL keys in the update payload
    const payload = {
      method: "PUT",
      url: `/rooms/${effectiveRoomUuid}`,
      name: "update-room",
      data: {
        description: description,
        instructions: instructions,
        llm_id: roomCustomisationStates.selectedRoomLLM?.id,
        response_style_id: roomCustomisationStates.selectedRoomResponseStyle?.id,
        response_language_id: roomCustomisationStates.selectedRoomLanguage?.id,
        citation_format_id: roomCustomisationStates.selectedRoomCitationFormat?.id,
      },
    };

    dispatch(commonFunctionForAPICalls(payload));
    setHasUnsavedChanges(false);
    navigation.navigate("rooms", {
      roomName: roomsStates.currentRoom?.name || "Room",
      roomUuid: roomsStates.currentRoom?.uuid || roomsStates.currentRoom?.id,
    });
    dispatch(setToggleAddedRoomDetails(true));
  };

  const handleDiscardChanges = () => {
    if (pendingNavigationAction) {
      navigation.dispatch(pendingNavigationAction);
      setPendingNavigationAction(null);
    }
  };

  const handleAddLink = (linkData) => {
    // Fallback: Append link to instructions since API doesn't support link attachments yet
    const newLinkText = `\n\nReference: ${linkData.url} ${linkData.description ? `(${linkData.description})` : ""}`;
    const newInstructions = instructions
      ? instructions + newLinkText
      : `Reference: ${linkData.url} ${linkData.description ? `(${linkData.description})` : ""}`;

    setInstructions(newInstructions);

    // Auto-save the room with new instructions
    const payload = {
      method: "PUT",
      url: `/rooms/${roomUuid}`,
      name: "update-room",
      data: {
        description: description,
        instructions: newInstructions,
        llm_id: roomCustomisationStates.selectedRoomLLM?.id,
        response_style_id: roomCustomisationStates.selectedRoomResponseStyle?.id,
        response_language_id: roomCustomisationStates.selectedRoomLanguage?.id,
        citation_format_id: roomCustomisationStates.selectedRoomCitationFormat?.id,
        attachments:
          roomsStates.currentRoom?.attachments?.map((a) => a.id || a.uuid) ||
          [],
      },
    };

    dispatch(commonFunctionForAPICalls(payload))
      .then(() => {
        // Refresh room
        dispatch(
          commonFunctionForAPICalls({
            method: "GET",
            url: `/rooms/${roomUuid}`,
            name: "get-room",
          }),
        );
        triggerToast("Success", "Link added to instructions", "success", 3000);
      })
      .catch((err) => {
        triggerToast("Error", "Failed to save link", "error", 3000);
      });

    dispatch(setToggleAddLinkPopup(false));
  };

  return (
    <SafeAreaView
      style={{ flex: 1, width: "100%", backgroundColor: "#FAFAFA" }}
    >
      {toggleStates.toggleAddLinkPopup && (
        <AddLinkPopup onLinkAdded={handleAddLink} />
      )}
      {toggleStates.toggleRoomToolsPopup && <RoomToolsOptionsPopup />}
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
            <RoomToolsContainer />
          </View>
        </View>
        <View style={[styles.card, ]}>
       


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

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalContainer}>
          <BlurView
            style={styles.blurView}
            blurType="light"
            blurAmount={7}
            reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.43)"
          />
          <View style={styles.androidBlur} />

          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={() => setShowDeleteModal(false)}
          />

          <View style={styles.modalSheet}>
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>

            <View style={styles.modalContent}>
              <View style={styles.modalIconContainer}>
                <Image source={deleteBin} style={styles.verifiedIcon} />
              </View>

              <Text style={[styles.modalTitle, { fontFamily: "Mukta-Bold" }]}>
                Delete Source?
              </Text>

              <Text
                style={[
                  styles.modalDescription,
                  { fontFamily: "Mukta-Regular" },
                ]}
              >
                Are you sure you want to delete this{" "}
                {sourceToDelete?.type === "link_instruction" ? "link" : "file"}?
              </Text>

              <View style={styles.btnsMain}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonCancel]}
                  onPress={() => setShowDeleteModal(false)}
                >
                  <Text style={[styles.modalButtonText, { color: "black" }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalButton}
                  disabled={isDeletingSource}
                  onPress={() => {
                    setIsDeletingSource(true);

                    if (sourceToDelete?.type === "link_instruction") {
                      // Delete Link: Remove text string from instructions
                      // CRITICAL: use 'instructions' from closure, but we are inside component so it's fresh?
                      // No, it's fresh enough.
                      // Construct payload MANUALLY to ensure consistency
                      const newInstructions = instructions
                        .replace(sourceToDelete.originalString, "")
                        .trim();
                      setInstructions(newInstructions);

                      const payload = {
                        method: "PUT",
                        url: `/rooms/${roomUuid}`,
                        name: "update-room",
                        data: {
                          description: description,
                          instructions: newInstructions, // USE THE NEW VALUE
                          llm_id: roomCustomisationStates.selectedRoomLLM?.id,
                          response_style_id:
                            roomCustomisationStates.selectedRoomResponseStyle?.id,
                          response_language_id:
                            roomCustomisationStates.selectedRoomLanguage?.id,
                          citation_format_id:
                            roomCustomisationStates.selectedRoomCitationFormat?.id,
                        },
                      };

                      dispatch(commonFunctionForAPICalls(payload))
                        .then(() => {
                          dispatch(
                            commonFunctionForAPICalls({
                              method: "GET",
                              url: `/rooms/${roomUuid}`,
                              name: "get-room",
                            }),
                          );
                          triggerToast(
                            "Success",
                            "Link removed",
                            "success",
                            3000,
                          );
                          setIsDeletingSource(false);
                          setShowDeleteModal(false);
                        })
                        .catch(() => {
                          setIsDeletingSource(false);
                          setShowDeleteModal(false);
                        });
                    } else {
                      // Delete Attachment
                      const payload = {
                        method: "DELETE",
                        url: `/attachments/${sourceToDelete?.id || sourceToDelete?.uuid}`,
                        name: "delete-attachment",
                      };
                      dispatch(commonFunctionForAPICalls(payload))
                        .then(() => {
                          dispatch(
                            commonFunctionForAPICalls({
                              method: "GET",
                              url: `/rooms/${roomUuid}`,
                              name: "get-room",
                            }),
                          );
                          setIsDeletingSource(false);
                          setShowDeleteModal(false);
                        })
                        .catch(() => {
                          setIsDeletingSource(false);
                          setShowDeleteModal(false);
                        });
                    }
                  }}
                >
                  <Text style={styles.modalButtonText}>
                    {isDeletingSource ? "Deleting..." : "Delete"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Unsaved Changes Confirmation Modal */}
      <UnsavedChangesConfirmPopup onDiscard={handleDiscardChanges} />
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
    marginTop: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  androidBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.18)",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  modalContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  modalIconContainer: {
    marginBottom: 24,
  },
  verifiedIcon: {
    height: 55,
    width: 50,
    objectFit: "contain",
  },
  modalTitle: {
    fontSize: scaleFont(26),
    color: "#1F2937",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  modalDescription: {
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    letterSpacing: 0.2,
  },
  btnsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalButton: {
    width: "48%",
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonCancel: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(13),
    fontWeight: "500",
    letterSpacing: 0.3,
    fontFamily: "Mukta-Regular",
  },
  handleContainer: {
    alignItems: "center",
    paddingTop: 10,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
  },
});

export default AddRoomDetails;
