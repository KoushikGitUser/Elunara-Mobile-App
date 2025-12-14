import {
  View,
  Text,
  Platform,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { scaleFont } from "../../../utils/responsive";
import { BlurView } from "@react-native-community/blur";
import flame from "../../../assets/images/flame.png";

const WhatIsStreakPopup = ({ verificationMailSent,close}) => {
  return (
    <Modal
      visible={verificationMailSent}
      transparent={true}
      animationType="slide"
      onRequestClose={() => close(false)}
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
          onPress={() => close(false)}
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
              <Image source={flame} style={styles.verifiedIcon} />
            </View>

            {/* Title */}
            <Text style={styles.title}>What is a Streak?</Text>

            {/* Description */}
            <Text style={[styles.description,{marginBottom:15}]}>
              A streak counts how many consecutive days you’ve come back to
              Elunara to learn and interact with the AI without missing a day.{" "}
              <Text style={{ fontFamily: "Mukta-Bold", color: "#3A3A3A" }}>
                It celebrates your dedication to daily learning and keeps you
                motivated to stay engaged.
              </Text>
            </Text>
            <Text style={[styles.description,{marginBottom:15}]}>
              The longer your streak, the more consistent you’ve been in growing
              your knowledge with Elunara!
            </Text>
            <Text style={styles.description}>
              Miss a day, and your streak resets—so keep coming back daily to
              build your learning habit and make steady progress.
            </Text>

            {/* Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => close(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Got it</Text>
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
  verifiedIcon: {
    height: 65,
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
    fontSize: scaleFont(24),
    color: "#3A3A3A",
    marginBottom: 16,
    fontFamily: "Mukta-Bold",
  },
  description: {
    fontSize: scaleFont(16),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    fontFamily: "Mukta-Regular",
  },
  button: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Bold",
  },
});

export default WhatIsStreakPopup;
