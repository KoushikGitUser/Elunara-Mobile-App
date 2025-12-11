import React, { useState } from "react";
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
import { triggerToast } from "../../../../services/toast";

const { width } = Dimensions.get("window");

const DeleteConfirmPopup = () => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);

  const dispatch = useDispatch();

  return (
    <Modal
      visible={toggleStates.toggleDeleteChatConfirmPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleDeleteChatConfirmPopup(false))}
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
              {globalDataStates.deleteConfirmPopupFrom == "chat" ?"Delete Chat?":globalDataStates.deleteConfirmPopupFrom == "allChats"?"Delete <10> chats?":globalDataStates.deleteConfirmPopupFrom == "rooms"?"Delete room?":"Delete <10> rooms?"}
              
            </Text>

            {/* Description */}
            <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
              Deleting this chat removes it permanently. It cannot be recovered.
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
                  dispatch(setToggleDeleteChatConfirmPopup(false));
                  setTimeout(() => {
                    triggerToast(
                      "Chat Deleted",
                      "Your chat has been successfully deleted",
                      "success",
                      3000
                    );
                  }, 500);
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.buttonText, { fontFamily: "Mukta-Regular" }]}
                >
                  Done
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
