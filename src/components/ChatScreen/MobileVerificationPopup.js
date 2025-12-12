import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Animated,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { Feather } from "@expo/vector-icons";
import { scaleFont } from "../../utils/responsive";
import BackArrowLeftIcon from "../../../assets/SvgIconsComponent/BackArrowLeftIcon";

const { width } = Dimensions.get("window");

const MobileVerificationPopup = ({ close, mobileVerificationPopup }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const animatedValue = useState(new Animated.Value(0))[0];
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", (e) => {
      const height = e.endCoordinates.height;
      setKeyboardHeight(height);
      Animated.timing(animatedValue, {
        toValue: height / 2.5, // pushes up slightly, not fully
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Modal
      visible={mobileVerificationPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => close(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[styles.container]}
      >
        {/* Blur Background */}
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={5}
          reducedTransparencyFallbackColor="rgba(0,0,0,0.4)"
        />
        <View style={styles.androidBlur} />
        <View style={styles.gapFiller} />

        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={0.5}
          onPress={() => {
            close(false);
            Keyboard.dismiss();
          }}
        />
        <Animated.View
          style={{
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 400], // average keyboard height
                  outputRange: [
                    0,
                    isCodeSent
                      ? -(keyboardHeight * 2.7)
                      : -(keyboardHeight * 2.3),
                  ], 
                  // perfect lift without large gap
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          {/* Modal Sheet */}
          <ScrollView
            contentContainerStyle={[styles.scrollContent]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.modalSheet}>
              {/* Content */}
              <View style={styles.content}>
                {/* Title */}
                {isCodeSent && (
                  <View style={styles.closeModalMain}>
                    <TouchableOpacity  onPress={() => setIsCodeSent(false)}>
                    <BackArrowLeftIcon/>
                    </TouchableOpacity>
                  </View>
                )}

                {isCodeSent ? (
                  <>
                    <Text style={styles.title}>Enter the 6-digit code</Text>
                    {/* Description */}
                    <Text style={styles.description}>
                      We've sent a one-time password (OTP) to
                    </Text>
                    <Text
                      style={[
                        styles.description,
                        {
                          marginBottom: 35,
                          color: "black",
                          fontFamily: "Mukta-Bold",
                        },
                      ]}
                    >
                      9876543210
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.title}>
                      Lastly, Verify your{"\n"}mobile number
                    </Text>
                    {/* Description */}
                    <Text style={styles.description}>
                      To enhance security, we need to verify.
                    </Text>
                    <Text style={[styles.description, { marginBottom: 35 }]}>
                      your mobile number
                    </Text>
                  </>
                )}

                {/* Input Section */}
                {isCodeSent ? (
                  <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                      <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        style={[styles.otpInput]}
                        value={digit}
                        onChangeText={(value) => handleChange(index, value)}
                        onKeyPress={({ nativeEvent: { key } }) =>
                          handleKeyPress(index, key)
                        }
                        keyboardType="number-pad"
                        maxLength={1}
                        selectTextOnFocus
                      />
                    ))}
                  </View>
                ) : (
                  <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Mobile Number</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your mobile number"
                      placeholderTextColor="#9CA3AF"
                      value={mobileNumber}
                      onChangeText={setMobileNumber}
                      keyboardType="phone-pad"
                      returnKeyType="done"
                    />
                  </View>
                )}

                {/* Verify Button */}
                <TouchableOpacity
                  style={[
                    styles.verifyButton,
                    !mobileNumber && styles.verifyButtonDisabled,
                  ]}
                  onPress={() => {
                    setIsCodeSent(true);
                  }}
                  activeOpacity={0.8}
                  disabled={!mobileNumber}
                >
                  <Text style={styles.verifyButtonText}>
                    {isCodeSent ? "Continue" : "Verify"}
                  </Text>
                </TouchableOpacity>

                {/* Skip for now */}
                <TouchableOpacity
                  style={[
                    styles.skipButton,
                    { marginBottom: isCodeSent ? 70 : 20 },
                  ]}
                  onPress={() => close(false)}
                  activeOpacity={0.7}
                >
                  {isCodeSent ? (
                    <Text style={styles.skipButtonText}>
                      Resend Code in 00:20
                    </Text>
                  ) : (
                    <Text style={styles.skipButtonText}>Skip for now</Text>
                  )}
                </TouchableOpacity>

                {/* Note */}
                {!isCodeSent && (
                  <View style={[styles.noteContainer, { marginBottom: 50 }]}>
                    <Text style={styles.noteText}>
                      <Text style={styles.noteBold}>Note:</Text> You can skip
                      this step for now — but verification will be required
                      within 7 days to continue using Elunara.
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  gapFiller: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "40%",
    backgroundColor: "white",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
    marginBottom: 0,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  closeModalMain: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: scaleFont(24),
    color: "#3A3A3A",
    marginBottom: 5,
    marginTop: 10,
    lineHeight: 36,
    fontFamily: "Mukta-Bold",
  },
  description: {
    fontSize: scaleFont(16),
    lineHeight: 24,
    color: "#757575",
    fontFamily: "Mukta-Regular",
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: scaleFont(12),
    color: "#374151",
    marginBottom: 8,
    fontFamily: "Mukta-Regular",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: scaleFont(14),
    color: "#3A3A3A",
    fontFamily: "Mukta-Regular",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
    marginTop: 5,
  },
  otpInput: {
    width: "15%",
    height: 57,
    borderWidth: 1.5,
    borderColor: "#B5BECE",
    backgroundColor:"white",
    color:"#828282",
    borderRadius: 16,
    textAlign: "center",
    fontSize: scaleFont(15),
    fontWeight: "600",
    fontFamily: "Mukta-Regular",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
  },
  resendText: {
    fontSize: scaleFont(10),
    color: "#6b7280",
  },
  resendLink: {
    fontSize: scaleFont(10),
    fontWeight: "600",
    color: "#111827",
    textDecorationLine: "underline",
  },
  verifyButton: {
    backgroundColor: "#081A35",
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  verifyButtonDisabled: {
    backgroundColor: "#CDD5DC",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Bold",
  },
  skipButton: {
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 10,
  },
  skipButtonText: {
    color: "#0F172A",
    fontSize: scaleFont(14),
    fontWeight: "600",
    borderBottomWidth:1,
    fontFamily: "Mukta-Bold",
  },
  noteContainer: {
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  noteText: {
    fontSize: scaleFont(14),
    lineHeight: 20,
    color: "#3A3A3A",
    letterSpacing: 0.1,
    fontFamily: "Mukta-Regular",
  },
  noteBold: {
    fontFamily: "Mukta-Bold",
    color: "#3A3A3A",
  },
});

export default MobileVerificationPopup;
