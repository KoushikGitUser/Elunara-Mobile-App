import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";
import React from "react";
import { BlurView } from "@react-native-community/blur";
import { scaleFont } from "../../utils/responsive";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TermsOfUseModal = ({ visible, onClose }) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
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
          onPress={onClose}
        />

        {/* Modal Sheet */}
        <View style={[styles.modalSheet, { marginTop: 30 }]}>
          {/* Header */}
          <View style={styles.headerSection}>
            <Text style={styles.headerLabel}></Text>
            <Text style={styles.title}>Terms of Use</Text>
            <Text style={styles.introText}>
              By using our app and services, you agree to the following Terms of
              Use. Please read them carefully.
            </Text>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
          >
            {/* Acceptance of Terms */}
            <Text style={styles.sectionTitle}>Acceptance of Terms</Text>
            <Text style={styles.bodyText}>
              By accessing or using VedLynk, you confirm that you are at least 13
              years old (or the minimum age required by your local laws) and that
              you agree to be bound by these Terms and our Privacy Policy.
            </Text>

            {/* Use of the Service */}
            <Text style={styles.sectionTitle}>Use of the Service</Text>
            <Text style={styles.bodyText}>
              Elunara provides personalized learning experiences using AI. You
              agree to use the app only for lawful and educational purposes, and
              not to misuse or exploit the platform in any way.
            </Text>

            {/* User Responsibilities */}
            <Text style={styles.sectionTitle}>User Responsibilities</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletTextSimple}>
                Provide accurate and complete information.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletTextSimple}>
                Keep your login credentials secure.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletTextSimple}>
                Respect the platform, other users, and all applicable laws.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletTextSimple}>
                Do not attempt to reverse-engineer, copy, or misuse the AI or app
                content.
              </Text>
            </View>

            {/* Intellectual Property */}
            <Text style={styles.sectionTitle}>Intellectual Property</Text>
            <Text style={styles.bodyText}>
              All content, features, and technology in Elunara are the property of
              Elunara or its licensors. You may not reproduce, distribute, or
              modify any part of the platform without explicit permission.
            </Text>

            {/* Data & Privacy */}
            <Text style={styles.sectionTitle}>Data & Privacy</Text>
            <Text style={styles.bodyText}>
              Your data is handled in accordance with our Privacy Policy. By
              using Elunara, you consent to the collection and use of your data
              for personalization and service improvement.
            </Text>

            {/* Limitations of AI */}
            <Text style={styles.sectionTitle}>Limitations of AI</Text>
            <Text style={styles.bodyText}>
              Elunara uses AI to provide guidance and content. While we strive for
              accuracy, the AI may occasionally provide incorrect or incomplete
              responses. Always use your judgment and consult trusted sources when
              needed.
            </Text>

            {/* Service Availability */}
            <Text style={styles.sectionTitle}>Service Availability</Text>
            <Text style={styles.bodyText}>
              We aim to provide continuous service but do not guarantee
              uninterrupted access. We may suspend, update, or discontinue
              features at any time, with or without notice.
            </Text>
          </ScrollView>

          {/* Close Button */}
          <View style={[styles.buttonContainer, { paddingBottom: Math.max(insets.bottom, 24) + 10 }]}>
            <TouchableOpacity
              style={styles.button}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Close</Text>
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
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  headerSection: {
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headerLabel: {
    fontSize: 13,
    color: "#666666",
    marginBottom: 8,
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
  },
  title: {
    fontSize: scaleFont(23),
    fontFamily: "Mukta-Bold",
    color: "#1A1A1A",
    marginBottom: 12,
    lineHeight: 36,
  },
  introText: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#666666",
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: scaleFont(18),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#1A1A1A",
    marginBottom: 12,
    marginTop: 16,
  },
  bodyText: {
    fontSize: 16,
    fontFamily: "Mukta-Regular",
    color: "#666666",
    lineHeight: 24,
    marginBottom: 16,
  },
  bulletPoint: {
    flexDirection: "row",
    paddingLeft: 8,
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    fontFamily: "Mukta-Regular",
    color: "#666666",
    marginRight: 12,
    marginTop: 2,
  },
  bulletTextSimple: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#666666",
    lineHeight: 24,
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  button: {
    backgroundColor: "#081A35",
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontWeight: "500",
    fontFamily: "Mukta-Medium",
    letterSpacing: 0.3,
  },
});

export default TermsOfUseModal;
