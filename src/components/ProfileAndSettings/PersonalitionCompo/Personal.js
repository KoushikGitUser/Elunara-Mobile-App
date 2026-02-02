import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Calendar, ChevronDown, UserRound } from "lucide-react-native";
import { scaleFont } from "../../../utils/responsive";
import DateTimePicker from "@react-native-community/datetimepicker";
import GenderDropdown from "./GenderDropdown";
import { appColors } from "../../../themes/appColors";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";
import { useDispatch, useSelector } from "react-redux";

const Personal = ({ scrollViewRef }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hobbiesFocused, setHobbiesFocused] = useState(false);
  const [aboutFocused, setAboutFocused] = useState(false);
  const [hobbiesText, setHobbiesText] = useState("");
  const [aboutText, setAboutText] = useState("");
  const dispatch = useDispatch();
  const { settingsStates } = useSelector((state) => state.API);

  useEffect(() => {
    setHobbiesText(
      settingsStates.allPersonalisationsSettings.personalInfos.hobbies
    );
    setAboutText(
      settingsStates.allPersonalisationsSettings.personalInfos.about
    );

    // Initialize birthday from stored settings
    const storedBirthday = settingsStates.allPersonalisationsSettings.personalInfos.birthday;
    if (storedBirthday) {
      setDate(new Date(storedBirthday));
    }
  }, [
    settingsStates.allPersonalisationsSettings.personalInfos.hobbies,
    settingsStates.allPersonalisationsSettings.personalInfos.about,
    settingsStates.allPersonalisationsSettings.personalInfos.birthday,
  ]);

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);

      // Format date to YYYY-MM-DD
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      // Update birthday in backend
      updateUserBirthday(formattedDate);
    }
  };

  const updateUserGender = (id) => {
    const data = {
      gender_id: id,
    };
    const payload = {
      method: "PUT",
      url: "/settings/personalization",
      data,
      name: "updatePersonalizationSettings",
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  const updateUserHobbies = useCallback((hobbies) => {
    const data = {
      hobbies: hobbies,
    };
    const payload = {
      method: "PUT",
      url: "/settings/personalization",
      data,
      name: "updatePersonalizationSettings",
    };
    dispatch(commonFunctionForAPICalls(payload));
  }, [dispatch]);

  const updateUserAbout = useCallback((about) => {
    const data = {
      about: about,
    };
    const payload = {
      method: "PUT",
      url: "/settings/personalization",
      data,
      name: "updatePersonalizationSettings",
    };
    dispatch(commonFunctionForAPICalls(payload));
  }, [dispatch]);

  const updateUserBirthday = (birthday) => {
    const data = {
      birthday: birthday,
    };
    const payload = {
      method: "PUT",
      url: "/settings/personalization",
      data,
      name: "updatePersonalizationSettings",
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  // Debounce timer refs
  const hobbiesDebounceRef = useRef(null);
  const aboutDebounceRef = useRef(null);
  const bottomRef = useRef(null);

  // Debounced hobbies update
  useEffect(() => {
    // Skip initial render / when hobbiesText matches stored value
    const storedHobbies = settingsStates.allPersonalisationsSettings.personalInfos.hobbies;
    if (hobbiesText === storedHobbies) return;

    // Clear previous timer
    if (hobbiesDebounceRef.current) {
      clearTimeout(hobbiesDebounceRef.current);
    }

    // Set new timer - 1 second delay after user stops typing
    hobbiesDebounceRef.current = setTimeout(() => {
      updateUserHobbies(hobbiesText);
    }, 1000);

    // Cleanup on unmount or when hobbiesText changes
    return () => {
      if (hobbiesDebounceRef.current) {
        clearTimeout(hobbiesDebounceRef.current);
      }
    };
  }, [hobbiesText, updateUserHobbies, settingsStates.allPersonalisationsSettings.personalInfos.hobbies]);

  // Debounced about update
  useEffect(() => {
    // Skip initial render / when aboutText matches stored value
    const storedAbout = settingsStates.allPersonalisationsSettings.personalInfos.about;
    if (aboutText === storedAbout) return;

    // Clear previous timer
    if (aboutDebounceRef.current) {
      clearTimeout(aboutDebounceRef.current);
    }

    // Set new timer - 1 second delay after user stops typing
    aboutDebounceRef.current = setTimeout(() => {
      updateUserAbout(aboutText);
    }, 1000);

    // Cleanup on unmount or when aboutText changes
    return () => {
      if (aboutDebounceRef.current) {
        clearTimeout(aboutDebounceRef.current);
      }
    };
  }, [aboutText, updateUserAbout, settingsStates.allPersonalisationsSettings.personalInfos.about]);

  const scrollToAbout = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 150);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <UserRound color="#888888" strokeWidth={1.75} />
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
          <View style={[styles.input, { height: 50, paddingVertical: 5 }]}>
            {/* <TextInput
              style={styles.inputText}
              placeholder="dd/mm/yy"
              placeholderTextColor="#9CA3AF"
              returnKeyType="done"
            /> */}
            <Text style={[styles.inputText, { color: "#a1a1a1ff" }]}>
              {date.toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Calendar size={23} strokeWidth={1.25} />
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="calendar" // spinner | calendar | default
              onChange={onChange}
            />
          )}
        </View>
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Gender</Text>
          {/* <View style={styles.input}>
             <Text style={styles.inputText}>
              Select Gender
            </Text>
            <TouchableOpacity>
              <ChevronDown size={30} strokeWidth={1.25} />
            </TouchableOpacity>
          </View> */}
          <GenderDropdown triggerAPICall={updateUserGender} />
        </View>
      </View>
      <View style={[styles.inputSection, { width: "100%" }]}>
        <Text style={styles.inputLabel}>Hobbies</Text>
        <View
          style={[
            styles.input,
            hobbiesFocused && { borderColor: appColors.navyBlueShade },
          ]}
        >
          <TextInput
            style={[styles.inputText, { width: "100%" }]}
            placeholder="e.g., Reading, hiking, painting..."
            value={hobbiesText}
            onChangeText={setHobbiesText}
            placeholderTextColor="#9CA3AF"
            returnKeyType="done"
            onFocus={() => setHobbiesFocused(true)}
            onBlur={() => setHobbiesFocused(false)}
          />
        </View>
      </View>
      <View style={[styles.inputSection, { width: "100%" }]}>
        <Text style={styles.inputLabel}>About You</Text>
        <View
          style={[
            styles.inputLarge,
            aboutFocused && { borderColor: appColors.navyBlueShade },
          ]}
        >
          <TextInput
            value={aboutText}
            onChangeText={setAboutText}
            style={styles.inputText}
            placeholder="Share your dream career, ambitions, or anything else you'd like us to know about you..."
            placeholderTextColor="#9CA3AF"
            returnKeyType="done"
            multiline
            textAlignVertical="top"
            onFocus={() => {
              setAboutFocused(true);
              scrollToAbout();
            }}
            onBlur={() => setAboutFocused(false)}
          />
        </View>
      </View>
      {/* Empty view for spacing when About is focused */}
      <View ref={bottomRef} style={{ height: 50 }} />
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
    fontFamily: "Mukta-Bold",
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: scaleFont(14),
    color: "#757575",
    marginTop: 10,
    fontFamily: "Mukta-Regular",
    lineHeight: 20,
  },
  fullnameInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 25,
  },
  inputSection: {
    marginBottom: 20,
    marginTop: 10,
    width: "48%",
  },
  inputLabel: {
    fontSize: scaleFont(12),
    fontWeight: "400",
    color: "#5E5E5E",
    marginBottom: 8,
    fontFamily: "Mukta-Regular",
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
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "black",
  },
});

export default Personal;
