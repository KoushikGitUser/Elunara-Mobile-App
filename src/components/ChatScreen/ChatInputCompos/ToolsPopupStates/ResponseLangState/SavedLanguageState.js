import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moderateScale, scaleFont } from "../../../../../utils/responsive";
import {
  setSelectedLanguage,
  setToggleToolsPopup,
} from "../../../../../redux/slices/toggleSlice";

const SavedLanguageState = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { chatCustomisationStates } = useSelector((state) => state.Toggle);
  const { settingsStates } = useSelector((state) => state.API);

  // Get saved languages from responseLanguageSettings
  const savedLanguages = useMemo(() => {
    const langSettings =
      settingsStates?.allGeneralSettings?.responseLanguageSettings;
    const languages = [];

    if (langSettings?.response_language_1) {
      languages.push({
        id: langSettings.response_language_1.id,
        lang:
          langSettings.response_language_1.name ||
          langSettings.response_language_1.lang,
      });
    }
    if (langSettings?.response_language_2) {
      languages.push({
        id: langSettings.response_language_2.id,
        lang:
          langSettings.response_language_2.name ||
          langSettings.response_language_2.lang,
      });
    }
    if (langSettings?.response_language_3) {
      languages.push({
        id: langSettings.response_language_3.id,
        lang:
          langSettings.response_language_3.name ||
          langSettings.response_language_3.lang,
      });
    }

    // Fallback to English if no languages are saved
    if (languages.length === 0) {
      languages.push({ id: 0, lang: "English" });
    }

    return languages;
  }, [settingsStates?.allGeneralSettings?.responseLanguageSettings]);

  // Initialize from Redux state
  useEffect(() => {
    if (chatCustomisationStates?.selectedLanguage?.name) {
      const index = savedLanguages.findIndex(
        (lang) => lang.lang === chatCustomisationStates.selectedLanguage.name,
      );
      if (index !== -1) {
        setSelectedStyle(index);
      }
    } else {
      setSelectedStyle(0); // Default to first saved language
    }
  }, [chatCustomisationStates?.selectedLanguage, savedLanguages]);

  // Handle language selection
  const handleLanguageSelection = (language, index) => {
    setSelectedStyle(index);

    const selectedData = {
      id: language.id,
      name: language.lang,
    };

    dispatch(setSelectedLanguage(selectedData));
  };
  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  const handleSelection = (langIndex) => {
    handleLanguageSelection(savedLanguages[langIndex], langIndex);
  };

  return (
    <>
      {/* Title */}
      <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>
        Response Language
      </Text>
      {/* Description */}
      <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
        Choose your response language — ideal for bilinguals or fluent speakers.
      </Text>

      <View style={styles.langContainer}>
        {savedLanguages.map((langs, langIndex) => {
          return (
            <TouchableOpacity
              key={langIndex}
              onPress={() => handleSelection(langIndex)}
              style={styles.langsMain}
            >
              <Text
                style={{ fontFamily: "Mukta-Regular", fontSize: scaleFont(15) }}
              >
                {langs.lang}
              </Text>
              <RadioButton selected={selectedStyle === langIndex} />
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: moderateScale(13),
            fontWeight: 400,
            textAlign: "center",
            fontFamily: "Mukta-Regular",
          }}
        >
          More LLMS? Update your list in{" "}
        </Text>
        <Pressable style={{ borderBottomWidth: 2 }}>
          <Text
            style={{
              fontSize: moderateScale(13),
              lineHeight: 15,
              fontWeight: 600,
              textAlign: "center",
              fontFamily: "Mukta-Bold",
            }}
          >
            Settings
          </Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: scaleFont(26),
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    letterSpacing: 0.2,
  },
  langContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 45,
    marginBottom: 30,
  },
  langsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  radioOuter: {
    width: 23,
    height: 23,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#D3DAE5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  radioInner: {
    width: "80%",
    height: "80%",
    borderRadius: 50,
    backgroundColor: "#000000ff",
  },
});

export default SavedLanguageState;
