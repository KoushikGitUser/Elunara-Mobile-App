import React, { useEffect } from "react";
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
import deleteBin from "../../assets/images/deleteBin.png";
import { scaleFont } from "../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { setToggleDeleteChatPopup } from "../../redux/slices/toggleSlice";
import { triggerToastWithAction } from "../../services/toast";
import { commonFunctionForAPICalls, resetChatDeleted, resetChatDeleteUndone } from "../../redux/slices/apiCommonSlice";
import Toaster from "../UniversalToaster/Toaster";

const { width } = Dimensions.get("window");

const DeleteChatPopup = () => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { chatsStates } = useSelector((state) => state.API);

  const dispatch = useDispatch();

  const isLoading = chatsStates.loaderStates.isChatDeleted === "pending";

  // Handle delete success case
  useEffect(() => {
    if (chatsStates.loaderStates.isChatDeleted === true) {
      dispatch(setToggleDeleteChatPopup(false));

      const chatId = chatsStates.allChatsDatas.currentActionChatDetails?.id;

      // Refetch all chats
      dispatch(commonFunctionForAPICalls({
        method: "GET",
        url: "/chats?page=1&per_page=20",
        name: "fetchAllUserChatsAvailable"
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

  // Handle undo delete success case
  useEffect(() => {
    if (chatsStates.loaderStates.isChatDeleteUndone === true) {
      // Refetch all chats after undo
      dispatch(commonFunctionForAPICalls({
        method: "GET",
        url: "/chats?page=1&per_page=20",
        name: "fetchAllUserChatsAvailable"
      }));

      dispatch(resetChatDeleteUndone());
    }
  }, [chatsStates.loaderStates.isChatDeleteUndone]);

  return (
    <Modal
      visible={toggleStates.toggleDeleteChatPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleDeleteChatPopup(false))}
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
          onPress={() => dispatch(setToggleDeleteChatPopup(false))}
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
              Delete Chat?
            </Text>

            {/* Description */}
            <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
              This action cannot be undone.
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
                onPress={() => dispatch(setToggleDeleteChatPopup(false))}
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
                  const chatId = chatsStates.allChatsDatas.currentActionChatDetails?.id;

                  if (!chatId) {
                    return;
                  }

                  const payload = {
                    method: "DELETE",
                    url: `/chats/${chatId}`,
                    name: "deleteChat"
                  };

                  dispatch(commonFunctionForAPICalls(payload));
                }}
                activeOpacity={0.8}
                disabled={isLoading}
              >
                <Text
                  style={[styles.buttonText, { fontFamily: "Mukta-Regular" }]}
                >
                  {isLoading ? "Deleting..." : "Delete"}
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
  verifiedIcon: {
    height: 55,
    width: 50,
    objectFit: "contain",
  },
  title: {
    fontSize: scaleFont(26),
    color: "#1F2937",
    marginBottom: 32,
    letterSpacing: -0.5,
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

export default DeleteChatPopup;
