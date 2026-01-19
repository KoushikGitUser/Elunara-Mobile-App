import {
  View,
  Text,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Animated,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { scaleFont } from "../../../utils/responsive";
import { appColors } from "../../../themes/appColors";
import Toaster from "../../UniversalToaster/Toaster";
import { BlurView } from "@react-native-community/blur";
import BackArrowLeftIcon from "../../../../assets/SvgIconsComponent/BackArrowLeftIcon";
import { AlertCircle } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getOTPForMobileNumber, setIsMobileOTPVerified, setIsOTPReceivedForMobileVerification, verifyOTPForMobileNumber } from "../../../redux/slices/authSlice";
import { triggerToast } from "../../../services/toast";
import { setUserMobileNumberForMobileVerification } from "../../../redux/slices/globalDataSlice";

const UpdateMobileNumberPopup = ({mobileVerificationPopup,close}) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isMobileFocused, setIsMobileFocused] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const animatedValue = useState(new Animated.Value(0))[0];
  const [isCodeSent, setIsCodeSent] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);
  const { globalDataStates } = useSelector((state) => state.Global);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { authStates } = useSelector((state) => state.Auth);

  const validateMobileNumber = (text, touched = isTouched) => {
    // Indian mobile number: 10 digits starting with 6, 7, 8, or 9
    const indianMobileRegex = /^[6-9]\d{9}$/;
    if (!text && touched) {
      setMobileError("Mobile number is required");
    } else if (text && text.length < 10) {
      setMobileError("Mobile number must be 10 digits");
    } else if (text && !indianMobileRegex.test(text)) {
      setMobileError("Please enter a valid Indian mobile number");
    } else {
      setMobileError("");
    }
  };

  useEffect(() => {
    if (authStates.isOTPReceivedForMobileVerification == true) {
      setIsCodeSent(true);
      setResendTimer(20);
    }
    if (authStates.isMobileOTPVerified == true) {
      dispatch(setIsMobileOTPVerified(null));
      close(false);
      navigation.goBack();
      triggerToast(
        "Verified",
        "Mobile number verified successfully",
        "success",
        3000
      );
    }
  }, [
    authStates.isOTPReceivedForMobileVerification,
    authStates.isMobileOTPVerified,
  ]);

  // Resend timer countdown
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const resendCode = () => {
    const formData = new FormData();
    formData.append("phone_number", mobileNumber);
    dispatch(getOTPForMobileNumber(formData));
    setResendTimer(20);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getCodeFromMobileNumber = () => {
    if (isCodeSent) {
      const formData = new FormData();
      formData.append("otp", otp.join(""));
      dispatch(verifyOTPForMobileNumber(formData));
    } else {
      dispatch(setUserMobileNumberForMobileVerification(mobileNumber));
      const formData = new FormData();
      formData.append("phone_number", mobileNumber);
      dispatch(getOTPForMobileNumber(formData));
    }
  };

  const handleMobileChange = (text) => {
    // Only allow digits and max 10 characters
    const cleanedText = text.replace(/[^0-9]/g, "").slice(0, 10);
    setMobileNumber(cleanedText);
    // Set touched to true on first input and validate in real-time
    if (!isTouched) {
      setIsTouched(true);
    }
    validateMobileNumber(cleanedText, true);
  };

  const isMobileValid = mobileNumber.length === 10 && !mobileError;

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
      <Toaster />
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
                  inputRange: [0, 350], // average keyboard height
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
                    <TouchableOpacity onPress={() => setIsCodeSent(false)}>
                      <BackArrowLeftIcon />
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
                      {globalDataStates.userMobileNumberForMobileVerification}
                    </Text>
                  </>
                ) : (
                      <>
                        <Text style={styles.title}>
                          Update your Mobile Number
                        </Text>
                        {/* Description */}
                        <Text style={styles.description}>
                          Please provide the new mobile 
                        </Text>
                        <Text
                          style={[styles.description, { marginBottom: 35 }]}
                        >
                           number to update
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
                    <View
                      style={[
                        styles.inputWrapper,
                        isMobileFocused && styles.inputWrapperFocused,
                        (mobileError || (isTouched && !mobileNumber)) &&
                          styles.inputWrapperError,
                      ]}
                    >
                      <TouchableOpacity
                        style={styles.countrySection}
                        disabled={true}
                        activeOpacity={1}
                      >
                        <Text style={styles.countryText}>IN</Text>
                      </TouchableOpacity>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your new mobile number"
                        placeholderTextColor="#9CA3AF"
                        value={mobileNumber}
                        onChangeText={handleMobileChange}
                        onFocus={() => setIsMobileFocused(true)}
                        onBlur={() => {
                          setIsMobileFocused(false);
                          setIsTouched(true);
                          validateMobileNumber(mobileNumber, true);
                        }}
                        keyboardType="phone-pad"
                        returnKeyType="done"
                        maxLength={10}
                      />
                      {mobileError || (isTouched && !mobileNumber) ? (
                        <View style={styles.errorIconContainer}>
                          <AlertCircle
                            size={20}
                            color="#D00B0B"
                            style={{ marginRight: 10 }}
                          />
                        </View>
                      ) : null}
                    </View>
                    {mobileError || (isTouched && !mobileNumber) ? (
                      <Text style={styles.errorText}>
                        {mobileError || "Mobile number is required"}
                      </Text>
                    ) : null}
                  </View>
                )}

                {/* Verify Button */}
                <TouchableOpacity
                  style={[
                    styles.verifyButton,
                    ((!isMobileValid && !isCodeSent) ||
                      authStates.isOTPReceivedForMobileVerification ==
                        "pending" ||
                      (isCodeSent &&
                        authStates.isMobileOTPVerified == "pending")) &&
                      styles.verifyButtonDisabled,
                  ]}
                  onPress={() => {
                    getCodeFromMobileNumber();
                  }}
                  activeOpacity={0.8}
                  disabled={
                    (!isCodeSent && !isMobileValid) ||
                    authStates.isOTPReceivedForMobileVerification ==
                      "pending" ||
                    (isCodeSent && authStates.isMobileOTPVerified == "pending")
                  }
                >
                  {(
                    isCodeSent
                      ? authStates.isMobileOTPVerified == "pending"
                      : authStates.isOTPReceivedForMobileVerification ==
                        "pending"
                  ) ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.verifyButtonText}>
                      {isCodeSent ? "Continue" : "Verify"}
                    </Text>
                  )}
                </TouchableOpacity>

                {/* Skip for now / Resend Code */}
                {isCodeSent &&  (
                  <TouchableOpacity
                    style={[styles.skipButton, { marginBottom: 70 }]}
                    onPress={resendTimer === 0 ? resendCode : undefined}
                    activeOpacity={resendTimer === 0 ? 0.7 : 1}
                    disabled={resendTimer > 0}
                  >
                    <Text
                      style={[
                        styles.skipButtonText,
                        resendTimer > 0 && { color: "#9CA3AF" },
                      ]}
                    >
                      {resendTimer > 0
                        ? `Resend Code in ${formatTimer(resendTimer)}`
                        : "Resend Code"}
                    </Text>
                  </TouchableOpacity>
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
    height: "30%",
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
    marginBottom: 20,
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
    marginTop: 0,
  },
  inputLabel: {
    fontSize: scaleFont(12),
    color: "#374151",
    marginBottom: 8,
    fontFamily: "Mukta-Regular",
  },
  inputWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 15,
  },
  countrySection: {
    paddingLeft: 14,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  countryText: {
    fontSize: scaleFont(14),
    color: "#acacacff",
    fontFamily: "Mukta-Medium",
    borderRightWidth: 1,
    borderRightColor: "#D4D4D4",
    paddingRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingRight: 45,
    fontSize: scaleFont(14),
    color: "#3A3A3A",
    fontFamily: "Mukta-Regular",
  },
  inputWrapperFocused: {
    borderColor: appColors.navyBlueShade,
  },
  inputWrapperError: {
    borderColor: "#D00B0B",
  },
  errorIconContainer: {
    position: "absolute",
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#D00B0B",
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    marginTop: 4,
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
    backgroundColor: "white",
    color: "#828282",
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
    marginBottom: 60,
    marginTop: 20,
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
    borderBottomWidth: 1,
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

export default UpdateMobileNumberPopup;
