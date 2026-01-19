import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moderateScale, scaleFont } from "../../../../../utils/responsive";
import LanguageDropdown from "./LanguageDropdown";
import { languages } from "../../../../../data/datas";
import { setTempRoomProperty } from "../../../../../redux/slices/apiCommonSlice";
const screenHeight = Dimensions.get("window").height;

const FirstLanguageSetState = ({ setIsLanguageSaved }) => {
  const dispatch = useDispatch();
  const { roomsStates } = useSelector((state) => state.API);

  // Initialize with current selection if available
  const initialSelection =
    roomsStates.tempRoomSettings?.response_language_id !== null &&
    roomsStates.tempRoomSettings?.response_language_id !== undefined
      ? [(roomsStates.tempRoomSettings.response_language_id - 1).toString()]
      : [];

  const [selectedCounts, setSelectedCounts] = useState(initialSelection);

  const updateSelection = (index, itemId) => {
    const newCounts = [...selectedCounts];
    newCounts[index] = itemId;
    setSelectedCounts(newCounts);
  };

  const handleSave = () => {
    if (selectedCounts.length > 0) {
      dispatch(
        setTempRoomProperty({
          key: "response_language_id",
          value: Number(selectedCounts[0]) + 1, // Map 0 -> 1, 1 -> 2
        })
      );
    }
    setIsLanguageSaved(true);
  };

  return (
    <>
      {/* Title */}
      <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>
        Set Response Language
      </Text>
      {/* Description */}
      <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
        Choose up to 3 languages to toggle between. Update anytime in Settings.
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollableContent}
      >
        <Text
          style={{
            fontSize: moderateScale(12),
            color: "#5E5E5E",
            marginTop: 40,
            fontFamily: "Mukta-Regular",
          }}
        >
          Default Language
        </Text>
        <LanguageDropdown
          selectedId={selectedCounts[0]}
          onSelect={(item) => updateSelection(0, item.id)}
        />
        <Text
          style={{
            textAlign: "center",
            color: "#757575",
            fontSize: scaleFont(13),
            paddingTop: 15,
            fontFamily: "Mukta-Regular",
          }}
        >
          Select 2 more
        </Text>
        <Text
          style={{
            fontSize: moderateScale(12),
            color: "#5E5E5E",
            marginTop: 40,
            fontFamily: "Mukta-Regular",
          }}
        >
          Language 2
        </Text>
        <LanguageDropdown
          selectedId={selectedCounts[1]}
          onSelect={(item) => updateSelection(1, item.id)}
        />
        <Text
          style={{
            fontSize: moderateScale(12),
            color: "#5E5E5E",
            marginTop: 40,
            fontFamily: "Mukta-Regular",
          }}
        >
          Language 3
        </Text>
        <LanguageDropdown
          selectedId={selectedCounts[2]}
          onSelect={(item) => updateSelection(2, item.id)}
        />
        {/* Button */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                selectedCounts?.length >= 1 ? "#081A35" : "#CDD5DC",
            },
          ]}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { fontFamily: "Mukta-Regular" }]}>
            Save Preferences
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
      </ScrollView>
    </>
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
    maxHeight: 0.8,
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
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 5,
    letterSpacing: 0.2,
  },
  button: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(13),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  scrollableContent: {
    maxHeight: screenHeight * 0.55,
  },
});

export default FirstLanguageSetState;
