import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { scaleFont } from "../../../utils/responsive";
import DeskMobIcon from "../../../../assets/SvgIconsComponent/PersonalisationIcons/DeskMobIcon";
import { ChevronDown } from "lucide-react-native";
import EducationDropDowns from "./EducationDropDowns";
import { internetQuality } from "../../../data/datas";
import { useDispatch, useSelector } from "react-redux";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";

const Learning = () => {
  const dispatch = useDispatch();
  const { settingsStates } = useSelector((state) => state.API);
  const learningDevices = settingsStates.allPersonalisationsSettings.learningDevices;

  const [primaryDevice, setPrimaryDevice] = useState(null);
  const [groupStudyPreference, setGroupStudyPreference] = useState(null);
  const [quietPlacePreference, setQuietPlacePreference] = useState(null);

  // Initialize values from API
  useEffect(() => {
    console.log("=== LEARNING DEVICES DEBUG ===");
    console.log("Full learningDevices object:", JSON.stringify(learningDevices, null, 2));
    console.log("primary_device:", learningDevices.primary_device);
    console.log("prefers_group_study:", learningDevices.prefers_group_study);
    console.log("has_quiet_study_place:", learningDevices.has_quiet_study_place);
    console.log("internet_quality:", learningDevices.internet_quality);
    console.log("=== END DEBUG ===");

    if (learningDevices.primary_device !== null && learningDevices.primary_device !== undefined && learningDevices.primary_device !== "") {
      // Capitalize first letter for display (API returns lowercase)
      const device = learningDevices.primary_device;
      const capitalizedDevice = device.charAt(0).toUpperCase() + device.slice(1);
      setPrimaryDevice(capitalizedDevice);
    }
    if (learningDevices.prefers_group_study !== null && learningDevices.prefers_group_study !== undefined && learningDevices.prefers_group_study !== "") {
      // Capitalize first letter for display (API returns lowercase)
      const study = learningDevices.prefers_group_study;
      const capitalizedStudy = study.charAt(0).toUpperCase() + study.slice(1);
      setGroupStudyPreference(capitalizedStudy);
    }
    if (learningDevices.has_quiet_study_place !== null && learningDevices.has_quiet_study_place !== undefined) {
      setQuietPlacePreference(learningDevices.has_quiet_study_place);
    }
  }, [learningDevices]);

  const updateLearningDevices = (dataKey, value) => {
    const data = {
      [dataKey]: value,
    };
    const payload = {
      method: "PUT",
      url: "/settings/personalization",
      data,
      name: "updatePersonalizationSettings",
    };
    console.log("=== UPDATE LEARNING DEVICES ===");
    console.log("Updating key:", dataKey);
    console.log("Updating value:", value);
    console.log("Full payload:", JSON.stringify(payload, null, 2));
    console.log("=== END UPDATE ===");
    dispatch(commonFunctionForAPICalls(payload))
      .then((response) => {
        console.log("=== UPDATE RESPONSE ===");
        console.log("Response for", dataKey, ":", JSON.stringify(response, null, 2));
        console.log("=== END RESPONSE ===");
      })
      .catch((error) => {
        console.log("=== UPDATE ERROR ===");
        console.log("Error for", dataKey, ":", error);
        console.log("=== END ERROR ===");
      });
  };

  const updateInternetQuality = (value) => updateLearningDevices("internet_quality", value.toLowerCase());

  const handlePrimaryDeviceChange = (value) => {
    setPrimaryDevice(value);
    updateLearningDevices("primary_device", value.toLowerCase());
  };

  const handleGroupStudyChange = (value) => {
    setGroupStudyPreference(value);
    updateLearningDevices("prefers_group_study", value.toLowerCase());
  };

  const handleQuietPlaceChange = (value) => {
    setQuietPlacePreference(value);
    updateLearningDevices("has_quiet_study_place", value);
  };

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
          triggerAPICall={updateInternetQuality}
          initialValue={settingsStates.allPersonalisationsSettings.learningDevices.internet_quality}
        />
      </View>
      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <Text style={styles.question}>Primary Device used</Text>

        <View style={styles.optionsContainer}>
          <RadioButton
            label="Mobile"
            selected={primaryDevice === "Mobile"}
            onPress={() => handlePrimaryDeviceChange("Mobile")}
          />
          <RadioButton
            label="Laptop"
            selected={primaryDevice === "Laptop"}
            onPress={() => handlePrimaryDeviceChange("Laptop")}
          />
          <RadioButton
            label="Tablet"
            selected={primaryDevice === "Tablet"}
            onPress={() => handlePrimaryDeviceChange("Tablet")}
          />
        </View>
      </View>
      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <Text style={styles.question}>Do you prefer group study?</Text>

        <View style={styles.optionsContainer}>
          <RadioButton
            label="Yes"
            selected={groupStudyPreference === "Yes"}
            onPress={() => handleGroupStudyChange("Yes")}
          />
          <RadioButton
            label="No"
            selected={groupStudyPreference === "No"}
            onPress={() => handleGroupStudyChange("No")}
          />
          <RadioButton
            label="Sometimes"
            selected={groupStudyPreference === "Sometimes"}
            onPress={() => handleGroupStudyChange("Sometimes")}
          />
        </View>
      </View>
      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <Text style={styles.question}>Do you have a quiet place to study</Text>

        <View style={styles.optionsContainer}>
          <RadioButton
            label="Yes"
            selected={quietPlacePreference === true}
            onPress={() => handleQuietPlaceChange(true)}
          />
          <RadioButton
            label="No"
            selected={quietPlacePreference === false}
            onPress={() => handleQuietPlaceChange(false)}
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
    marginBottom: 5,
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
