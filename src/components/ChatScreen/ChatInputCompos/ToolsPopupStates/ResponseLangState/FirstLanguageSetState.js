import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { moderateScale, scaleFont } from "../../../../../utils/responsive";
import LanguageDropdown from "./LanguageDropdown";
import { languages } from "../../../../../data/datas";
import { useDispatch, useSelector } from "react-redux";
import { commonFunctionForAPICalls } from "../../../../../redux/slices/apiCommonSlice";

const screenHeight = Dimensions.get("window").height;

const FirstLanguageSetState = ({setIsLanguageSaved}) => {
  const [selectedCounts, setSelectedCounts] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const { settingsStates } = useSelector((state) => state.API);

  const updateResponseLanguage1 = (id) => {
    const data = {
      response_language_1_id: id,
    };
    const payload = {
      method: "PUT",
      url: "/settings/general",
      data,
      name: "updateGeneralSettings",
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  const updateResponseLanguage2 = (id) => {
    const data = {
      response_language_2_id: id,
    };
    const payload = {
      method: "PUT",
      url: "/settings/general",
      data,
      name: "updateGeneralSettings",
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  const updateResponseLanguage3 = (id) => {
    const data = {
      response_language_3_id: id,
    };
    const payload = {
      method: "PUT",
      url: "/settings/general",
      data,
      name: "updateGeneralSettings",
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  const handleSaveLanguagePreferences = async () => {
    setIsSaving(true);

    // Refetch to ensure sync
    const payload = {
      method: "GET",
      url: "/settings/general",
      name: "getAllGeneralSettings",
    };

    await dispatch(commonFunctionForAPICalls(payload));
    setIsSaving(false);
    setIsLanguageSaved(true);
  };
  return (
    <>
      {/* Title */}
      <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>Set Response Language</Text>
      {/* Description */}
      <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
        Choose up to 3 languages to toggle between. Update anytime in Settings.
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollableContent}>
        <Text
          style={{
            fontSize: moderateScale(12),
            color: "#5E5E5E",
            marginTop: 40,
            fontFamily: "Mukta-Regular"
          }}
        >
          Default Language
        </Text>
        <LanguageDropdown
          initialSetValue={
            settingsStates.allGeneralSettings.responseLanguageSettings?.response_language_1
          }
          triggerAPICall={updateResponseLanguage1}
          selectedCounts={selectedCounts}
          setSelectedCounts={setSelectedCounts}
          selectOptionsArray={languages}
        />
        <Text
          style={{
            textAlign: "center",
            color: "#757575",
            fontSize: scaleFont(13),
            paddingTop: 15,
            fontFamily: "Mukta-Regular" 
          }}
        >
          Select 2 more
        </Text>
        <Text
          style={{
            fontSize: moderateScale(12),
            color: "#5E5E5E",
            marginTop: 40,
            fontFamily: "Mukta-Regular"
          }}
        >
          Language 2
        </Text>
        <LanguageDropdown
          initialSetValue={
            settingsStates.allGeneralSettings.responseLanguageSettings?.response_language_2
          }
          triggerAPICall={updateResponseLanguage2}
          selectedCounts={selectedCounts}
          setSelectedCounts={setSelectedCounts}
          selectOptionsArray={languages}
        />
        <Text
          style={{
            fontSize: moderateScale(12),
            color: "#5E5E5E",
            marginTop: 40,
            fontFamily: "Mukta-Regular"
          }}
        >
          Language 3
        </Text>
        <LanguageDropdown
          initialSetValue={
            settingsStates.allGeneralSettings.responseLanguageSettings?.response_language_3
          }
          triggerAPICall={updateResponseLanguage3}
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
                selectedCounts?.length >= 3 && !isSaving ? "#081A35" : "#CDD5DC",
            },
          ]}
          onPress={handleSaveLanguagePreferences}
          activeOpacity={0.8}
          disabled={selectedCounts?.length < 3 || isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={[styles.buttonText,{fontFamily: "Mukta-Regular" }]}>Save Language Preferences</Text>
          )}
        </TouchableOpacity>
            <View style={{flexDirection:"row",width:"100%",justifyContent:"center",alignItems:"center"}}>
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
              <Pressable style={{borderBottomWidth:2}}>
                <Text style={{
                  fontSize: moderateScale(13),
                  lineHeight:15,
                  fontWeight: 600,
                  textAlign: "center",
                  fontFamily: "Mukta-Bold",
                }}>Settings</Text>
              </Pressable>
            </View>
      </ScrollView>
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
    maxHeight:0.8
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
    fontSize: scaleFont(26),
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 5,
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
    fontSize: scaleFont(13),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  scrollableContent:{
    maxHeight:screenHeight*0.55
  }
});

export default FirstLanguageSetState;
