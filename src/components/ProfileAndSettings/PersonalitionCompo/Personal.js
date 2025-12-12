import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar, ChevronDown, UserRound } from "lucide-react-native";
import { scaleFont } from "../../../utils/responsive";
import DateTimePicker from "@react-native-community/datetimepicker";
import GenderDropdown from "./GenderDropdown";

const Personal = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height); // <-- set height
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
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
          <View style={[styles.input,{height:50,paddingVertical:5}]}>
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
          <GenderDropdown />
        </View>
      </View>
      <View style={[styles.inputSection, { width: "100%" }]}>
        <Text style={styles.inputLabel}>Hobbies</Text>
        <View style={styles.input}>
          <TextInput
            style={[styles.inputText, { width: "100%" }]}
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
    fontFamily:"Mukta-Regular",
  },
});

export default Personal;
