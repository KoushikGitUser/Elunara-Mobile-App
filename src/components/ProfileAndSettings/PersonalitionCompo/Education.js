import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";
import { scaleFont } from "../../../utils/responsive";
import { appColors } from "../../../themes/appColors";
import { ChevronDown, UserRound } from "lucide-react-native";
import BriefCaseIcon from "../../../../assets/SvgIconsComponent/PersonalisationIcons/BriefCaseIcon";
import EducationDropDowns from "./EducationDropDowns";
import {
  currentUniversity,
  degreeProgram,
  semester,
  specialization,
} from "../../../data/datas";

const Education = () => {
  const [selectedOption, setSelectedOption] = useState("No");
  const [skillGapsFocused, setSkillGapsFocused] = useState(false);
  const [skillGapsText, setSkillGapsText] = useState("");
  const dispatch = useDispatch();
  const { settingsStates } = useSelector((state) => state.API);

  useEffect(() => {
    const universitiesPayload = {
      method: "GET",
      url: "/master/universities",
      name: "getAllUniversitiesAvailable",
    };
    const degreeProgramsPayload = {
      method: "GET",
      url: "/master/degree-programs",
      name: "getAllDegreeProgramsAvailable",
    };
    const specializationsPayload = {
      method: "GET",
      url: "/master/specialisations",
      name: "getAllSpecializationsAvailable",
    };
    dispatch(commonFunctionForAPICalls(universitiesPayload));
    dispatch(commonFunctionForAPICalls(degreeProgramsPayload));
    dispatch(commonFunctionForAPICalls(specializationsPayload));
  }, []);

  useEffect(() => {
    const isWorking = settingsStates.allPersonalisationsSettings.academicCareer.is_working_alongside_studies;
    if (isWorking !== undefined && isWorking !== null) {
      setSelectedOption(isWorking ? "Yes" : "No");
    }
  }, [settingsStates.allPersonalisationsSettings.academicCareer.is_working_alongside_studies]);

  useEffect(() => {
    setSkillGapsText(
      settingsStates.allPersonalisationsSettings.academicCareer.skills_to_develop
    );
  }, [settingsStates.allPersonalisationsSettings.academicCareer.skills_to_develop]);

  const updateAcademicCareer = (dataKey, id) => {
    const data = {
      [dataKey]: id,
    };
    const payload = {
      method: "PUT",
      url: "/settings/personalization",
      data,
      name: "updatePersonalizationSettings",
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  const updateUniversity = (id) => updateAcademicCareer("university_id", id);
  const updateDegreeProgram = (id) => updateAcademicCareer("degree_program_id", id);
  const updateSemester = (id) => updateAcademicCareer("semester", id);
  const updateSpecialization = (id) => updateAcademicCareer("specialisation_id", id);
  const updateIsWorkingAlongsideStudies = (value) => updateAcademicCareer("is_working_alongside_studies", value);

  const handleWorkingOptionChange = (option) => {
    setSelectedOption(option);
    updateIsWorkingAlongsideStudies(option === "Yes");
  };

  const updateSkillGaps = useCallback((skillGaps) => {
    const data = {
      skills_to_develop: skillGaps,
    };
    const payload = {
      method: "PUT",
      url: "/settings/personalization",
      data,
      name: "updatePersonalizationSettings",
    };
    dispatch(commonFunctionForAPICalls(payload));
  }, [dispatch]);

  // Debounce timer ref
  const skillGapsDebounceRef = useRef(null);

  // Debounced skill gaps update
  useEffect(() => {
    // Skip initial render / when skillGapsText matches stored value
    const storedSkillGaps = settingsStates.allPersonalisationsSettings.academicCareer.key_skill_gaps;
    if (skillGapsText === storedSkillGaps) return;

    // Clear previous timer
    if (skillGapsDebounceRef.current) {
      clearTimeout(skillGapsDebounceRef.current);
    }

    // Set new timer
    skillGapsDebounceRef.current = setTimeout(() => {
      updateSkillGaps(skillGapsText);
    }, 500);

    // Cleanup on unmount or when skillGapsText changes
    return () => {
      if (skillGapsDebounceRef.current) {
        clearTimeout(skillGapsDebounceRef.current);
      }
    };
  }, [skillGapsText, updateSkillGaps, settingsStates.allPersonalisationsSettings.academicCareer.skills_to_develop]);

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
    <View style={{ flex: 1,paddingBottom:100}}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <BriefCaseIcon />
          <Text style={styles.title}>Academic & Career Details</Text>
        </View>
        <Text style={styles.subtitle}>
          Highlight your academic and career background to receive tailored
          resources and opportunities
        </Text>
      </View>
      <View style={[styles.inputSection, { width: "100%", marginTop: 30 }]}>
        <Text style={styles.inputLabel}>Current University</Text>
        <EducationDropDowns
          dataArray={settingsStates.settingsMasterDatas.allUniversitiesAvailable}
          placeholder="Select current university"
          triggerAPICall={updateUniversity}
          initialValue={settingsStates.allPersonalisationsSettings.academicCareer.university}
        />
      </View>
      <View style={styles.fullnameInput}>
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Degree Program</Text>
          <EducationDropDowns
            dataArray={settingsStates.settingsMasterDatas.allDegreeProgramsAvailable}
            placeholder="Select degree"
            triggerAPICall={updateDegreeProgram}
            initialValue={settingsStates.allPersonalisationsSettings.academicCareer.degree_program}
          />
        </View>
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Semester</Text>
          <EducationDropDowns
            dataArray={semester}
            placeholder="Select semester"
            triggerAPICall={updateSemester}
            initialValue={settingsStates.allPersonalisationsSettings.academicCareer.semester}
          />
        </View>
      </View>
      <View style={[styles.inputSection, { width: "100%", marginTop: 15 }]}>
        <Text style={styles.inputLabel}>Specialisation</Text>
        <EducationDropDowns
          dataArray={settingsStates.settingsMasterDatas.allSpecializationsAvailable}
          placeholder="Select specialisation..."
          triggerAPICall={updateSpecialization}
          initialValue={settingsStates.allPersonalisationsSettings.academicCareer.specialisation}
        />
      </View>
      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <Text style={styles.question}>
          Are you currently working alongside your studies?
        </Text>

        <View style={styles.optionsContainer}>
          <RadioButton
            label="Yes"
            selected={selectedOption === "Yes"}
            onPress={() => handleWorkingOptionChange("Yes")}
          />
          <RadioButton
            label="No"
            selected={selectedOption === "No"}
            onPress={() => handleWorkingOptionChange("No")}
          />
        </View>
      </View>

      <View style={[styles.inputSection, { width: "100%", marginTop: 15 }]}>
        <Text style={styles.inputLabel}>
          Key Skill Gaps You Want to Address
        </Text>
        <View style={[styles.input, skillGapsFocused && { borderColor: appColors.navyBlueShade }]}>
          <TextInput
            style={[styles.inputText, { width: "100%" }]}
            placeholder="e.g., Data analysis, public speaking, coding..."
            value={skillGapsText}
            onChangeText={setSkillGapsText}
            placeholderTextColor="#9CA3AF"
            returnKeyType="done"
            onFocus={() => setSkillGapsFocused(true)}
            onBlur={() => setSkillGapsFocused(false)}
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
    paddingVertical: 0,
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
    paddingVertical: 0,
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
    fontSize: scaleFont(14),
    color: "#1F2937",
    fontFamily:"Mukta-Regular",
  },
  question: {
    fontSize: scaleFont(14),
    color: "#1A1A1A",
    lineHeight: 42,
    marginBottom: 20,
  fontFamily:"Mukta-Bold",
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 60,
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
    marginRight: 16,
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

export default Education;
