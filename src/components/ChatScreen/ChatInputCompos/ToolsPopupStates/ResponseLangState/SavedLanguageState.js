import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { moderateScale, scaleFont } from "../../../../../utils/responsive";
import { setLanguages } from "../../../../../data/datas";
import { setSelectedLanguage, setToggleToolsPopup } from "../../../../../redux/slices/toggleSlice";

const SavedLanguageState = () => {
  const [selectedStyle, setSelectedStyle] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { chatCustomisationStates } = useSelector((state) => state.Toggle);

  // Initialize from Redux state
  useEffect(() => {
    if (chatCustomisationStates?.selectedLanguage?.name) {
      const index = setLanguages.findIndex(
        (lang) => lang.lang === chatCustomisationStates.selectedLanguage.name
      );
      if (index !== -1) {
        setSelectedStyle(index);
      }
    } else {
      setSelectedStyle(0); // Default to English
    }
  }, [chatCustomisationStates?.selectedLanguage]);

  // Handle language selection
  const handleLanguageSelection = (language, index) => {
    setSelectedStyle(index);

    const selectedData = {
      id: index === 0 ? null : index, // null for English (default)
      name: language.lang,
    };

    dispatch(setSelectedLanguage(selectedData));
  };
  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <>
      {/* Title */}
      <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>Response Language</Text>
      {/* Description */}
      <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
        Choose your response language — ideal for bilinguals or fluent speakers.
      </Text>

      <View style={styles.langContainer}>
        {setLanguages.map((langs, langIndex) => {
          return (
            <TouchableOpacity
              key={langIndex}
              onPress={() => handleLanguageSelection(langs, langIndex)}
              style={styles.langsMain}
            >
              <Text style={{fontFamily:"Mukta-Regular",fontSize:scaleFont(15)}}>{langs.lang}</Text>
              <RadioButton selected={selectedStyle === langIndex} />
            </TouchableOpacity>
          );
        })}
      </View>
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
              <Pressable
                style={{borderBottomWidth:2}}
                onPress={() => {
                  dispatch(setToggleToolsPopup(false));
                  navigation.navigate("settingsInnerPages", { page: 0 });
                }}
              >
                <Text style={{
                  fontSize: moderateScale(13),
                  lineHeight:15,
                  fontWeight: 600,
                  textAlign: "center",
                  fontFamily: "Mukta-Bold",
                }}>Settings</Text>
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
