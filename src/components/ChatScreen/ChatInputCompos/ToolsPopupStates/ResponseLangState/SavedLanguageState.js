import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { moderateScale, scaleFont } from "../../../../../utils/responsive";
import { setLanguages } from "../../../../../data/datas";

const SavedLanguageState = () => {
  const [selectedStyle, setSelectedStyle] = useState(0);
  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <>
      {/* Title */}
      <Text style={styles.title}>Response Language</Text>
      {/* Description */}
      <Text style={styles.description}>
        Choose your response language — ideal for bilinguals or fluent speakers.
      </Text>

      <View style={styles.langContainer}>
        {setLanguages.map((langs, langIndex) => {
          return (
            <TouchableOpacity
              onPress={() => setSelectedStyle(langIndex)}
              style={styles.langsMain}
            >
              <Text>{langs.lang}</Text>
              <RadioButton selected={selectedStyle === langIndex} />
            </TouchableOpacity>
          );
        })}
      </View>
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
    </>
  );
};

const styles = StyleSheet.create({
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
