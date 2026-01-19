import React, { useState, useEffect } from "react";
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
import { setToggleArchiveChatConfirmPopup } from "../../redux/slices/toggleSlice";
import { triggerToast } from "../../services/toast";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";

const { width } = Dimensions.get("window");

const ArchiveConfirmPopup = ({ selectedChatIds = [] }) => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { chatsStates } = useSelector((state) => state.API);

  const dispatch = useDispatch();

  const chatCount = selectedChatIds.length;

  const isLoading = chatsStates.loaderStates.isBulkOperationCompleted === "pending";

  // Handle bulk archive success case
  useEffect(() => {
    if (chatsStates.loaderStates.isBulkOperationCompleted === true) {
      dispatch(setToggleArchiveChatConfirmPopup(false));
    }
  }, [chatsStates.loaderStates.isBulkOperationCompleted]);

  return (
    <Modal
      visible={toggleStates.toggleArchiveChatConfirmPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleArchiveChatConfirmPopup(false))}
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
          onPress={() => dispatch(setToggleArchiveChatConfirmPopup(false))}
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
              Archive {chatCount} chat{chatCount > 1 ? 's' : ''}?
            </Text>

            {/* Description */}
            <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
              Chats will be archived and can be viewed anytime.
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
                onPress={() => dispatch(setToggleArchiveChatConfirmPopup(false))}
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
                  if (!selectedChatIds || selectedChatIds.length === 0) {
                    triggerToast("Error", "No chats selected", "error", 3000);
                    return;
                  }

                  const payload = {
                    method: "POST",
                    url: "/chats/bulk",
                    data: {
                      action: "archive",
                      chat_ids: selectedChatIds
                    },
                    name: "bulkOperationsForChats"
                  };

                  dispatch(commonFunctionForAPICalls(payload));
                }}
                activeOpacity={0.8}
                disabled={isLoading}
              >
                <Text
                  style={[styles.buttonText, { fontFamily: "Mukta-Regular" }]}
                >
                  {isLoading ? "Archiving..." : "Archive"}
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
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    letterSpacing: 0.2,
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

export default ArchiveConfirmPopup;
