import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { scaleFont } from "../../utils/responsive";

const ContactPage = () => {
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
        Our friendly team is here to help. Contact us on <Text style={{ fontFamily:"Mukta-Bold"}}>support@elunara.com
            </Text>
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
        <Text style={styles.emailText}>privacy@elunara.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: scaleFont(18),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  bodyText: {
    fontSize: scaleFont(13),
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
    fontSize: 15,
    color: "#1A1A1A",
    fontWeight: "500",
    fontFamily: "Mukta-Medium",
  },
});

export default ContactPage;
