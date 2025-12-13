import { View, Text, ScrollView, StyleSheet, StatusBar } from "react-native";
import { scaleFont } from "../../utils/responsive";
import React from "react";

const TermsOfUse = ({ handleScroll }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        onScroll={handleScroll}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            backgroundColor: "#F3F3F3",
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          <Text style={styles.headerLabel}>Updated: 24 July 2025</Text>
          <Text style={styles.mainTitle}>Terms of use</Text>
          <Text style={styles.introText}>
            By using our app and services, you agree to the following Terms of
            Use. Please read them carefully.
          </Text>
        </View>

        {/* Cookies section */}

        <View style={{ padding: 20, paddingBottom: 5 }}>
          <Text style={styles.sectionTitle}>Acceptance of Terms</Text>
          <Text style={[styles.bodyText, { paddingBottom: 20 }]}>
            By accessing or using VedLynk, you confirm that you are at least 13
            years old (or the minimum age required by your local laws) and that
            you agree to be bound by these Terms and our Privacy Policy.
          </Text>

          {/* How long do we keep your information */}
          <Text style={styles.sectionTitle}>Use of the Service</Text>
          <Text style={[styles.bodyText, { paddingBottom: 20 }]}>
            Elunara provides personalized learning experiences using AI. You
            agree to use the app only for lawful and educational purposes, and
            not to misuse or exploit the platform in any way.
          </Text>
        </View>

        <View style={{ padding: 20, paddingTop: 5 }}>
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
        </View>

        <View style={{ padding: 20, paddingBottom: 5 }}>
          <Text style={styles.sectionTitle}>Intellectual Property</Text>
          <Text style={[styles.bodyText, { paddingBottom: 20 }]}>
            All content, features, and technology in Elunara are the property of
            Elunara or its licensors. You may not reproduce, distribute, or
            modify any part of the platform without explicit permission.
          </Text>

          {/* How long do we keep your information */}
          <Text style={styles.sectionTitle}>Data & Privacy</Text>
          <Text style={[styles.bodyText, { paddingBottom: 20 }]}>
            Your data is handled in accordance with our [Privacy Policy]. By
            using Elunara, you consent to the collection and use of your data
            for personalization and service improvement.
          </Text>
        </View>

        <View style={{ padding: 20, paddingTop: 5 }}>
          <Text style={styles.sectionTitle}>Limitations of AI</Text>
          <Text style={[styles.bodyText, { paddingBottom: 20 }]}>
            Elunara uses AI to provide guidance and content. While we strive for
            accuracy, the AI may occasionally provide incorrect or incomplete
            responses. Always use your judgment and consult trusted sources when
            needed.
          </Text>

          {/* How long do we keep your information */}
          <Text style={styles.sectionTitle}>Service Availability</Text>
          <Text style={[styles.bodyText, { paddingBottom: 20 }]}>
            We aim to provide continuous service but do not guarantee
            uninterrupted access. We may suspend, update, or discontinue
            features at any time, with or without notice.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  headerLabel: {
    fontSize: 13,
    color: "#666666",
    marginBottom: 8,
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
  },
  mainTitle: {
    fontSize: scaleFont(24),
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
  sectionTitle: {
    fontSize: scaleFont(18),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#1A1A1A",
    marginBottom: 12,
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
    fontFamily: "Mukta-Medium",
    color: "#1A1A1A",
    lineHeight: 24,
  },
  bulletText: {
    fontSize: 15,
    color: "#666666",
    lineHeight: 24,
    fontWeight: 400,
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
  },
  emailIcon: {
    fontSize: 16,
    marginRight: 8,
    color: "#666666",
  },
  emailText: {
    fontSize: 15,
    color: "#1A1A1A",
    fontWeight: "500",
  },
  bottomSpacer: {
    height: 20,
  },
});

export default TermsOfUse;
