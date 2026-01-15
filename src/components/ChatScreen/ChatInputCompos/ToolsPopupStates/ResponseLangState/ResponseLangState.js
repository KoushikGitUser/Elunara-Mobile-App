import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleToolsPopupStates,
  setToggleTopicsPopup,
} from "../../../../../redux/slices/toggleSlice";
import { ArrowLeft } from "lucide-react-native";
import { AntDesign } from "@expo/vector-icons";
import { scaleFont, verticalScale } from "../../../../../utils/responsive";
import SavedLanguageState from "./SavedLanguageState";
import FirstLanguageSetState from "./FirstLanguageSetState";

const ResponseLangState = () => {
  const dispatch = useDispatch();
  const [isLanguageSaved, setIsLanguageSaved] = useState(false);
  const { settingsStates } = useSelector((state) => state.API);

  useEffect(() => {
    // Check if language preferences already exist
    const languagePreferences = settingsStates?.allGeneralSettings?.responseLanguageSettings;
    if (languagePreferences && (languagePreferences.response_language_1 || languagePreferences.response_language_2 || languagePreferences.response_language_3)) {
      setIsLanguageSaved(true);
    }
  }, [settingsStates?.allGeneralSettings?.responseLanguageSettings]);
  return (
    <View style={styles.modalSheet}>
      {/* Content */}
      <View style={styles.content}>
        <View style={styles.closeModalMain}>
          <ArrowLeft
            onPress={() => dispatch(setToggleToolsPopupStates(0))}
            size={30}
            strokeWidth={2}
          />
          <AntDesign
            onPress={() => dispatch(setToggleTopicsPopup(false))}
            name="close"
            size={24}
            color="black"
          />
        </View>
        {isLanguageSaved? <SavedLanguageState/>:<FirstLanguageSetState setIsLanguageSaved={setIsLanguageSaved} />}
      </View>
    </View>
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
});

export default ResponseLangState;
