import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { moderateScale, scaleFont } from "../../../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { commonFunctionForAPICalls } from "../../../../../redux/slices/apiCommonSlice";
import { setSelectedLanguage, setToggleChangeLangWhileChatPopup } from "../../../../../redux/slices/toggleSlice";
import { useNavigation } from "@react-navigation/native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const SavedLang = () => {
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { settingsStates } = useSelector((state) => state.API);
  const { chatCustomisationStates, toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);

  // Get saved languages from responseLanguageSettings (up to 3)
  const savedLanguages = useMemo(() => {
    const langSettings = settingsStates?.allGeneralSettings?.responseLanguageSettings;
    const languages = [];

    if (langSettings?.response_language_1) {
      languages.push({
        id: langSettings.response_language_1.id,
        name: langSettings.response_language_1.name || langSettings.response_language_1.lang,
      });
    }
    if (langSettings?.response_language_2) {
      languages.push({
        id: langSettings.response_language_2.id,
        name: langSettings.response_language_2.name || langSettings.response_language_2.lang,
      });
    }
    if (langSettings?.response_language_3) {
      languages.push({
        id: langSettings.response_language_3.id,
        name: langSettings.response_language_3.name || langSettings.response_language_3.lang,
      });
    }

    // Fallback to English if no languages are saved
    if (languages.length === 0) {
      languages.push({ id: 0, name: "English" });
    }

    return languages;
  }, [settingsStates?.allGeneralSettings?.responseLanguageSettings]);

  // Initialize selected language from Redux state
  useEffect(() => {
    if (chatCustomisationStates?.selectedLanguage?.id && savedLanguages.length > 0) {
      const index = savedLanguages.findIndex(
        (lang) => lang.id === chatCustomisationStates.selectedLanguage.id
      );
      if (index !== -1) {
        setSelectedLanguageIndex(index);
      }
    }
  }, [chatCustomisationStates?.selectedLanguage, savedLanguages]);

  // Handle language selection
  const handleLanguageSelection = (language, index) => {
    setSelectedLanguageIndex(index);

    // Update Redux state with selected language
    const selectedData = {
      id: language.id,
      name: language.name,
    };
    dispatch(setSelectedLanguage(selectedData));

    // Get the AI message UUID for regeneration using the stored index
    const aiMessageIndex = globalDataStates.currentAIMessageIndexForRegeneration;
    const aiMessageUuid = globalDataStates.messageIDsArray[aiMessageIndex];
    console.log("Message Index:", aiMessageIndex, "Message UUID:", aiMessageUuid);

    if (aiMessageUuid) {
      // Build customisations payload
      const customisationsPayload = {
        llm_id: chatCustomisationStates.selectedLLM?.id,
        response_style_id: chatCustomisationStates.selectedResponseStyle?.id,
        language_id: language.id,
        citation_format_id: chatCustomisationStates.selectedCitationFormat?.id,
      };

      // Call regenerate API
      const regeneratePayload = {
        method: "POST",
        url: `/messages/${aiMessageUuid}/regenerate`,
        data: customisationsPayload,
        name: "regenerateAIResponse",
      };

      dispatch(commonFunctionForAPICalls(regeneratePayload));
    } else {
      console.log("cannot trigger regeneration");
    }

    // Close the popup
    dispatch(setToggleChangeLangWhileChatPopup(false));
  };

  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "#D3DAE5" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <>
      {/* Current Language Banner */}
      <View style={styles.currentLLMMain}>
        <Text style={styles.currentResponse}>Current Response Language</Text>

        <TouchableOpacity style={styles.badge}>
          <Text style={styles.btnText}>
            {chatCustomisationStates?.selectedLanguage?.name || "English"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Description */}
      <Text style={[styles.description, { fontFamily: "Mukta-Regular", marginBottom: 20 }]}>
        Update the current answer by selecting a different language
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ maxHeight: SCREEN_HEIGHT * 0.55 }}
      >
        <View style={styles.langContainer}>
          {savedLanguages.map((language, langIndex) => {
            return (
              <TouchableOpacity
                key={langIndex}
                onPress={() => handleLanguageSelection(language, langIndex)}
                style={styles.langsMain}
              >
                <Text
                  style={{
                    fontFamily: "Mukta-Regular",
                    fontSize: scaleFont(15),
                  }}
                >
                  {language.name}
                </Text>
                <RadioButton selected={selectedLanguageIndex === langIndex} />
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
            marginTop: 30,
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
            More Languages? Update your list in{" "}
          </Text>
          <Pressable
            style={{ borderBottomWidth: 2 }}
            onPress={() => {
              dispatch(setToggleChangeLangWhileChatPopup(false));
              navigation.navigate("settingsInnerPages", { page: 0 });
            }}
          >
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
      </ScrollView>
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
    fontSize: scaleFont(12),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 18,
    letterSpacing: 0.2,
  },
  langContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 25,
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
  currentLLMMain: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D8DCE4",
    marginBottom: 20,
  },
  currentResponse: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: "Mukta-Bold",
  },
  badge: {
    backgroundColor: "#F3F3F3",
    borderColor: "#D8DCE4",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  btnText: {
    fontSize: scaleFont(12),
    fontWeight: "400",
    color: "#1A1A1A",
    fontFamily: "Mukta-Regular",
  },
  button: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(13),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});

export default SavedLang;
