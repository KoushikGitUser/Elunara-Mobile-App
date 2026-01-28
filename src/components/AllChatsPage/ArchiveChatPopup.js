import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Platform,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { Archive } from "lucide-react-native";
import { scaleFont } from "../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { setToggleArchiveChatPopup } from "../../redux/slices/toggleSlice";
import { triggerToast } from "../../services/toast";
import { commonFunctionForAPICalls, resetChatArchiveUnarchiveUpdated } from "../../redux/slices/apiCommonSlice";

const { width } = Dimensions.get("window");

const ArchiveChatPopup = () => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { chatsStates } = useSelector((state) => state.API);

  const dispatch = useDispatch();

  const currentChat = chatsStates.allChatsDatas.currentActionChatDetails;
  // Check both possible field names from API
  const isArchived = currentChat?.is_archived || currentChat?.archived;

  const isLoading = chatsStates.loaderStates.isChatArchiveUnarchiveUpdated === "pending";

  // Handle archive/unarchive success
  useEffect(() => {
    if (chatsStates.loaderStates.isChatArchiveUnarchiveUpdated === true) {
      // Refetch all chats
      dispatch(commonFunctionForAPICalls({
        method: "GET",
        url: "/chats?page=1&per_page=20",
        name: "fetchAllUserChatsAvailable"
      }));

      // Refresh recent chats list
      dispatch(commonFunctionForAPICalls({
        method: "GET",
        url: "/chats/recent?limit=10",
        name: "getAllRecentChats"
      }));

      // Reset loader state
      dispatch(resetChatArchiveUnarchiveUpdated());

      // Close popup
      dispatch(setToggleArchiveChatPopup(false));
    }
  }, [chatsStates.loaderStates.isChatArchiveUnarchiveUpdated]);

  return (
    <Modal
      visible={toggleStates.toggleArchiveChatPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleArchiveChatPopup(false))}
    >
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
          onPress={() => dispatch(setToggleArchiveChatPopup(false))}
        />

        {/* Modal Sheet */}
        <View style={styles.modalSheet}>
          {/* Handle Bar */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <Archive size={55} color="#081A35" strokeWidth={1.5} />
            </View>

            {/* Title */}
            <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>
              {isArchived ? "Unarchive Chat?" : "Archive Chat?"}
            </Text>

            {/* Description */}
            <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
              {isArchived
                ? "This chat will be restored to your active chats."
                : "This chat will be moved to your archived chats."}
            </Text>

            {/* Button */}
            <View style={styles.btnsMain}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "black",
                  },
                ]}
                onPress={() => dispatch(setToggleArchiveChatPopup(false))}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: "black", fontFamily: "Mukta-Regular" },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { opacity: isLoading ? 0.6 : 1 }]}
                onPress={() => {
                  const chatId = currentChat?.id;

                  if (!chatId) {
                    triggerToast("Error", "Chat ID not found", "error", 3000);
                    return;
                  }

                  const apiAction = isArchived ? "unarchive" : "archive";
                  const payload = {
                    method: "POST",
                    url: `/chats/${chatId}/${apiAction}`,
                    name: "archiveOrUnarchiveChat"
                  };

                  dispatch(commonFunctionForAPICalls(payload));
                }}
                activeOpacity={0.8}
                disabled={isLoading}
              >
                <Text
                  style={[styles.buttonText, { fontFamily: "Mukta-Regular" }]}
                >
                  {isLoading
                    ? (isArchived ? "Unarchiving..." : "Archiving...")
                    : (isArchived ? "Unarchive" : "Archive")}
                </Text>
              </TouchableOpacity>
            </View>
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
  handleContainer: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 8,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
  },
  btnsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: scaleFont(26),
    color: "#1F2937",
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(14),
    color: "#6B7280",
    marginBottom: 32,
    lineHeight: 20,
  },
  button: {
    width: "48%",
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(13),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});

export default ArchiveChatPopup;
