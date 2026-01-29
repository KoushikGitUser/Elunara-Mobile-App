import {
  View,
  Text,
  Animated,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import ChatHistorySidebar from "../../components/ChatScreen/ChatHistorySidebar/ChatHistorySidebar";
import AllRoomsPageHeader from "../../components/Rooms/AllRoomsPageHeader";
import AllRoomsPageSearchIcons from "../../components/Rooms/AllRoomsPageSearchIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { scaleFont, verticalScale } from "../../utils/responsive";
import ChatsScrollForAllRoomsPage from "../../components/Rooms/ChatsScrollForAllRoomsPage";
import { Check, Trash2 } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { setToggleDeleteChatConfirmPopup } from "../../redux/slices/toggleSlice";
import DeleteConfirmPopup from "../../components/ChatScreen/ChatMiddleSection/ChatConversationActions/DeleteConfirmPopup";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";
import SearchHistory from "../../components/Search/SearchHistory";
import SearchResults from "../../components/Search/SearchResults";

const AllRoomsLandingPage = () => {
  const translateX = React.useRef(new Animated.Value(0)).current;
  const [isSearching, setIsSearching] = useState(false);
  const [selectedArray, setSelectedArray] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [checked, setChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { roomsStates, chatsStates } = useSelector((state) => state.API);
  const dispatch = useDispatch();
  const allUserRooms = chatsStates.allChatsDatas.allUserRoomsAvailable || [];

  // Search Debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length >= 2) {
        dispatch(
          commonFunctionForAPICalls({
            method: "GET",
            url: "/search",
            params: { q: searchQuery, type: "all" },
            name: "search-global",
          }),
        );
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Fetch rooms on mount
  useEffect(() => {
    const payload = {
      method: "GET",
      url: "/rooms",
      name: "get-rooms",
    };
    dispatch(commonFunctionForAPICalls(payload));
  }, []);

  const handleSelectAll = () => {
    setChecked(!checked);
    if (!checked) {
      // Use roomsStates if available, otherwise use allUserRooms
      const allIds =
        roomsStates.rooms?.map((room) => room.uuid) ||
        allUserRooms.map((room) => room.id) ||
        [];
      setSelectedArray(allIds);
    } else {
      setSelectedArray([]);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FAFAFA",
        marginTop: -StatusBar.currentHeight,
      }}
    >
      {toggleStates.toggleDeleteChatConfirmPopup && (
        <DeleteConfirmPopup from="allRooms" />
      )}
      <StatusBar
        backgroundColor="#ff0000ff"
        barStyle="dark-content"
        hidden={false}
        translucent={false}
        animated
      />
      <ChatHistorySidebar translateX={translateX} />
      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        <AllRoomsPageHeader
          translateX={translateX}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
        {isSelecting ? (
          <View style={styles.container}>
            {/* Left side - Select All */}
            <TouchableOpacity
              style={styles.selectAllContainer}
              onPress={handleSelectAll}
              activeOpacity={0.7}
            >
              <View
                style={[styles.checkbox, checked && styles.checkboxChecked]}
              >
                {checked && <Check strokeWidth={2} size={17} color="white" />}
              </View>
              <Text style={styles.selectAllText}>Select All</Text>
            </TouchableOpacity>

            {/* Right side - Selected count and Delete */}
            <View style={styles.rightContainer}>
              <View style={styles.selectedBadge}>
                <Text style={styles.selectedText}>
                  {selectedArray.length} Selected
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  dispatch(setToggleDeleteChatConfirmPopup(true));
                }}
                style={styles.deleteButton}
                activeOpacity={0.7}
              >
                <Trash2 size={24} color="#1a2233" strokeWidth={1.8} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <AllRoomsPageSearchIcons
            isSearching={isSearching}
            setIsSearching={setIsSearching}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {isSearching ? (
          <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
            {searchQuery.length === 0 ? (
              <SearchHistory
                onHistoryItemPress={(query) => {
                  setSearchQuery(query);
                }}
              />
            ) : (
              <SearchResults />
            )}
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
            style={styles.allChatsScrollMain}
          >
            {roomsStates.fetchingRooms ? (
              <ActivityIndicator
                size="large"
                color="#081A35"
                style={{ marginTop: 50 }}
              />
            ) : roomsStates.rooms?.length > 0 ? (
              roomsStates.rooms.map((room, roomIndex) => {
                return (
                  <ChatsScrollForAllRoomsPage
                    key={room.uuid || roomIndex}
                    index={room.uuid}
                    title={room.name}
                    subject={room.description || "No description"}
                    isSelecting={isSelecting}
                    selectedArray={selectedArray}
                    setIsSelecting={setIsSelecting}
                    setSelectedArray={setSelectedArray}
                    room={room}
                  />
                );
              })
            ) : (
              <View style={{ marginTop: 50, alignItems: "center" }}>
                <Text style={{ fontSize: scaleFont(16), color: "#6B7280" }}>
                  No rooms yet. Create your first Learning Lab!
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  allChatsScrollMain: {
    width: "100%",
    marginTop: 30,
    paddingHorizontal: 20,
  },
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
  checkmark: {
    width: 12,
    height: 10,
    position: "relative",
  },
  checkmarkStem: {
    position: "absolute",
    width: 2,
    height: 8,
    backgroundColor: "#ffffff",
    bottom: 0,
    right: 2,
    transform: [{ rotate: "45deg" }],
  },
  checkmarkKick: {
    position: "absolute",
    width: 2,
    height: 5,
    backgroundColor: "#ffffff",
    bottom: 0,
    left: 2,
    transform: [{ rotate: "-45deg" }],
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
  deleteButton: {
    padding: 4,
  },
});

export default AllRoomsLandingPage;
