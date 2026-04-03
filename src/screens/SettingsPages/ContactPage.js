import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { scaleFont } from "../../utils/responsive";

const ContactPage = () => {
  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <View style={{ padding: 20,paddingTop:5 }}>
      <Text style={[styles.sectionTitle, { paddingTop: 20 }]}>
        Need Support
      </Text>
      <Text style={styles.bodyText}>
        At Elunara, we believe that great conversations begin with listening. Whether you have a question, ran into an issue, or just want to share how the AI helped you out—we're all ears!
      </Text>

      <Text style={styles.bodyText}>
        From feedback to feature requests, partnership inquiries to support needs, your input helps us build a better, smarter experience for everyone.
      </Text>
      <Text style={styles.bodyText}>
        Our friendly team is here to help. Contact us on{" "}
        <TouchableOpacity onPress={() => handleEmailPress("support@elunara.com")}>
          <Text style={styles.emailLink}>support@elunara.com</Text>
        </TouchableOpacity>
      </Text>

      {/* Contact section */}
      <Text style={[styles.sectionTitle, { paddingTop: 20 }]}>
        How can you contact us about this policy?
      </Text>
      <Text style={styles.bodyText}>
        We use encryption, access controls, and secure storage practices to
        protect your data. While we strive to ensure security, no method of
        transmission is 100% secure.
      </Text>

      <Text style={styles.bodyText}>
        If you have questions or concerns about this Privacy Policy, contact us
        at:
      </Text>

      <View style={styles.emailContainer}>
        <TouchableOpacity onPress={() => handleEmailPress("privacy@elunara.com")}>
          <Text style={styles.emailLink}>privacy@elunara.com</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: scaleFont(20),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  bodyText: {
    fontSize: scaleFont(15),
    fontFamily: "Mukta-Regular",
    color: "#666666",
    lineHeight: 24,
    marginBottom: 10,
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  emailIcon: {
    fontSize: 16,
    fontFamily: "Mukta-Regular",
    marginRight: 8,
    color: "#666666",
  },
  emailText: {
    fontSize: 18,
    color: "#1A1A1A",
    fontWeight: "500",
    fontFamily: "Mukta-Medium",
  },
  emailLink: {
    fontSize: scaleFont(15),
    fontFamily: "Mukta-Bold",
    color: "#1A1A1A",
  },
});

export default ContactPage;
