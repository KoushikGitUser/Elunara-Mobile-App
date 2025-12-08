import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { moderateScale, scaleFont } from "../../../../../utils/responsive";
import { setLanguages } from "../../../../../data/datas";

const SavedLang = () => {
  const [selectedStyle, setSelectedStyle] = useState(0);
  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <>
      <View style={styles.langContainer}>
        <View style={styles.currentLLMMain}>
          <Text style={styles.currentResponse}>Current Response Language</Text>

          <TouchableOpacity style={styles.badge}>
            <Text style={styles.btnText}>English</Text>
          </TouchableOpacity>
        </View>
        {setLanguages.map((langs, langIndex) => {
          if (langs.lang !== "English") {
            return (
              <TouchableOpacity
                key={langIndex}
                onPress={() => setSelectedStyle(langIndex)}
                style={styles.langsMain}
              >
                <Text
                  style={{
                    fontFamily: "Mukta-Regular",
                    fontSize: scaleFont(15),
                  }}
                >
                  {langs.lang}
                </Text>
                <RadioButton selected={selectedStyle === langIndex} />
              </TouchableOpacity>
            );
          }
        })}
      </View>
            {/* Button */}
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: "#081A35",
          },
        ]}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, { fontFamily: "Mukta-Regular" }]}>
          Update Response Language
        </Text>
      </TouchableOpacity>
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
