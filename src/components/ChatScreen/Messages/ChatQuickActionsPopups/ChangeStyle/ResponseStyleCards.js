import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { scaleFont, verticalScale } from "../../../../../utils/responsive";
const screenHeight = Dimensions.get("window").height;

const ResponseStyleCards = ({ item,setSelectedStyle,selectedStyle }) => {
  const dispatch = useDispatch();

  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: selectedStyle == item.id ? "#EEF4FF" : "white",
          borderColor: selectedStyle == item.id ? "black" : "#D3DAE5",
        },
      ]}
      onPress={() => setSelectedStyle(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.contentMain}>
        <View style={styles.iconContainer}>{item.icon}</View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.optionTitle,
              {
                fontSize: scaleFont(18),
                fontWeight: 600,
                fontFamily: "Mukta-Bold",
                lineHeight:27
              },
            ]}
          >
            {item.title}
          </Text>
          <Text
            style={[
              styles.optionDescription,
              {
                fontSize: scaleFont(14),
                fontWeight: 400,
                color: "#8F8F8F",
                fontFamily: "Mukta-Regular",
                lineHeight:18
              },
            ]}
          >
            {item.description}
          </Text>
        </View>
      </View>

      <RadioButton selected={selectedStyle === item.id} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    maxHeight: screenHeight * 0.55,
    flexDirection: "column",
  },
  card: {
    borderWidth: 1,
    borderColor: "#D3DAE5",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: "white",
    marginBottom: 20,
  },
  contentMain: {
    flexDirection: "row",
    gap: 10,
    width: "85%",
    alignItems: "flex-start",
  },
  textContainer: {
    flexDirection: "column",
    gap: 5,
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
  iconContainer: {
    marginTop: 5,
  },
});

export default ResponseStyleCards;
