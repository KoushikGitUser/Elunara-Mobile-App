import {
  View,
  Text,
  Platform,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { scaleFont, verticalScale } from "../../../../utils/responsive";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { Plus, Search } from "lucide-react-native";
import ExistingRoomsCards from "./ExistingRoomsCards";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setToggleAddChatToLearningLabPopup, setToggleRoomCreationPopup } from "../../../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls } from "../../../../redux/slices/apiCommonSlice";
import Toaster from "../../../UniversalToaster/Toaster";

const AddChatToLearningLabPopup = () => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { chatsStates, roomsStates } = useSelector((state) => state.API);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef();

  // Get rooms from redux state
  const rooms = roomsStates?.rooms || [];
  const isLoading = roomsStates?.fetchingRooms;

  // Get current chat details for the API call - try both currentActionChatDetails and createdChatDetails
  const currentActionChatDetails = chatsStates?.allChatsDatas?.currentActionChatDetails;
  const createdChatDetails = chatsStates?.allChatsDatas?.createdChatDetails;

  // Use id or uuid from either source
  const currentChatId =
    currentActionChatDetails?.id ||
    currentActionChatDetails?.uuid ||
    createdChatDetails?.id ||
    createdChatDetails?.uuid;

  // Debug logging
  console.log("🏠 LEARNING LAB POPUP:", {
    roomsCount: rooms.length,
    isLoading,
    currentChatId,
    currentActionChatDetails,
    createdChatDetails,
    firstRoom: rooms[0],
  });

  // Filter rooms based on search
  const filteredRooms = rooms.filter((room) =>
    room?.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  // Fetch rooms when popup opens
  useEffect(() => {
    if (toggleStates.toggleAddChatToLearningLabPopup) {
      dispatch(
        commonFunctionForAPICalls({
          method: "GET",
          url: "/rooms",
          name: "get-rooms",
        })
      );
    }
  }, [toggleStates.toggleAddChatToLearningLabPopup]);

  useEffect(() => {
    if (!isSearching && inputRef.current) {
      inputRef.current.blur();
    }
  }, [isSearching]);

  return (
    <Modal
      visible={toggleStates.toggleAddChatToLearningLabPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleAddChatToLearningLabPopup(false))}
    >
      <Toaster/>
      <View style={styles.container}>
        {/* Blur Background */}

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
          onPress={() => dispatch(setToggleAddChatToLearningLabPopup(false))}
        />

        {/* Modal Sheet */}
        <View style={styles.modalSheet}>
          {/* Handle Bar */}
          <View style={styles.closeModalMain}>
            <AntDesign
              style={{ marginRight: 20 }}
              onPress={() =>
                dispatch(setToggleAddChatToLearningLabPopup(false))
              }
              name="close"
              size={20}
              color="black"
            />
          </View>

          {/* Content */}
          <View style={styles.content}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>
                Add to Learning Lab
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  marginBottom: 20,
                  width: "auto",
                  alignSelf: "flex-start",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
                onPress={() => {
                  dispatch(setToggleAddChatToLearningLabPopup(false));
                  setTimeout(() => {
                    dispatch(setToggleRoomCreationPopup(true));
                  }, 300);
                }}
              >
                <Text
                  style={{
                    fontSize: scaleFont(13),
                    fontWeight: 400,
                    fontFamily: "Mukta-Bold",
                    borderBottomWidth: 1,
                  }}
                >
                  Create New
                </Text>
                 <Plus strokeWidth={1.25} />
              </TouchableOpacity>
            </View>
            <View style={[styles.searchInputMain]}>
              <Search
                size={22}
                strokeWidth={1.25}
                color="#B5BECE"
                style={styles.searchIcon}
              />
              <TextInput
                ref={inputRef}
                onFocus={() => setIsSearching(true)}
                onBlur={() => setIsSearching(false)}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search"
                placeholderTextColor="#B5BECE"
                style={[
                  styles.searchInput,
                  { outlineWidth: isSearching ? 1 : 0 },
                ]}
              />
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={[styles.chatsScroll, { maxHeight: SCREEN_HEIGHT * 0.5 }]}
            >
              {isLoading ? (
                <View style={{ paddingVertical: 40, alignItems: "center" }}>
                  <ActivityIndicator size="small" color="#081A35" />
                </View>
              ) : filteredRooms.length > 0 ? (
                filteredRooms.map((room, roomIndex) => (
                  <ExistingRoomsCards
                    key={room?.id || room?.uuid || roomIndex}
                    roomId={room?.id || room?.uuid}
                    roomName={room?.name}
                    chats={room?.chats_count || 0}
                    chatUuid={currentChatId}
                  />
                ))
              ) : (
                <View style={{ paddingVertical: 40, alignItems: "center" }}>
                  <Text style={{ color: "#757575", fontFamily: "Mukta-Regular" }}>
                    {searchText ? "No rooms found" : "No learning labs available"}
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
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
    position: "absolute",
    bottom: 0,
    zIndex: 999,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
  },
  btnsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  verifiedIcon: {
    height: 55,
    width: 50,
    objectFit: "contain",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  iconContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: scaleFont(20),
    color: "#1F2937",
    marginBottom: 16,
  },
  description: {
    fontSize: scaleFont(12),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  chatsScroll: {
    width: "100%",
    marginTop: 30,
  },
  button: {
    width: "100%",
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(12),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  featuresList: {
    gap: 10,
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  featureText: {
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: "#1F2937",
    fontWeight: "500",
    flex: 1,
    paddingTop: 1,
  },
  cardsContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    marginBottom: 55,
  },
  priceCard: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    padding: 13,
    borderWidth: 2,
    borderColor: "#D3DAE5",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCard: {
    backgroundColor: "#EEF4FF",
    borderColor: "#081A35",
  },
  checkBadge: {
    position: "absolute",
    top: -17,
    right: 20,
    transform: [{ translateX: 12 }],
    width: 27,
    height: 27,
    borderRadius: 16,
    backgroundColor: "#081A35",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  saveBadge: {
    position: "absolute",
    top: -15,
    right: 15,
    backgroundColor: "#F3ECFF",
    borderWidth: 1,
    borderColor: "#7D1DE4",
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 20,
  },
  saveText: {
    color: "#7D1DE4",
    fontSize: 10,
    fontWeight: "600",
  },
  priceText: {
    fontSize: scaleFont(12.5),
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
  periodText: {
    fontSize: scaleFont(12.5),
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
  closeModalMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  categorySections: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  sectionText: {
    color: "#757575",
  },
  sections: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "lightgrey",
    paddingVertical: 10,
  },
  currentLLMMain: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D8DCE4",
    marginBottom: 20,
  },
  currentResponse: {
    fontSize: scaleFont(17),
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: "Mukta-Bold",
  },
  badge: {
    backgroundColor: "#F3F3F3",
    borderColor: "#D8DCE4",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  btnText: {
    fontSize: scaleFont(12),
    fontWeight: "400",
    color: "#1A1A1A",
    fontFamily: "Mukta-Regular",
  },
  searchInputMain: {
    flex: 1,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  searchIcon: {
    position: "absolute",
    left: 10,
  },
  searchInput: {
    width: "100%",
    height: verticalScale(40),
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#ABB8CC",
    paddingLeft: 40,
  },
});

export default AddChatToLearningLabPopup;
