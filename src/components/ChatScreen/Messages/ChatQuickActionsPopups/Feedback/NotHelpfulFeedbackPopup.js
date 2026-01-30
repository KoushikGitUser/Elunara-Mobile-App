import {
  View,
  Text,
  Platform,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { scaleFont } from "../../../../../utils/responsive";
import { setToggleNotHelpfulFeedbackPopup } from "../../../../../redux/slices/toggleSlice";
import { BlurView } from "@react-native-community/blur";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { triggerToast } from "../../../../../services/toast";
import { commonFunctionForAPICalls } from "../../../../../redux/slices/apiCommonSlice";
import Toaster from "../../../../UniversalToaster/Toaster";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const NotHelpfulFeedbackPopup = ({ multiSelect = true }) => {
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

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
    "Formatting issues",
  ];

  const handleSubmit = async () => {
    Keyboard.dismiss();

    // Validate feedback message
    if (!feedbackText || feedbackText.trim().length === 0) {
      triggerToast(
        "Error",
        "Please select an option or provide feedback",
        "error",
        3000
      );
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Submit feedback to API with type "bug" and wait for response
      await dispatch(
        commonFunctionForAPICalls({
          method: "POST",
          url: "/settings/help-center/feedback",
          data: {
            type: "bug",
            message: feedbackText.trim(),
          },
          name: "submitHelpCenterFeedback",
        })
      ).unwrap();

      dispatch(setToggleNotHelpfulFeedbackPopup(false));
      setFeedbackText("");
      setSelectedItems([]);
      triggerToast(
        "Submitted",
        "Your feedback has been successfully submitted",
        "success",
        3000
      );
    } catch (error) {
      console.error("Feedback submission error:", error);
      triggerToast(
        "Error",
        "Failed to submit feedback. Please try again.",
        "error",
        3000
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    Keyboard.dismiss();
    dispatch(setToggleNotHelpfulFeedbackPopup(false));
  };

  return (
    <Modal
      visible={toggleStates.toggleNotHelpfulFeedbackPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <Toaster/>
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
          onPress={handleClose}
        />

        <View style={[
          styles.modalSheet,
          { maxHeight: keyboardHeight > 0 ? SCREEN_HEIGHT * 1 : SCREEN_HEIGHT * 0.8 }
        ]}>
          {/* Close Button */}
          <View style={styles.closeModalMain}>
            <AntDesign
              style={{ marginRight: 20 }}
              onPress={handleClose}
              name="close"
              size={20}
              color="black"
            />
          </View>

          {/* Content */}
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Title */}
            <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>
              Help us improve this response
            </Text>
            {/* Description */}
            <Text style={styles.description}>
              Tell us what didn't work — your feedback helps make answers
              better.
            </Text>

            {/* Chips */}
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

              {/* TextInput */}
              <View style={[styles.inputLarge, { marginBottom: 20 }]}>
                <TextInput
                  value={feedbackText}
                  onChangeText={(text) => {
                    setFeedbackText(text);
                    // Clear chip selection when user types custom text
                    if (!FEEDBACK_OPTIONS.includes(text)) {
                      setSelectedItems([]);
                    }
                  }}
                  style={styles.inputText}
                  placeholder="Provide other feedback..."
                  placeholderTextColor="#9CA3AF"
                  returnKeyType="done"
                  multiline={true}
                  textAlignVertical="top"
                  blurOnSubmit={true}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>

              {/* Button */}
              <View style={styles.btnsMain}>
                <TouchableOpacity
                  style={[styles.button, isSubmitting && { opacity: 0.7 }]}
                  onPress={handleSubmit}
                  activeOpacity={0.8}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.buttonText}>Submit Feedback</Text>
                  )}
                </TouchableOpacity>
              </View>

            {/* Keyboard spacer */}
            {keyboardHeight > 0 && <View style={{ height: keyboardHeight }} />}
          </ScrollView>
        </View>
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
    paddingBottom:54,
    maxHeight: SCREEN_HEIGHT * 0.8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 10,
  },
  closeModalMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
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
    fontFamily: "Mukta-Regular",
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
    fontFamily: "Mukta-Regular",
    color: "#333333",
    textAlign: "center",
  },
  chipTextSelected: {
    color: "#1A1A1A",
    fontWeight: "500",
    fontFamily: "Mukta-Bold",
  },
  inputLarge: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: "100%",
    height: 120,
  },
  inputText: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#1F2937",
    letterSpacing: 0.2,
    textAlignVertical: "top",
    paddingTop: 0,
  },
  btnsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom:50
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(12),
    fontWeight: "500",
    fontFamily: "Mukta-Bold",
    letterSpacing: 0.3,
  },
});

export default NotHelpfulFeedbackPopup;
