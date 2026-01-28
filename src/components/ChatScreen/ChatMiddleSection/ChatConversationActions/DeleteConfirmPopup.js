import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { SimpleLineIcons } from "@expo/vector-icons";
import deleteBin from "../../../../assets/images/deleteBin.png";
import { scaleFont } from "../../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { setToggleDeleteChatConfirmPopup } from "../../../../redux/slices/toggleSlice";
import { triggerToast, triggerToastWithAction } from "../../../../services/toast";
import { commonFunctionForAPICalls, resetChatDeleted, resetChatDeleteUndone, resetBulkOperationCompleted } from "../../../../redux/slices/apiCommonSlice";
import Toaster from "../../../UniversalToaster/Toaster";

const { width } = Dimensions.get("window");

const DeleteConfirmPopup = ({ from, selectedChatIds = [] }) => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);
  const { chatsStates } = useSelector((state) => state.API);

  const dispatch = useDispatch();

  const isSingleDelete = from === "chat";
  const isBulkDelete = from === "allChats";
  const chatCount = selectedChatIds.length;

  const isLoading = isBulkDelete
    ? chatsStates.loaderStates.isBulkOperationCompleted === "pending"
    : chatsStates.loaderStates.isChatDeleted === "pending";

  // Handle delete success case
  useEffect(() => {
    if (chatsStates.loaderStates.isChatDeleted === true) {
      dispatch(setToggleDeleteChatConfirmPopup(false));

      const chatId = chatsStates.allChatsDatas.currentActionChatDetails?.id;

      // Refresh recent chats list
      dispatch(commonFunctionForAPICalls({
        method: "GET",
        url: "/chats/recent?limit=10",
        name: "getAllRecentChats"
      }));

      // Show toast with undo action
      setTimeout(() => {
        triggerToastWithAction(
          "Chat Deleted",
          "Your chat has been successfully deleted",
          "success",
          5000,
          "Undo",
          () => {
            // Undo delete action
            if (chatId) {
              const payload = {
                method: "POST",
                url: `/chats/${chatId}/undo-delete`,
                name: "undoDeleteChat"
              };
              dispatch(commonFunctionForAPICalls(payload));
            }
          }
        );
      }, 500);

      dispatch(resetChatDeleted());
    }
  }, [chatsStates.loaderStates.isChatDeleted]);

  // Handle bulk delete success case
  useEffect(() => {
    if (chatsStates.loaderStates.isBulkOperationCompleted === true) {
      dispatch(setToggleDeleteChatConfirmPopup(false));

      // Refresh recent chats list
      dispatch(commonFunctionForAPICalls({
        method: "GET",
        url: "/chats/recent?limit=10",
        name: "getAllRecentChats"
      }));
    }
  }, [chatsStates.loaderStates.isBulkOperationCompleted]);

  // Handle undo delete success case
  useEffect(() => {
    if (chatsStates.loaderStates.isChatDeleteUndone === true) {
      // Refresh recent chats list
      dispatch(commonFunctionForAPICalls({
        method: "GET",
        url: "/chats/recent?limit=10",
        name: "getAllRecentChats"
      }));

      dispatch(resetChatDeleteUndone());
    }
  }, [chatsStates.loaderStates.isChatDeleteUndone]);

  return (
    <Modal
      visible={toggleStates.toggleDeleteChatConfirmPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleDeleteChatConfirmPopup(false))}
    >
      <Toaster />
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
          onPress={() => dispatch(setToggleDeleteChatConfirmPopup(false))}
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
              <Image source={deleteBin} style={styles.verifiedIcon} />
            </View>

            {/* Title */}
            <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>
              {isBulkDelete
                ? `Delete ${chatCount} chat${chatCount > 1 ? 's' : ''}?`
                : "Delete Chat?"}
            </Text>

            {/* Description */}
            {isBulkDelete && (
              <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
                Confirm chat deletion{"\n"}Once deleted, this chat can't be recovered.
              </Text>
            )}

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
                onPress={() => dispatch(setToggleDeleteChatConfirmPopup(false))}
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
                style={styles.button}
                onPress={() => {
                  if (isBulkDelete) {
                    // Bulk delete operation
                    if (!selectedChatIds || selectedChatIds.length === 0) {
                      triggerToast("Error", "No chats selected", "error", 3000);
                      return;
                    }

                    const payload = {
                      method: "POST",
                      url: "/chats/bulk",
                      data: {
                        action: "delete",
                        chat_ids: selectedChatIds
                      },
                      name: "bulkOperationsForChats"
                    };

                    dispatch(commonFunctionForAPICalls(payload));
                  } else {
                    // Single delete operation
                    const chatId = chatsStates.allChatsDatas.currentActionChatDetails?.id;

                    if (!chatId) {
                      triggerToast("Error", "Chat ID not found", "error", 3000);
                      return;
                    }

                    const payload = {
                      method: "DELETE",
                      url: `/chats/${chatId}`,
                      name: "deleteChat"
                    };

                    dispatch(commonFunctionForAPICalls(payload));
                  }
                }}
                activeOpacity={0.8}
                disabled={isLoading}
              >
                <Text
                  style={[styles.buttonText, { fontFamily: "Mukta-Regular" }]}
                >
                  {isLoading ? "Deleting..." : "Done"}
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

export default DeleteConfirmPopup;
