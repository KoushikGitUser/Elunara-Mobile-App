import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { moderateScale, scaleFont } from "../../../../../utils/responsive";
import LanguageDropdown from "./LanguageDropdown";
import { languages } from "../../../../../data/datas";

const FirstLanguageSetState = ({setIsLanguageSaved}) => {
  const [selectedCounts, setSelectedCounts] = useState([]);
  return (
    <>
      {/* Title */}
      <Text style={styles.title}>Set Response Language</Text>
      {/* Description */}
      <Text style={styles.description}>
        Choose up to 3 languages to toggle between. Update anytime in Settings.
      </Text>

      <View>
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
            textAlign: "center",
            color: "#757575",
            fontSize: scaleFont(12),
            paddingTop: 15,
          }}
        >
          Select 2 more
        </Text>
        <Text
          style={{
            fontSize: moderateScale(10),
            color: "#5E5E5E",
            marginTop: 40,
          }}
        >
          Language 2
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
          Language 3
        </Text>
        <LanguageDropdown
          selectedCounts={selectedCounts}
          setSelectedCounts={setSelectedCounts}
          selectOptionsArray={languages}
        />
        {/* Button */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                selectedCounts?.length >= 3 ? "#081A35" : "#CDD5DC",
            },
          ]}
          onPress={() => setIsLanguageSaved(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Save LLM Preferences</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: moderateScale(11),
            fontWeight: 600,
            textDecorationLine: "underline",
            textAlign: "center",
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(11),
              fontWeight: 400,
              paddingRight: 5,
              textDecorationLine: "none",
            }}
          >
            More LLMS? Update your list in{" "}
          </Text>
          Settings
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
  },
  verifiedIcon: {
    height: 55,
    width: 50,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  iconContainer: {
    marginTop: 5,
  },
  closeModalMain: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: scaleFont(23),
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(12),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    letterSpacing: 0.2,
  },
    button: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(11),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});

export default FirstLanguageSetState;
