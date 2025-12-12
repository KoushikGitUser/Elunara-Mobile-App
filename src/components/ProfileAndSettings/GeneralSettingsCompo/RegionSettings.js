import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import FlagIcon from "../../../../assets/SvgIconsComponent/GeneralSettingsIcon/FlagIcon";
import LanguageDropdown from "../../ChatScreen/ChatInputCompos/ToolsPopupStates/ResponseLangState/LanguageDropdown";
import { moderateScale, scaleFont } from "../../../utils/responsive";
import { languages } from "../../../data/datas";

const RegionSettings = () => {
  const [selectedCounts, setSelectedCounts] = useState([]);

  return (
    <View style={styles.content}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <FlagIcon />
          <Text style={styles.title}>Region</Text>
        </View>
        <Text style={styles.subtitle}>
          Set your location to customize content, language, and features for
          your area.
        </Text>
      </View>
      <Text
        style={{
          fontSize: moderateScale(12),
          color: "#5E5E5E",
          marginTop: 20,
          fontFamily: "Mukta-Regular",
        }}
      >
        Default Language
      </Text>
      <LanguageDropdown
        selectedCounts={selectedCounts}
        setSelectedCounts={setSelectedCounts}
        selectOptionsArray={languages}
      />
      <Text
        style={{
          fontSize: moderateScale(12),
          color: "#5E5E5E",
          marginTop: 20,
          fontFamily: "Mukta-Regular",
        }}
      >
        Default Language
      </Text>
      <LanguageDropdown
        selectedCounts={selectedCounts}
        setSelectedCounts={setSelectedCounts}
        selectOptionsArray={languages}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    marginBottom: 25,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellIcon: {
    marginRight: 16,
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: "600",
    color: "#1F2937",
    fontFamily: "Mukta-Bold",
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: scaleFont(14),
    lineHeight: 20,
    color: "#757575",
    marginTop: 10,
    fontFamily: "Mukta-Regular",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 24,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 5,
    letterSpacing: -0.3,
  },
  settingDescription: {
    fontSize: scaleFont(13),
    color: "#6B7280",
  },
});

export default RegionSettings;
