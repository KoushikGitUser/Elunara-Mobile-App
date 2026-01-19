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

const PrivacyPolicyModal = ({ visible, onClose }) => {
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
            <Text style={styles.headerLabel}>Privacy Policy</Text>
            <Text style={styles.title}>We care about your privacy</Text>
            <Text style={styles.introText}>
              Your privacy is important to us at Elunara. We respect your privacy
              regarding any information we may collect from you across our
              website.
            </Text>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
          >
            {/* What information do we collect */}
            <Text style={styles.sectionTitle}>
              What information do we collect?
            </Text>
            <Text style={styles.bodyText}>
              We may collect the following types of information:
            </Text>

            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <View style={styles.bulletContent}>
                <Text style={styles.bulletTextBold}>
                  Personal Information:{" "}
                  <Text style={styles.bulletText}>
                    Name, email address, phone number, academic details, and other
                    information you provide.
                  </Text>
                </Text>
              </View>
            </View>

            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <View style={styles.bulletContent}>
                <Text style={styles.bulletTextBold}>
                  Usage Data:{" "}
                  <Text style={styles.bulletText}>
                    How you interact with our platform, including pages visited,
                    features used, and performance metrics.
                  </Text>
                </Text>
              </View>
            </View>

            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <View style={styles.bulletContent}>
                <Text style={styles.bulletTextBold}>
                  Device Information:{" "}
                  <Text style={styles.bulletText}>
                    Browser type, IP address, operating system, and device
                    identifiers.
                  </Text>
                </Text>
              </View>
            </View>

            {/* How do we use your information */}
            <Text style={styles.sectionTitle}>
              How do we use your information?
            </Text>
            <Text style={styles.bodyText}>We use the collected data to:</Text>

            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletTextSimple}>
                Personalize your learning experience.
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletTextSimple}>
                Provide support and platform improvements.
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletTextSimple}>
                Recommend relevant content, mentors, and peer groups.
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletTextSimple}>
                Communicate important updates or offers.
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletTextSimple}>
                Ensure the safety, integrity, and security of the platform.
              </Text>
            </View>

            {/* Cookies section */}
            <Text style={styles.sectionTitle}>
              Do we use cookies and other technologies?
            </Text>
            <Text style={styles.bodyText}>
              Pharetra morbi libero id aliquam elit massa integer tellus. Quis
              felis aliquam ullamcorper porttitor. Pulvinar ullamcorper sit
              dictumst ut eget a, elementum eu. Maecenas est morbi mattis id in
              ac pellentesque ac.
            </Text>

            {/* How long do we keep your information */}
            <Text style={styles.sectionTitle}>
              How long do we keep your information?
            </Text>
            <Text style={styles.bodyText}>
              We use encryption, access controls, and secure storage practices
              to protect your data. While we strive to ensure security, no
              method of transmission is 100% secure.
            </Text>

            {/* How do we keep your information safe */}
            <Text style={styles.sectionTitle}>
              How do we keep your information safe?
            </Text>
            <Text style={styles.bodyText}>
              We do not sell your personal data. We may share data only:
            </Text>

            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletTextSimple}>
                With trusted partners who help us deliver our services (under
                strict confidentiality agreements).
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletTextSimple}>
                As required by law or to protect our legal rights.
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletTextSimple}>
                In case of a business transfer (merger, acquisition, etc.).
              </Text>
            </View>

            {/* What are your privacy rights */}
            <Text style={styles.sectionTitle}>What are your privacy rights?</Text>
            <Text style={styles.bodyText}>
              We use encryption, access controls, and secure storage practices to
              protect your data. While we strive to ensure security, no method of
              transmission is 100% secure.
            </Text>

            {/* Contact section */}
            <Text style={styles.sectionTitle}>
              How can you contact us about this policy?
            </Text>
            <Text style={styles.bodyText}>
              We use encryption, access controls, and secure storage practices to
              protect your data. While we strive to ensure security, no method of
              transmission is 100% secure.
            </Text>

            <Text style={styles.bodyText}>
              If you have questions or concerns about this Privacy Policy, contact
              us at:
            </Text>

            <View style={styles.emailContainer}>
              <Text style={styles.emailIcon}>📧</Text>
              <Text style={styles.emailText}>privacy@elunara.com</Text>
            </View>
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
  bulletContent: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bulletTextBold: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#1A1A1A",
    lineHeight: 24,
  },
  bulletText: {
    fontSize: 15,
    color: "#666666",
    lineHeight: 24,
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
    flex: 1,
  },
  bulletTextSimple: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#666666",
    lineHeight: 24,
    flex: 1,
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  emailIcon: {
    fontSize: 16,
    fontFamily: "Mukta-Regular",
    marginRight: 8,
    color: "#666666",
  },
  emailText: {
    fontSize: 15,
    color: "#1A1A1A",
    fontWeight: "500",
    fontFamily: "Mukta-Medium",
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

export default PrivacyPolicyModal;
