import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { scaleFont } from "../../../../../utils/responsive";

const LLMCards = ({icon,title,useFor,badgeText,optionsIndex,setSelectedStyle,selectedStyle}) => {

  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <TouchableOpacity
      key={optionsIndex}
      style={[
        styles.card,
        {
          backgroundColor: selectedStyle == optionsIndex ? "#EEF4FF" : "white",
          borderColor: selectedStyle == optionsIndex ? "black" : "#D3DAE5",
        },
      ]}
      onPress={() => setSelectedStyle(optionsIndex)}
      activeOpacity={0.7}
    >
      <View style={styles.contentMain}>
        <View style={styles.iconContainer}>
          <Image source={icon} style={{ height: 23, width: 23 }} />
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.optionTitle,
              {
                fontSize: scaleFont(18),
                fontWeight: 600,
                fontFamily: "Mukta-Bold",
              },
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.optionDescription,
              {
                fontSize: scaleFont(14),
                fontWeight: 400,
                color: "#8F8F8F",
                fontFamily: "Mukta-Regular",
              },
            ]}
          >
            {useFor}
          </Text>
            <View style={styles.buttonContainer}>
              <Text
                style={{
                  fontSize: scaleFont(12.5),
                  fontWeight: 400,
                  color: "#8F8F8F",
                  fontFamily: "Mukta-Regular",
                }}
              >
                {badgeText}
              </Text>
            </View>
        </View>
      </View>
      <RadioButton selected={selectedStyle === optionsIndex} />
    </TouchableOpacity>
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
    fontSize: scaleFont(26),
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(14),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    letterSpacing: 0.2,
  },
  optionsMain: {
    flexDirection: "column",
    gap: 25,
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "#F3F3F3",
    width: "auto",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(11),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  card: {
    borderWidth: 1,
    borderColor: "#D3DAE5",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: "white",
    marginBottom:20
  },
  contentMain: {
    flexDirection: "row",
    gap: 10,
    width: "85%",
    alignItems: "flex-start",
  },
  textContainer: {
    flexDirection: "column",
    gap: 1,
    alignItems: "flex-start",
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

export default LLMCards;
