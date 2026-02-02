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
} from "react-native";
import React, { useMemo, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AllChatsHeader from "../../components/AllChatsPage/AllChatsHeader";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { createStyles } from "./AllChatsPageStyles.style";
import SearchAndIcons from "../../components/AllChatsPage/SearchAndIcons";
import { allChatsData } from "../../data/datas";
import ChatsComponent from "../../components/AllChatsPage/ChatsComponent";
import OptionsPopup from "../../components/AllChatsPage/OptionsPopup";
import ChatHistorySidebar from "../../components/ChatScreen/ChatHistorySidebar/ChatHistorySidebar";
import { commonFunctionForAPICalls, resetBulkOperationCompleted } from "../../redux/slices/apiCommonSlice";
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

const AllChatsPage = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { chatsStates } = useSelector((state) => state.API);
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

  const isLoading = chatsStates.loaderStates.isAllUserChatsFetched === "pending" && isInitialLoad;
  const allUserChats = chatsStates.allChatsDatas.allUserChatsAvailable;

  useEffect(() => {
    const payload = {
      method: "GET",
      url: "/chats?page=1&per_page=20",
      name: "fetchAllUserChatsAvailable"
    };
    dispatch(commonFunctionForAPICalls(payload));
  }, []);

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

      // Refetch all chats
      const payload = {
        method: "GET",
        url: "/chats?page=1&per_page=20",
        name: "fetchAllUserChatsAvailable"
      };
      dispatch(commonFunctionForAPICalls(payload));

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
    // Build URL with both filter and sort if filter exists
    let url = `/chats?page=1&per_page=20`;
    if (currentFilter) {
      url += `&filter=${currentFilter}`;
    }
    url += `&sort=${sortValue}`;

    const payload = {
      method: "GET",
      url,
      name: "fetchAllUserChatsAvailable"
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  const handleFilter = (filterValue) => {
    setCurrentFilter(filterValue);
    // Build URL with both filter and sort if sort exists
    let url = `/chats?page=1&per_page=20&filter=${filterValue}`;
    if (currentSort) {
      url += `&sort=${currentSort}`;
    }

    const payload = {
      method: "GET",
      url,
      name: "fetchAllUserChatsAvailable"
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  const handleSearch = (searchText) => {
    const payload = {
      method: "GET",
      url: searchText ? `/chats?search=${searchText}` : "/chats?page=1&per_page=20",
      name: "fetchAllUserChatsAvailable"
    };
    dispatch(commonFunctionForAPICalls(payload));
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
        marginTop: -StatusBar.currentHeight,
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
            height: StatusBar.currentHeight,
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
        <ScrollView
          contentContainerStyle={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
          style={styles.allChatsScrollMain}
        >
          {allUserChats.map((chat, chatsIndex) => {
            return (
              <ChatsComponent
                key={chatsIndex}
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
              />
            );
          })}
        </ScrollView>
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
  archiveButton: {
    padding: 4,
  },
  deleteButton: {
    padding: 4,
  },
});

export default AllChatsPage;
