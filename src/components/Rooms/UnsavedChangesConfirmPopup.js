import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { scaleFont } from "../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { setToggleUnsavedChangesConfirmPopup } from "../../redux/slices/toggleSlice";

const UnsavedChangesConfirmPopup = ({ onDiscard }) => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const dispatch = useDispatch();

  const handleDiscard = () => {
    onDiscard();
  };

  const handleCancel = () => {
    dispatch(setToggleUnsavedChangesConfirmPopup(false));
  };

  return (
    <Modal
      visible={toggleStates.toggleUnsavedChangesConfirmPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={handleCancel}
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
          onPress={handleCancel}
        />

        {/* Modal Sheet */}
        <View style={styles.modalSheet}>
          {/* Handle Bar */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Title */}
            <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>
              Discard Changes?
            </Text>

            {/* Description */}
            <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
              You have unsaved changes. Are you sure you want to discard them and leave?
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
                onPress={handleCancel}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: "black", fontFamily: "Mukta-Regular" },
                  ]}
                >
                  Don't Leave
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handleDiscard}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.buttonText, { fontFamily: "Mukta-Regular" }]}
                >
                  Discard
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
    lineHeight: 22,
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

export default UnsavedChangesConfirmPopup;
