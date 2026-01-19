import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { scaleFont } from "../../../utils/responsive";
import RadioActiveIcon from "../../../../assets/SvgIconsComponent/AboutIcons/RadioActiveIcon";
import InvertedComaIcon from "../../../../assets/SvgIconsComponent/AboutIcons/InvertedComaIcon";

const OurValuesCompo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <RadioActiveIcon />
          <View style={styles.comaIcon}>
            <InvertedComaIcon />
          </View>

          <Text style={styles.headerText}>Our Values</Text>
        </View>
        <View style={{ padding: 20, paddingBottom: 0, paddingTop: 5 }}>
          <Text style={styles.mainTitle}>Our Mission</Text>
          <Text
            style={[
              styles.bodyText,
              { paddingBottom: 5, fontWeight: 400, color: "#757575" },
            ]}
          >
            Our mission is to create a lifelong learning ecosystem powered by AI
            that listens, adapts, and responds to each student's individual
            needs, enabling them to learn deeply, reflect honestly, and connect
            meaningfully with knowledge - and through it, with themselves, their
            peers, and the world around them.
          </Text>
        </View>

        <View style={{ padding: 20, paddingBottom: 0, paddingTop: 5 }}>
          <Text style={styles.mainTitle}>Our Vision</Text>
          <Text
            style={[
              styles.bodyText,
              { paddingBottom: 5, fontWeight: 400, color: "#757575" },
            ]}
          >
            Our vision is to create a personalized, emotionally aware AI-powered learning companion that helps students connect with knowledge in a way that allows them to reflect, learn, grow, and stay aligned with their educational purpose - across time, subjects, and industries.     
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#D3DAE5",
  },
  header: {
    marginBottom: 8,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    position: "relative",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  headerText: {
    fontSize: scaleFont(20),
    color: "#333333",
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    lineHeight: 28,
  },
  comaIcon: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  mainTitle: {
    fontSize: scaleFont(18),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#1A1A1A",
    marginBottom: 12,
    lineHeight: 36,
  },
  bodyText: {
    fontSize: scaleFont(16),
    fontWeight: 400,
    fontFamily: "Mukta-Regular",
    marginBottom: 16,
    lineHeight:20
  },
});

export default OurValuesCompo;
