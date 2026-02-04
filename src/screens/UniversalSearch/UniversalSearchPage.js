import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { scaleFont, verticalScale, moderateScale } from "../../utils/responsive";
import { MessageCircle, Search, ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import BigSearchIcon from "../../../assets/SvgIconsComponent/ProfilePageOptionsIcons/BigSearchIcon";
import AuthGradientText from "../../components/common/AuthGradientText";
import { appColors } from "../../themes/appColors";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonFunctionForAPICalls, setHighlightChatId, setHighlightRoomId } from "../../redux/slices/apiCommonSlice";
import FolderIcon from "../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/FolderIcon";
import { triggerToast } from "../../services/toast";

const UniversalSearchPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const debounceRef = useRef(null);
  const { searchStates } = useSelector((state) => state.API);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [startedSearching, setStartedSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Get search results from Redux
  const searchResults = searchStates?.searchResults || { chats: [], rooms: [] };
  const searchHistory = searchStates?.searchHistory || [];
  const isSearching = searchStates?.isSearching || false;

  // Check if we have any results
  const hasChats = searchResults.chats?.length > 0;
  const hasRooms = searchResults.rooms?.length > 0;
  const hasResults = hasChats || hasRooms;
  const hasSearchHistory = searchHistory.length > 0;

  // Auto-focus the input when the page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Fetch search history on mount
  useEffect(() => {
    const payload = {
      method: "GET",
      url: "/search/history",
      name: "get-search-history",
    };
    dispatch(commonFunctionForAPICalls(payload));
  }, []);

  // Debounced search API call
  useEffect(() => {
    const trimmedSearch = debouncedSearch.trim();

    if (trimmedSearch.length === 1) {
      // Show toast for single character
      triggerToast(
        "Invalid Search",
        "The search query must be at least two characters long.",
        "error",
        3000
      );
      return;
    }

    if (trimmedSearch.length >= 2) {
      const payload = {
        method: "GET",
        url: `/search?q=${encodeURIComponent(trimmedSearch)}`,
        name: "search-global",
      };
      dispatch(commonFunctionForAPICalls(payload));
    }
  }, [debouncedSearch]);

  // Log search states when they change
  useEffect(() => {
    console.log("═══════════════════════════════════════════════════════");
    console.log("🔍 UNIVERSAL SEARCH - SEARCH STATES");
    console.log("🔍 Search History:", JSON.stringify(searchStates.searchHistory, null, 2));
    console.log("🔍 Search Results:", JSON.stringify(searchStates.searchResults, null, 2));
    console.log("🔍 Is Searching:", searchStates.isSearching);
    console.log("🔍 Full Search States:", JSON.stringify(searchStates, null, 2));
    console.log("═══════════════════════════════════════════════════════");
  }, [searchStates]);

  const handleSearch = (text) => {
    setSearch(text);

    // Always clear any pending debounce timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    if (text === "") {
      setStartedSearching(false);
      setDebouncedSearch("");
    } else {
      setStartedSearching(true);

      // Debounce the API call
      debounceRef.current = setTimeout(() => {
        setDebouncedSearch(text);
      }, 500);
    }
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  // Render subtitle for chat items
  const renderChatSubtitle = (chat) => {
    const subjectName = chat.subject?.name || "";
    const roomName = chat.room?.name || "";

    if (subjectName && roomName) {
      return (
        <Text style={styles.itemSubtitle}>
          {subjectName} <Text style={styles.dotSeparator}>•</Text> {roomName}
        </Text>
      );
    }
    return <Text style={styles.itemSubtitle}>{subjectName}</Text>;
  };

  // Check if no results when searching
  const noResults = startedSearching && debouncedSearch.length > 0 && !hasResults && !isSearching;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <ArrowLeft size={24} strokeWidth={2} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search</Text>
        </View>

        {/* Search Input */}
        <View style={styles.searchInputMain}>
          <Search
            size={20}
            strokeWidth={1.5}
            color="#9CA3AF"
            style={styles.searchIcon}
          />
          <TextInput
            ref={inputRef}
            placeholder=""
            value={search}
            onChangeText={handleSearch}
            placeholderTextColor="#9CA3AF"
            style={[
              styles.searchInput,
              isFocused && { borderColor: appColors.navyBlueShade }
            ]}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>

        {/* Previously Searched Label - only show if not searching and has history */}
        {!startedSearching && hasSearchHistory && (
          <Text style={styles.sectionLabel}>Previously Searched</Text>
        )}

        {/* Search Results List */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Show search history when not searching */}
          {!startedSearching && hasSearchHistory && searchHistory.map((item, index) => (
            <TouchableOpacity
              key={item.id || index}
              style={styles.searchItem}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <MessageCircle
                  size={24}
                  strokeWidth={1.5}
                  color="#9CA3AF"
                />
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{item.query || item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Chats Section */}
          {startedSearching && hasChats && (
            <>
              <Text style={styles.sectionLabel}>Chats</Text>
              {searchResults.chats.map((chat) => (
                <TouchableOpacity
                  key={chat.id}
                  style={styles.searchItem}
                  activeOpacity={0.7}
                  onPress={() => {
                    dispatch(setHighlightChatId(chat.id));
                    navigation.navigate("allchats");
                  }}
                >
                  <View style={styles.iconContainer}>
                    <MessageCircle
                      size={24}
                      strokeWidth={1.5}
                      color="#9CA3AF"
                    />
                  </View>
                  <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{chat.name}</Text>
                    {renderChatSubtitle(chat)}
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* Rooms Section */}
          {startedSearching && hasRooms && (
            <>
              <Text style={styles.sectionLabel}>Rooms</Text>
              {searchResults.rooms.map((room) => (
                <TouchableOpacity
                  key={room.id}
                  style={styles.searchItem}
                  activeOpacity={0.7}
                  onPress={() => {
                    dispatch(setHighlightRoomId(room.id));
                    navigation.navigate("allRooms");
                  }}
                >
                  <View style={styles.iconContainer}>
                    <FolderIcon />
                  </View>
                  <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{room.name}</Text>
                    {room.chats_count !== undefined && (
                      <Text style={styles.itemSubtitle}>{room.chats_count} chats</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* No Results State */}
          {noResults && (
            <View style={styles.noResultMain}>
              <BigSearchIcon />
              <AuthGradientText
                marginBottom={0}
                marginTop={15}
                fullWidth={false}
                widthMultiplier={0.55}
                fontSize={scaleFont(25)}
              >
                No Results found
              </AuthGradientText>
              <Text style={styles.noResultText}>
                We couldn't find any matches for your search. Try different
                keywords or check your spelling to find what you're looking for.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: scaleFont(20),
    fontWeight: "600",
    fontFamily: "Mukta-SemiBold",
    color: "#000000",
  },
  searchInputMain: {
    width: "100%",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 8,
  },
  searchIcon: {
    position: "absolute",
    left: 36,
    zIndex: 1,
  },
  searchInput: {
    width: "100%",
    height: verticalScale(48),
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#E5E7EB",
    paddingLeft: 48,
    paddingRight: 16,
    fontSize: scaleFont(16),
    fontFamily: "Mukta-Regular",
    backgroundColor: "#FFFFFF",
    color: "#000000",
  },
  sectionLabel: {
    fontSize: scaleFont(14),
    color: "#6B7280",
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
    marginTop: 24,
    marginBottom: 8,
    marginLeft: 20,
  },
  scrollView: {
    flex: 1,
  },
  searchItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
  iconContainer: {
    marginTop: 2,
  },
  itemContent: {
    flex: 1,
    flexDirection: "column",
    gap: 2,
  },
  itemTitle: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    fontFamily: "Mukta-SemiBold",
    color: "#000000",
  },
  itemSubtitle: {
    fontSize: scaleFont(14),
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
    color: "#6B7280",
  },
  dotSeparator: {
    color: "#6B7280",
    marginHorizontal: 4,
  },
  noResultMain: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    marginTop: 70,
    paddingHorizontal: 20,
  },
  noResultText: {
    fontSize: scaleFont(13),
    textAlign: "center",
    width: "75%",
    color: "#757575",
    fontFamily: "Mukta-Regular",
  },
});

export default UniversalSearchPage;
