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
  Image,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { useDispatch, useSelector } from "react-redux";
import { scaleFont } from "../../../utils/responsive";
import {
  setToggleDeleteChatConfirmPopup,
  setToggleUserMessageActionPopup,
} from "../../../redux/slices/toggleSlice";
import copy from "../../../assets/images/copy.png";
import Clipboard from "@react-native-clipboard/clipboard";
import pencil from "../../../assets/images/PencilSimple.png";
import CopyIcon from "../../../../assets/SvgIconsComponent/ChatMessagesActionIcons/CopyIcon";
import RenameIcon from "../../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/RenameIcon";
import { triggerToast } from "../../../services/toast";

const UserMessageActionPopup = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);
  const dispatch = useDispatch();

  const handleCopy = () => {
    Clipboard.setString(globalDataStates.userMessageOnLongPress);
    triggerToast("Message copied!", "", "normal", 3000);
  };

  const truncateTitle = (title, limit = 30) => {
    if (title.length <= limit) return title;
    return title.slice(0, limit) + "....";
  };

  return (
    <Modal
      visible={toggleStates.toggleUserMessageActionPopup}
      transparent={true}
      animationType="fade"
      onRequestClose={() => dispatch(setToggleUserMessageActionPopup(false))}
    >
      <View style={styles.container}>
        {/* Blur Background */}
        <BlurView style={styles.blurView} blurType="light" blurAmount={7} />
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
              right: 20,
            },
          ]}
        >
          <Text style={styles.messageText}>
            {truncateTitle(globalDataStates.userMessageOnLongPress)}
            
          </Text>
        </View>

        {/* Action Menu Popup */}
        <View
          style={[
            styles.modalSheet,
            {
              position: "absolute",
              right: 20,
              backgroundColor: "white",
            },
          ]}
        >
          {/* Content */}
          <View style={styles.content}>
            <TouchableOpacity
              onPress={() => {
                handleCopy();
                dispatch(setToggleUserMessageActionPopup(false));
              }}
              style={styles.actionButton}
            >
              <View style={styles.actionIcon}>
                <CopyIcon />
              </View>
              <Text style={styles.actionText}>Copy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => dispatch(setToggleUserMessageActionPopup(false))}
              style={styles.actionButton}
            >
              <View style={styles.actionIcon}>
                <RenameIcon />
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
    backgroundColor: "#0000004e",
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
    borderWidth: 1,
    borderColor: "#D3DAE5",
  },
  messageText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "400",
  },
  modalSheet: {
    backgroundColor: "white",
    borderRadius: 18,
    minWidth: 180,
    overflow: "hidden",
    top: "51%",
    borderWidth: 1,
    borderColor: "#D3DAE5",
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
    fontSize: 14,
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
