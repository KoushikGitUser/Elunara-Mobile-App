import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { Coins } from "lucide-react-native";
import { scaleFont } from "../../utils/responsive";
import { appColors } from "../../themes/appColors";

const WhatIsLPModal = ({ visible, onClose, onActivate }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={5}
          reducedTransparencyFallbackColor="rgba(0,0,0,0.4)"
        />
        <View style={styles.androidBlur} />
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.modalSheet}>
          <View style={styles.content}>
            <View style={styles.closeRow}>
              <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.iconCircle}>
              <View style={styles.coinstar}>
                <AntDesign name="star" size={22} color={appColors.navyBlueShade} />
              </View>
            </View>

            <Text style={styles.title}>What is Learning Points</Text>
            <Text style={styles.description}>
              <Text style={{ fontFamily: "Mukta-bold" }}>Learning Points (LP) </Text>
              are the <Text style={{ fontFamily: "Mukta-bold" }}>in-app credits</Text> that power your entire Elunara experience. Learning Points have to be purchased to unlock and run every feature of the app — from AI chats, Learning Labs, notes, curriculum access, and many more. Without active Learning Points, you won't be able to use any feature of the app. Activate your Learning Points to get started.
            </Text>

            <TouchableOpacity
              onPress={onActivate}
              style={styles.activateButton}
              activeOpacity={0.85}
            >
              <Text style={styles.activateButtonText}>Activate Learning Points</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
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
    paddingBottom: Platform.OS === "ios" ? 0 : 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  closeRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EEF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: scaleFont(25),
    fontFamily: "Mukta-Bold",
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: scaleFont(17),
    fontFamily: "Mukta-Regular",
    color: "#6B7280",
    lineHeight: 22,
    marginBottom: 24,
  },
  activateButton: {
    backgroundColor: appColors.navyBlueShade,
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  activateButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(16),
    fontFamily: "Mukta-Bold",
    letterSpacing: 0.2,
  },
  coinstar: {
    height: 35,
    width: 35,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: appColors.navyBlueShade,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default WhatIsLPModal;
