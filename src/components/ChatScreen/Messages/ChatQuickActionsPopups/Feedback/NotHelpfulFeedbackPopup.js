import {
  View,
  Text,
  Platform,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { scaleFont } from "../../../../../utils/responsive";
import { setToggleNotHelpfulFeedbackPopup } from "../../../../../redux/slices/toggleSlice";
import { BlurView } from "@react-native-community/blur";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const NotHelpfulFeedbackPopup = ({ multiSelect = true }) => {
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");

  const handlePress = (item) => {
    setFeedbackText(item);
    setSelectedItems([item]);
  };

  const FEEDBACK_OPTIONS = [
    "Answer was incorrect",
    "It was confusing",
    "The tone felt off",
    "Too vague or generic",
    "Missing important context",
    "formatting issues",
  ];

  return (
    <Modal
      visible={toggleStates.toggleNotHelpfulFeedbackPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleNotHelpfulFeedbackPopup(false))}
    >
      <View style={styles.container}>
        {/* Blur Background */}

        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={7}
          reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.43)"
        />
        <View style={styles.androidBlur} />

        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => dispatch(setToggleNotHelpfulFeedbackPopup(false))}
        />
        <View style={styles.modalSheet}>
          {/* Handle Bar */}
          <View style={styles.closeModalMain}>
            <AntDesign
              style={{ marginRight: 20 }}
              onPress={() => dispatch(setToggleNotHelpfulFeedbackPopup(false))}
              name="close"
              size={20}
              color="black"
            />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Title */}
            <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>
              Help us improve this response
            </Text>
            {/* Description */}
            <Text style={styles.description}>
              Tell us what didn't work — your feedback helps make answers
              better.
            </Text>
            <View style={styles.chipsWrapper}>
              {FEEDBACK_OPTIONS.map((item, index) => {
                const isSelected = selectedItems.includes(item);
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                    onPress={() => handlePress(item)}
                    style={[styles.chip, isSelected && styles.chipSelected]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        isSelected && styles.chipTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={[styles.inputLarge, { marginBottom: 20 }]}>
              <TextInput
                value={feedbackText}
                onChangeText={setFeedbackText}
                style={styles.inputText}
                placeholder="Provide other feedback..."
                placeholderTextColor="#9CA3AF"
                returnKeyType="done"
              />
            </View>

            {/* Button */}
            <View style={styles.btnsMain}>
              <TouchableOpacity
                style={styles.button}
              onPress={() => dispatch(setToggleNotHelpfulFeedbackPopup(false))}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Submit Feedback</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Modal Sheet */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  androidBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.18)",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  btnsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  verifiedIcon: {
    height: 55,
    width: 50,
    objectFit: "contain",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  iconContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: scaleFont(25),
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(12),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 18,
    letterSpacing: 0.2,
  },
  button: {
    width: "100%",
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(12),
    fontWeight: "500",
    letterSpacing: 0.3,
  },

  closeModalMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  categorySections: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  sectionText: {
    color: "#757575",
  },
  sections: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "lightgrey",
    paddingVertical: 10,
  },
  currentLLMMain: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D8DCE4",
    marginBottom: 20,
  },
  currentResponse: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: "Mukta-Bold",
  },
  badge: {
    backgroundColor: "#F3F3F3",
    borderColor: "#D8DCE4",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  btnText: {
    fontSize: scaleFont(12),
    fontWeight: "400",
    color: "#1A1A1A",
    fontFamily: "Mukta-Regular",
  },
  inputLarge: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 22,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#1F2937",
    letterSpacing: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    height: 130,
  },
  inputText: {
    backgroundColor: "#FFFFFF",
    fontSize: scaleFont(10),
    color: "#1F2937",
    letterSpacing: 0.2,
  },
  chipsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 12,
    marginBottom: 20,
  },
  chip: {
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#D3DAE5",
  },
  chipSelected: {
    backgroundColor: "#EBF1FB",
    borderColor: "#D3DAE5",
  },
  chipText: {
    fontSize: scaleFont(12),
    fontWeight: "400",
    fontFamily: "Mukta-Bold",
    color: "#333333",
    textAlign: "center",
  },
  chipTextSelected: {
    color: "#1A1A1A",
    fontWeight: "500",
  },
});

export default NotHelpfulFeedbackPopup;
