import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { useDispatch, useSelector } from "react-redux";
import { scaleFont } from "../../../utils/responsive";
import {
  setToggleDeleteChatConfirmPopup,
  setToggleUserMessageActionPopup,
} from "../../../redux/slices/toggleSlice";
import { Copy, Pencil } from "lucide-react-native";

const UserMessageActionPopup = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const { toggleStates } = useSelector((state) => state.Toggle);
  const dispatch = useDispatch();

  return (
    <Modal
      visible={toggleStates.toggleUserMessageActionPopup}
      transparent={true}
      animationType="fade"
      onRequestClose={() => dispatch(setToggleUserMessageActionPopup(false))}
    >
      <View style={styles.container}>
        {/* Blur Background */}
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={7}
          reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.73)"
        />
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => dispatch(setToggleUserMessageActionPopup(false))}
        />

        {/* Highlighted Message (shown at its original position) */}
        <View
          style={[
            styles.highlightedMessage,
            {
              position: "absolute",
              right: 16,
            },
          ]}
        >
          <Text style={styles.messageText}>Finance</Text>
        </View>

        {/* Action Menu Popup */}
        <View
          style={[
            styles.modalSheet,
            {
              position: "absolute",
              right: 16,
            },
          ]}
        >
          {/* Content */}
          <View style={styles.content}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Copy size={20} strokeWidth={1.25} />
              </View>
              <Text style={styles.actionText}>Copy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Pencil size={20} strokeWidth={1.25} />
              </View>
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  highlightedMessage: {
    backgroundColor: "#E8F4FD",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    maxWidth: "70%",
    top: "45%",
    right: 16,
    borderTopRightRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "400",
  },
  modalSheet: {
    backgroundColor: "white",
    borderRadius: 18,
    minWidth: 150,
    overflow: "hidden",
    top: "51%",
  },
  content: {
    paddingVertical: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  actionIcon: {
    marginRight: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 18,
  },
  actionText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "400",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 16,
  },
  // Remove unused styles
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
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: scaleFont(23),
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(12),
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
    fontSize: scaleFont(11),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});

export default UserMessageActionPopup;
