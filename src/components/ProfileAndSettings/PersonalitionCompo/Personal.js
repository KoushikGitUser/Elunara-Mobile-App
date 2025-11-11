import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Calendar, ChevronDown, UserRound } from "lucide-react-native";
import { scaleFont } from "../../../utils/responsive";

const Personal = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <UserRound strokeWidth={1.25} />
          <Text style={styles.title}>Personal Information</Text>
        </View>
        <Text style={styles.subtitle}>
          Customise your basic details to shape a learning experience unique to
          you
        </Text>
      </View>
      <View style={styles.fullnameInput}>
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Birthday</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              placeholder="dd/mm/yy"
              placeholderTextColor="#9CA3AF"
              returnKeyType="done"
            />
            <TouchableOpacity>
              <Calendar strokeWidth={1.25} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Gender</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              placeholder="Select Gender"
              placeholderTextColor="#9CA3AF"
              returnKeyType="done"
            />
            <TouchableOpacity>
              <ChevronDown size={30} strokeWidth={1.25} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[styles.inputSection, { width: "100%" }]}>
        <Text style={styles.inputLabel}>Hobbies</Text>
        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
            placeholder="e.g., Reading, hiking, painting..."
            placeholderTextColor="#9CA3AF"
            returnKeyType="done"
          />
        </View>
      </View>
      <View style={[styles.inputSection, { width: "100%" }]}>
        <Text style={styles.inputLabel}>About You</Text>
        <View style={styles.inputLarge}>
          <TextInput
            style={styles.inputText}
            placeholder="Share your dream career, ambitions, or anything else you'd like us to know about you..."
            placeholderTextColor="#9CA3AF"
            returnKeyType="done"
            multiline
            textAlignVertical="top"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: scaleFont(17),
    fontWeight: "600",
    color: "#1F2937",
    letterSpacing: -0.5,
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: scaleFont(13),
    color: "#6B7280",
    marginTop: 10,
  },
  fullnameInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 25,
  },
  inputSection: {
    marginBottom: 20,
    marginTop: 10,
    width: "48%",
  },
  inputLabel: {
    fontSize: scaleFont(10),
    fontWeight: "400",
    color: "#5E5E5E",
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#1F2937",
    letterSpacing: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  inputLarge: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#1F2937",
    letterSpacing: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    height:150
  },
  inputText: {
    backgroundColor: "#FFFFFF",
    fontSize: scaleFont(10),
    color: "#1F2937",
    letterSpacing: 0.2,
  },
});

export default Personal;
