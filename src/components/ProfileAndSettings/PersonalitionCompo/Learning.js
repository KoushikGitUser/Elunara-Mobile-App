import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { scaleFont } from "../../../utils/responsive";
import DeskMobIcon from "../../../../assets/SvgIconsComponent/PersonalisationIcons/DeskMobIcon";
import { ChevronDown } from "lucide-react-native";
import EducationDropDowns from "./EducationDropDowns";
import { internetQuality } from "../../../data/datas";

const Learning = () => {
  const [primaryDevice, setPrimaryDevice] = useState(null);
  const [groupStudyPreference, setGroupStudyPreference] = useState(null);
  const [quietPlacePreference, setQuietPlacePreference] = useState(null);
  const RadioButton = ({ label, selected, onPress }) => {
    return (
      <TouchableOpacity
        style={styles.radioContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View
          style={[styles.radioCircle, selected && styles.radioCircleSelected]}
        >
          {selected && <View style={styles.radioInnerCircle} />}
        </View>
        <Text style={styles.radioLabel}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <DeskMobIcon />
          <Text style={styles.title}>Learning & Device Preferences</Text>
        </View>
        <Text style={styles.subtitle}>
          Share details so we can tailor the best experience for any technical
          limitations you might have
        </Text>
      </View>

      <View style={[styles.inputSection, { width: "100%", marginTop: 35 }]}>
        <Text style={styles.inputLabel}>Internet connection Quality</Text>
        <EducationDropDowns
          dataArray={internetQuality}
          placeholder="Select internet quality...."
        />
      </View>
      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <Text style={styles.question}>Primary Device used</Text>

        <View style={styles.optionsContainer}>
          <RadioButton
            label="Mobile"
            selected={primaryDevice === "Mobile"}
            onPress={() => setPrimaryDevice("Mobile")}
          />
          <RadioButton
            label="Laptop"
            selected={primaryDevice === "Laptop"}
            onPress={() => setPrimaryDevice("Laptop")}
          />
          <RadioButton
            label="Tablet"
            selected={primaryDevice === "Tablet"}
            onPress={() => setPrimaryDevice("Tablet")}
          />
        </View>
      </View>
      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <Text style={styles.question}>Do you prefer group study?</Text>

        <View style={styles.optionsContainer}>
          <RadioButton
            label="Yes"
            selected={groupStudyPreference === "Yes"}
            onPress={() => setGroupStudyPreference("Yes")}
          />
          <RadioButton
            label="No"
            selected={groupStudyPreference === "No"}
            onPress={() => setGroupStudyPreference("No")}
          />
          <RadioButton
            label="Sometimes"
            selected={groupStudyPreference === "Sometimes"}
            onPress={() => setGroupStudyPreference("Sometimes")}
          />
        </View>
      </View>
      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <Text style={styles.question}>Do you have a quiet place to study</Text>

        <View style={styles.optionsContainer}>
          <RadioButton
            label="Yes"
            selected={quietPlacePreference === "Yes"}
            onPress={() => setQuietPlacePreference("Yes")}
          />
          <RadioButton
            label="No"
            selected={quietPlacePreference === "No"}
            onPress={() => setQuietPlacePreference("No")}
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
    fontSize: scaleFont(18),
    fontWeight: "600",
    color: "#1F2937",
    fontFamily:"Mukta-Bold",
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: scaleFont(14),
    color: "#757575",
    marginTop: 10,
    fontFamily:"Mukta-Regular",
        lineHeight:20,
  },
  fullnameInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  inputSection: {
    marginBottom: 15,
    marginTop: 10,
    width: "48%",
  },
  inputLabel: {
    fontSize: scaleFont(12),
    fontWeight: "400",
    color: "#5E5E5E",
    marginBottom: 8,
    fontFamily:"Mukta-Regular",
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
    height: 150,
  },
  inputText: {
    backgroundColor: "#FFFFFF",
    fontSize: scaleFont(10),
    color: "#1F2937",
    letterSpacing: 0.2,
  },
  question: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    color: "#1A1A1A",
    lineHeight: 42,
    marginBottom: 20,
    fontFamily:"Mukta-Bold",
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 30,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#B8C1D9",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  radioCircleSelected: {
    borderColor: "#000000ff",
    borderWidth: 2,
    backgroundColor: "#ffffffff",
  },
  radioInnerCircle: {
    width: 14,
    height: 14,
    borderRadius: 10,
    backgroundColor: "#000000ff",
  },
  radioLabel: {
    fontSize: scaleFont(14),
    fontWeight: "400",
    color: "#1A1A1A",
   fontFamily:"Mukta-Regular",
  },
});

export default Learning;
