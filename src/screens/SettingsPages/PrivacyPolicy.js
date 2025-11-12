import React from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar } from "react-native";
import { scaleFont } from "../../utils/responsive";

const PrivacyPolicy = ({handleScroll}) => {
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
          <Text style={styles.headerLabel}>Privacy Policy</Text>
          <Text style={styles.mainTitle}>We care about your privacy</Text>
          <Text style={styles.introText}>
            Your privacy is important to us at Elunara. We respect your privacy
            regarding any information we may collect from you across our
            website.
          </Text>
        </View>

        {/* What information do we collect */}
        <View style={{ padding: 20, marginTop: 5 }}>
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
                </Text>{" "}
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
        </View>

        {/* How do we use your information */}
        <View style={{ padding: 20 }}>
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
        </View>

        {/* Cookies section */}
        <View style={{padding:20}}>
          <View   >
            <Text style={styles.sectionTitle}>
              Do we use cookies and other Letter spacing technologies?
            </Text>
            <Text style={[styles.bodyText,{paddingBottom:20}]}>
              Pharetra morbi libero id aliquam elit massa integer tellus. Quis
              felis aliquam ullamcorper porttitor. Pulvinar ullamcorper sit
              dictumst ut eget a, elementum eu. Maecenas est morbi mattis id in
              ac pellentesque ac.
            </Text>

            {/* How long do we keep your information */}
            <Text style={styles.sectionTitle}>
              How long do we keep your information?
            </Text>
            <Text style={[styles.bodyText,{paddingBottom:20}]}>
              We use encryption, access controls, and secure storage practices
              to protect your data. While we strive to ensure security, no
              method of transmission is 100% secure.
            </Text>
          </View>

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
          <Text style={[styles.sectionTitle,{paddingTop:40}]}>What are your privacy rights?</Text>
          <Text style={styles.bodyText}>
            We use encryption, access controls, and secure storage practices to
            protect your data. While we strive to ensure security, no method of
            transmission is 100% secure.
          </Text>

          {/* Contact section */}
          <Text style={[styles.sectionTitle,{paddingTop:20}]}>
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
        </View>

        {/* Bottom spacer */}
        <View style={styles.bottomSpacer} />
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
  },
  mainTitle: {
    fontSize: scaleFont(24),
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
    lineHeight: 36,
  },
  introText: {
    fontSize: scaleFont(14),
    color: "#666666",
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: scaleFont(18),
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 15,
    color: "#666666",
    lineHeight: 24,
    marginBottom: 16,
  },
  bulletPoint: {
    flexDirection: "row",
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 15,
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
    color: "#1A1A1A",
    lineHeight: 24,
  },
  bulletText: {
    fontSize: 15,
    color: "#666666",
    lineHeight: 24,
    fontWeight: 400,
    flex: 1,
  },
  bulletTextSimple: {
    fontSize: scaleFont(14),
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

export default PrivacyPolicy;
