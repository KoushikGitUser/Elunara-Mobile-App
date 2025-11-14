import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { scaleFont } from "../../utils/responsive";
import React from "react";
import GradientText from "../../components/common/GradientText";
import chakraLogo from "../../assets/images/Knowledge Chakra 2.png";
import ElunaraRepresentsCompo from "../../components/ProfileAndSettings/AboutPageCompo/ElunaraRepresentsCompo";
import GraphIcon from "../../../assets/SvgIconsComponent/AboutIcons/GraphIcon";
import SettingsIcon from "../../../assets/SvgIconsComponent/AboutIcons/SettingsIcon";
import BooksIcon from "../../../assets/SvgIconsComponent/AboutIcons/BooksIcon";
import OurValuesCompo from "../../components/ProfileAndSettings/AboutPageCompo/OurValuesCompo";

const AboutPage = ({ handleScroll }) => {
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
          <GradientText
            marginBottom={0}
            marginTop={20}
            children="Elunara  "
            fullWidth={true}
            fontSize={scaleFont(35)}
          />
          <Text style={styles.mainTitle}>Companion for Lifelong Learning</Text>
          <Image source={chakraLogo} style={styles.chakraLogo} />
        </View>

        {/* Cookies section */}

        <View style={{ padding: 20, paddingBottom: 0, marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Who are we</Text>
          <Text style={[styles.bodyText, { paddingBottom: 20 }]}>
            Elunara is your smart learning companion, here to make education
            more affordable, personalized, and accessible—no matter the
            infrastructure.
          </Text>
        </View>

        <ElunaraRepresentsCompo />

        <View style={{ padding: 20, paddingBottom: 0, marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Our USPs</Text>
          <Text style={styles.mainTitle}>Why Elunara?</Text>
          <Text
            style={[
              styles.bodyText,
              { paddingBottom: 20, fontWeight: 400, color: "#757575" },
            ]}
          >
            Elunara is your smart learning companion, here to make education
            more affordable, personalized, and accessible—no matter the
            infrastructure.
          </Text>
        </View>

        <View style={{ padding: 20, paddingBottom: 0, paddingTop: 5 }}>
          <View style={styles.graphIcon}>
            <GraphIcon />
          </View>
          <Text style={styles.mainTitle}>Personalised Knowledge Linking</Text>
          <Text
            style={[
              styles.bodyText,
              { paddingBottom: 20, fontWeight: 400, color: "#757575" },
            ]}
          >
            Connects with the right content, mentors, and peers for a meaningful
            learning journey.
          </Text>
        </View>

        <View style={{ padding: 20, paddingBottom: 0, paddingTop: 5 }}>
          <View style={styles.settingsIcon}>
            <SettingsIcon />
          </View>
          <Text style={styles.mainTitle}>Global Education Access</Text>
          <Text
            style={[
              styles.bodyText,
              { paddingBottom: 20, fontWeight: 400, color: "#757575" },
            ]}
          >
            Avails high-quality, personalised education accessible to every
            learner, everywhere.
          </Text>
        </View>

        <View style={{ padding: 20, paddingBottom: 0, paddingTop: 5 }}>
          <View style={styles.booksIcon}>
            <BooksIcon />
          </View>
          <Text style={styles.mainTitle}>Adaptive Learning Agent</Text>
          <Text
            style={[
              styles.bodyText,
              { paddingBottom: 20, fontWeight: 400, color: "#757575" },
            ]}
          >
            Adapts to your unique learning style to make education more
            effective and personalised.
          </Text>
        </View>
        <OurValuesCompo />
        <View style={{ padding: 20, paddingBottom: 0, marginTop: 25 }}>
          <Text style={styles.mainTitle}>Service Availability</Text>
          <Text
            style={[
              styles.bodyText,
              { paddingBottom: 20, fontWeight: 400, color: "#757575" },
            ]}
          >
            We aim to provide continuous service but do not guarantee uninterrupted access. We may suspend, update, or discontinue features at any time, with or without notice.
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
  chakraLogo: {
    height: 114,
    width: 80,
    position: "absolute",
    right: -15,
    top: 20,
    zIndex: 99,
  },
  headerLabel: {
    fontSize: 13,
    color: "#666666",
    marginBottom: 8,
    fontWeight: "400",
  },
  mainTitle: {
    fontSize: scaleFont(18),
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
    fontSize: scaleFont(14),
    fontWeight: "400",
    color: "#757575",
    marginBottom: 12,
  },
  bodyText: {
    fontSize: scaleFont(14),
    fontWeight: 600,
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
  graphIcon: {
    height: 40,
    width: 40,
    borderRadius: 60,
    backgroundColor: "#F3ECFF",
    borderWidth: 1,
    borderColor: "#DFD8EB",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsIcon: {
    height: 40,
    width: 40,
    borderRadius: 60,
    backgroundColor: "#E9F2FF",
    borderWidth: 1,
    borderColor: "#CCDAEE",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  booksIcon: {
    height: 40,
    width: 40,
    borderRadius: 60,
    backgroundColor: "#F5EEE2",
    borderWidth: 1,
    borderColor: "#EAD8B9",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AboutPage;
