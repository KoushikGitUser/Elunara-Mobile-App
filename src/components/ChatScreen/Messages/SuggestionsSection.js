import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { scaleFont } from "../../../utils/responsive";

const SuggestionsSection = ({ suggestions, onSuggestionPress }) => {
  // Only display if suggestions are provided
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        To help you take this further, here are a few directions you might explore next:
      </Text>

      <View style={styles.suggestionsContainer}>
        {suggestions.map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            style={styles.suggestionCard}
            onPress={() => onSuggestionPress && onSuggestionPress(suggestion)}
            activeOpacity={0.7}
          >
            <Text style={styles.suggestionText}>{suggestion}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
    paddingTop: 24,
    paddingBottom: 24,
    marginTop: 5,
  },
  headerText: {
    fontSize: scaleFont(16),
    fontWeight: "400",
    color: "#1F2937",
    fontFamily: "Mukta-Regular",
    lineHeight: 26,
    marginBottom: 20,
  },
  suggestionsContainer: {
    flexDirection: "column",
    gap: 14,
  },
  suggestionCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#1F2937",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  suggestionText: {
    fontSize: scaleFont(15),
    fontWeight: "500",
    color: "#1F2937",
    fontFamily: "Mukta-Medium",
    lineHeight: 24,
  },
});

export default SuggestionsSection;
