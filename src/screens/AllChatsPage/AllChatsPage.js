import {
  View,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  FlatList,
  Animated,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import AllChatsHeader from "../../components/AllChatsPage/AllChatsHeader";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { createStyles } from "./AllChatsPageStyles.style";
import SearchAndIcons from "../../components/AllChatsPage/SearchAndIcons";
import { allChatsData } from "../../data/datas";
import ChatsComponent from "../../components/AllChatsPage/ChatsComponent";
import OptionsPopup from "../../components/AllChatsPage/OptionsPopup";
import ChatHistorySidebar from "../../components/ChatScreen/ChatHistorySidebar/ChatHistorySidebar";
import { commonFunctionForAPICalls, resetBulkOperationCompleted, resetHighlightChatId } from "../../redux/slices/apiCommonSlice";
import authLoader from "../../assets/images/authLoader.gif";
import { Check, Trash2, Archive } from "lucide-react-native";
import { scaleFont } from "../../utils/responsive";
import { setToggleDeleteChatConfirmPopup, setToggleArchiveChatConfirmPopup } from "../../redux/slices/toggleSlice";
import DeleteConfirmPopup from "../../components/ChatScreen/ChatMiddleSection/ChatConversationActions/DeleteConfirmPopup";
import ArchiveConfirmPopup from "../../components/AllChatsPage/ArchiveConfirmPopup";
import DeleteChatPopup from "../../components/AllChatsPage/DeleteChatPopup";
import ArchiveChatPopup from "../../components/AllChatsPage/ArchiveChatPopup";
import RenameChatPopup from "../../components/ChatScreen/ChatMiddleSection/ChatConversationActions/RenameChatPopup";
import AddChatToLearningLabPopup from "../../components/ChatScreen/ChatMiddleSection/ChatConversationActions/AddChatToLearningLabPopup";
import { triggerToast } from "../../services/toast";
import { Ionicons } from "@expo/vector-icons";
import { appColors } from "../../themes/appColors";

const AllChatsPage = () => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === 'ios' ? insets.top : (StatusBar.currentHeight || 0);
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { chatsStates, searchStates } = useSelector((state) => state.API);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const translateX = React.useRef(new Animated.Value(0)).current;

  const [isSearching, setIsSearching] = useState(false);
  const [popupPosition, setPopupPosition] = useState(null);
  const [selectedArray, setSelectedArray] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [currentSort, setCurrentSort] = useState(null);
  const [highlightedChatId, setHighlightedChatId] = useState(null);

  // ── Lazy-load state ────────────────────────────────────────────────────
  // Track which page we've fetched up to and whether a "load more" call is
  // currently in flight (so onEndReached doesn't fire multiple back-to-back
  // dispatches as the user scrolls).
  const PAGE_SIZE = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const hasMoreChats =
    chatsStates.allChatsDatas?.hasMoreChats !== false; // default to true until reducer says otherwise

  // Refs for scroll-to-highlight feature
  const scrollViewRef = useRef(null);
  const chatPositionsRef = useRef({});

  const isLoading = chatsStates.loaderStates.isAllUserChatsFetched === "pending" && isInitialLoad;
  const allUserChats = chatsStates.allChatsDatas.allUserChatsAvailable;
  const highlightChatId = searchStates?.highlightChatId;

  // Centralised URL builder. Keeps sort/filter sticky across pages so
  // page 2+ matches the page 1 result set.
  const buildChatsUrl = (page, sortOverride, filterOverride) => {
    const sortVal = sortOverride !== undefined ? sortOverride : currentSort;
    const filterVal =
      filterOverride !== undefined ? filterOverride : currentFilter;
    let url = `/chats?page=${page}&per_page=${PAGE_SIZE}`;
    if (filterVal) url += `&filter=${filterVal}`;
    if (sortVal) url += `&sort=${sortVal}`;
    return url;
  };

  useEffect(() => {
    setCurrentPage(1);
    dispatch(
      commonFunctionForAPICalls({
        method: "GET",
        url: buildChatsUrl(1),
        name: "fetchAllUserChatsAvailable",
      }),
    );
  }, []);

  // Fired by FlatList when the user scrolls near the bottom. Guarded so
  // back-to-back fires (FlatList can call this more than once per threshold
  // crossing) don't double-dispatch.
  const loadMoreChats = () => {
    if (loadingMore) return;
    if (!hasMoreChats) return;
    if (chatsStates.loaderStates.isAllUserChatsFetched === "pending") return;
    if (isSearching) return; // search uses its own non-paginated endpoint
    if (!allUserChats || allUserChats.length === 0) return;

    const nextPage = currentPage + 1;
    setLoadingMore(true);
    setCurrentPage(nextPage);
    dispatch(
      commonFunctionForAPICalls({
        method: "GET",
        url: buildChatsUrl(nextPage),
        name: "fetchAllUserChatsAvailable",
      }),
    )
      .unwrap()
      .catch(() => {
        // Rollback page counter on failure so the next scroll-end re-tries.
        setCurrentPage(currentPage);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    if (chatsStates.loaderStates.isAllUserChatsFetched === true && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [chatsStates.loaderStates.isAllUserChatsFetched]);

  useEffect(() => {
    if (chatsStates.loaderStates.isBulkOperationCompleted === true) {
      // Get the bulk operation info before resetting
      const bulkInfo = chatsStates.allChatsDatas.lastBulkOperationInfo;

      // Reset selection state
      setSelectedArray([]);
      setIsSelecting(false);
      setChecked(false);

      // Refetch the first page (reset to top after bulk op).
      setCurrentPage(1);
      dispatch(
        commonFunctionForAPICalls({
          method: "GET",
          url: buildChatsUrl(1),
          name: "fetchAllUserChatsAvailable",
        }),
      );

      // Show toast after refetch with stored info
      if (bulkInfo) {
        const actionMessages = {
          archive: { title: "Chats Archived", message: `${bulkInfo.count} chat${bulkInfo.count > 1 ? 's' : ''} successfully archived` },
          unarchive: { title: "Chats Unarchived", message: `${bulkInfo.count} chat${bulkInfo.count > 1 ? 's' : ''} successfully unarchived` },
          delete: { title: "Chats Deleted", message: `${bulkInfo.count} chat${bulkInfo.count > 1 ? 's' : ''} successfully deleted` },
          pin: { title: "Chats Pinned", message: `${bulkInfo.count} chat${bulkInfo.count > 1 ? 's' : ''} successfully pinned` },
          unpin: { title: "Chats Unpinned", message: `${bulkInfo.count} chat${bulkInfo.count > 1 ? 's' : ''} successfully unpinned` },
        };

        const toastContent = actionMessages[bulkInfo.action] || {
          title: "Operation Successful",
          message: `${bulkInfo.count} chat${bulkInfo.count > 1 ? 's' : ''} updated`
        };

        setTimeout(() => {
          triggerToast(
            toastContent.title,
            toastContent.message,
            "success",
            3000
          );
        }, 500);
      }

      // Reset the loader state
      dispatch(resetBulkOperationCompleted());
    }
  }, [chatsStates.loaderStates.isBulkOperationCompleted]);

  // Handle scroll-to and highlight for search results
  useEffect(() => {
    if (highlightChatId && allUserChats.length > 0 && !isLoading) {
      // Find the index of the chat to highlight
      const chatIndex = allUserChats.findIndex(chat => chat.id === highlightChatId);

      if (chatIndex !== -1) {
        // Set the highlighted chat
        setHighlightedChatId(highlightChatId);

        // Calculate approximate scroll position (assuming each chat item is ~80px height)
        const scrollPosition = chatIndex * 80;

        // Scroll to the chat after a small delay to ensure layout is complete.
        // FlatList uses scrollToOffset (vs ScrollView's scrollTo).
        setTimeout(() => {
          if (scrollViewRef.current?.scrollToOffset) {
            scrollViewRef.current.scrollToOffset({
              offset: scrollPosition,
              animated: true,
            });
          }
        }, 300);

        // Reset highlight after animation completes
        setTimeout(() => {
          setHighlightedChatId(null);
          dispatch(resetHighlightChatId());
        }, 2000);
      } else {
        // Chat not found in current list, reset the highlight
        dispatch(resetHighlightChatId());
      }
    }
  }, [highlightChatId, allUserChats, isLoading]);

  const handleSelectAll = () => {
    setChecked(!checked);
    if (!checked) {
      const allIds = allUserChats.map((chat) => chat.id);
      setSelectedArray(allIds);
    } else {
      setSelectedArray([]);
    }
  };

  const handleSort = (sortValue) => {
    setCurrentSort(sortValue);
    setCurrentPage(1);
    dispatch(
      commonFunctionForAPICalls({
        method: "GET",
        url: buildChatsUrl(1, sortValue, currentFilter),
        name: "fetchAllUserChatsAvailable",
      }),
    );
  };

  const handleFilter = (filterValue) => {
    setCurrentFilter(filterValue);
    setCurrentPage(1);
    dispatch(
      commonFunctionForAPICalls({
        method: "GET",
        url: buildChatsUrl(1, currentSort, filterValue),
        name: "fetchAllUserChatsAvailable",
      }),
    );
  };

  const handleSearch = (searchText) => {
    setCurrentPage(1);
    dispatch(
      commonFunctionForAPICalls({
        method: "GET",
        url: searchText
          ? `/chats?search=${searchText}`
          : buildChatsUrl(1),
        name: "fetchAllUserChatsAvailable",
      }),
    );
  };

  const handleBulkArchive = () => {
    if (!selectedArray || selectedArray.length === 0) {
      return;
    }
    dispatch(setToggleArchiveChatConfirmPopup(true));
  };

  const handleBulkDelete = () => {
    dispatch(setToggleDeleteChatConfirmPopup(true));
  };

  const handleChatPress = (item) => {
    console.log("Chat pressed:", item.title);
  };

  const handleMenuPress = (item) => {
    console.log("Menu pressed for:", item.title);
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#FAFAFA",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={authLoader}
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FAFAFA",
        marginTop: -statusBarHeight,
      }}
    >
      {toggleStates.toggleDeleteChatConfirmPopup && (
        <DeleteConfirmPopup from="allChats" selectedChatIds={selectedArray} />
      )}
      {toggleStates.toggleArchiveChatConfirmPopup && (
        <ArchiveConfirmPopup selectedChatIds={selectedArray} />
      )}
      {toggleStates.toggleDeleteChatPopup && (
        <DeleteChatPopup />
      )}
      {toggleStates.toggleArchiveChatPopup && (
        <ArchiveChatPopup />
      )}
      {toggleStates.toggleRenameChatPopup && (
        <RenameChatPopup />
      )}
      {toggleStates.toggleAddChatToLearningLabPopup && (
        <AddChatToLearningLabPopup />
      )}
      <ChatHistorySidebar translateX={translateX} />
      <StatusBar
        backgroundColor="#000000ff"
        barStyle="dark-content"
        hidden={false}
        translucent={false}
        animated
      />
      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        <View
          style={{
            height: statusBarHeight,
            width: "100%",
            backgroundColor: "#FAFAFA",
            zIndex: 9999,
          }}
        ></View>
        <AllChatsHeader
          translateX={translateX}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
        {isSelecting ? (
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

            {/* Right side - Selected count, Archive and Delete */}
            <View style={bulkStyles.rightContainer}>
              <View style={bulkStyles.selectedBadge}>
                <Text style={bulkStyles.selectedText}>
                  {selectedArray.length} Selected
                </Text>
                <Ionicons
                  onPress={() => {
                    setIsSelecting(false);
                    setSelectedArray([]);
                    setChecked(false);
                  }}
                  name="close-circle-sharp"
                  size={24}
                  color={appColors.navyBlueShade}
                />
              </View>

              <TouchableOpacity
                onPress={handleBulkArchive}
                style={bulkStyles.archiveButton}
                activeOpacity={0.7}
              >
                <Archive size={24} color="#1a2233" strokeWidth={1.8} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleBulkDelete}
                style={bulkStyles.deleteButton}
                activeOpacity={0.7}
              >
                <Trash2 size={24} color="#1a2233" strokeWidth={1.8} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <SearchAndIcons
            isSearching={isSearching}
            setIsSearching={setIsSearching}
            onSortSelect={handleSort}
            onFilterSelect={handleFilter}
            onSearch={handleSearch}
            currentSort={currentSort}
            currentFilter={currentFilter}
          />
        )}
        <FlatList
          ref={scrollViewRef}
          data={allUserChats || []}
          keyExtractor={(item, index) =>
            (item?.id && String(item.id)) || `chat-${index}`
          }
          renderItem={({ item: chat, index: chatsIndex }) => (
            <ChatsComponent
              index={chat.id}
              title={chat.name}
              subject={chat.subject?.name}
              roomName={chat.room?.name}
              isPinned={chat.is_pinned}
              isSelecting={isSelecting}
              selectedArray={selectedArray}
              setIsSelecting={setIsSelecting}
              setSelectedArray={setSelectedArray}
              setPopupPosition={setPopupPosition}
              chatData={chat}
              isHighlighted={highlightedChatId === chat.id}
              onLayout={(event) => {
                const { y } = event.nativeEvent.layout;
                chatPositionsRef.current[chat.id] = y;
              }}
            />
          )}
          contentContainerStyle={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
          style={styles.allChatsScrollMain}
          onEndReached={loadMoreChats}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator size="small" color="#081A35" />
              </View>
            ) : null
          }
        />
      </Animated.View>
      <OptionsPopup popupPosition={popupPosition} />
    </SafeAreaView>
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
    gap: 10,
  },
  selectedBadge: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    paddingLeft: 12,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    backgroundColor: "transparent",
    flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10
  },
  selectedText: {
    fontSize: scaleFont(12),
    fontWeight: "500",
    color: "#1a2233",
    letterSpacing: -0.2,
  },
  archiveButton: {
    padding: 4,
  },
  deleteButton: {
    padding: 4,
  },
});

export default AllChatsPage;
