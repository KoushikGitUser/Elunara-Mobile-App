import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { moderateScale, scaleFont } from "../../../utils/responsive";
import ResLangIcon from "../../../../assets/SvgIconsComponent/ToolsOptionsIcons/ResLangIcon";
import LanguageDropdown from "../../ChatScreen/ChatInputCompos/ToolsPopupStates/ResponseLangState/LanguageDropdown";
import { languages } from "../../../data/datas";

const SetResponseLanguage = () => {
    const [selectedCounts,setSelectedCounts] = useState([])
  return (
    <View style={styles.content}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <ResLangIcon />
          <Text style={styles.title}>Set Response Language</Text>
        </View>
        <Text style={styles.subtitle}>
          Receive responses in your chosen languages! Pick up to 3 languages now
          to easily toggle between them.
        </Text>
      </View>
      <Text
        style={{
          fontSize: moderateScale(10),
          color: "#5E5E5E",
          marginTop: 40,
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
          fontSize: moderateScale(10),
          color: "#5E5E5E",
          marginTop: 40,
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
          fontSize: moderateScale(10),
          color: "#5E5E5E",
          marginTop: 40,
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
    marginBottom:25
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellIcon: {
    marginRight: 16,
  },
  title: {
    fontSize: scaleFont(17),
    fontWeight: "600",
    color: "#1F2937",
    letterSpacing: -0.5,
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: scaleFont(13),
    color: "#6B7280",
    marginTop: 10,
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
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  settingDescription: {
    fontSize: scaleFont(13),
    color: "#6B7280",
  },
});

export default SetResponseLanguage;
