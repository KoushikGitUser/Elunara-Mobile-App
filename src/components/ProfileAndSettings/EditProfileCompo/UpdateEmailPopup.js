import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
  Animated,
  ScrollView,
  TextInput,
  Platform,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Toaster from "../../UniversalToaster/Toaster";
import { BlurView } from "@react-native-community/blur";
import BackArrowLeftIcon from "../../../../assets/SvgIconsComponent/BackArrowLeftIcon";
import { scaleFont } from "../../../utils/responsive";
import { appColors } from "../../../themes/appColors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { triggerToast } from "../../../services/toast";
import { AlertCircle, Eye, EyeOff } from "lucide-react-native";
import {
  requestForEmailChange,
  setIsEmailChangeRequestedToFalse,
  verifyEmailChangeRequest,
} from "../../../redux/slices/authSlice";

const UpdateEmailPopup = ({ updateEmailPopup, close }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const animatedValue = useState(new Animated.Value(0))[0];
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const { globalDataStates } = useSelector((state) => state.Global);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { authStates } = useSelector((state) => state.Auth);

  const validateEmail = (text, touched = isEmailTouched) => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text && touched) {
      setEmailError("Email is required");
    } else if (text && !emailRegex.test(text)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (text, touched = isPasswordTouched) => {
    if (!text && touched) {
      setPasswordError("Password is required");
    } else if (text && text.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  useEffect(() => {
    if (authStates.isOTPReceivedForMobileVerification == true) {
      setIsCodeSent(true);
      setResendTimer(20);
      dispatch(setIsOTPReceivedForMobileVerification(null));
    }
    if (authStates.isMobileOTPVerified == true) {
      AsyncStorage.setItem("isMobileNumberVerifiedByOTP", "true");
      close(false);
      navigation.goBack();
      triggerToast(
        "Verified",
        "Mobile number verified successfully",
        "success",
        3000
      );
    }
    if (authStates.isOTPSentForEmailChange == true) {
      setIsCodeSent(true);
      setResendTimer(20);
      dispatch(setIsEmailChangeRequestedToFalse());
    }
    if (authStates.isEmailChangeRequestVerified == true) {
      close(false);
    }
  }, [
    authStates.isOTPReceivedForMobileVerification,
    authStates.isMobileOTPVerified,
    authStates.isOTPSentForEmailChange,
    authStates.isEmailChangeRequestVerified,
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
      const payload = {
        otp: otp.join(""),
      };
      dispatch(verifyEmailChangeRequest(payload));
    } else {
      // Handle email verification logic here
      const payload = {
        new_email: email,
        current_password: password,
      };

      dispatch(requestForEmailChange(payload));
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (!isEmailTouched) {
      setIsEmailTouched(true);
    }
    validateEmail(text, true);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (!isPasswordTouched) {
      setIsPasswordTouched(true);
    }
    validatePassword(text, true);
  };

  const isEmailValid = email && !emailError;
  const isPasswordValid = password && password.length >= 8 && !passwordError;
  const isFormValid = isEmailValid && isPasswordValid;

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
      setKeyboardHeight(0);
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
      visible={updateEmailPopup}
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
                  inputRange: [0, 700], // average keyboard height
                  outputRange: [0, -(keyboardHeight * 1.2)],
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
              <View
                style={[
                  styles.content,
                  { paddingBottom: keyboardHeight > 0 ? keyboardHeight : 20 },
                ]}
              >
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
                    <Text style={styles.title}>Enter Verification Code</Text>
                    {/* Description */}
                    <Text style={styles.description}>
                      We've sent a one-time password (OTP){" "}
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
                        {" "}
                        {email}.
                      </Text>{" "}
                      Enter the code to update your email.
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.title}>Update your Email Address</Text>
                    {/* Description */}
                    <Text style={styles.description}>
                      Please enter your new email and current
                    </Text>
                    <Text style={[styles.description, { marginBottom: 10 }]}>
                      password to update your account email.
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
                  <>
                    <View style={styles.inputSection}>
                      <Text style={styles.inputLabel}>New Email id</Text>
                      <View
                        style={[
                          styles.inputWrapper,
                          isEmailFocused && styles.inputWrapperFocused,
                          (emailError || (isEmailTouched && !email)) &&
                            styles.inputWrapperError,
                        ]}
                      >
                        <TextInput
                          style={styles.input}
                          placeholder="Enter new email"
                          placeholderTextColor="#9CA3AF"
                          value={email}
                          onChangeText={handleEmailChange}
                          onFocus={() => setIsEmailFocused(true)}
                          onBlur={() => {
                            setIsEmailFocused(false);
                            setIsEmailTouched(true);
                            validateEmail(email, true);
                          }}
                          keyboardType="email-address"
                          returnKeyType="next"
                          autoCapitalize="none"
                        />
                        {emailError || (isEmailTouched && !email) ? (
                          <View style={styles.errorIconContainer}>
                            <AlertCircle
                              size={20}
                              color="#D00B0B"
                              style={{ marginRight: 10 }}
                            />
                          </View>
                        ) : null}
                      </View>
                      {emailError || (isEmailTouched && !email) ? (
                        <Text style={styles.errorText}>
                          {emailError || "Email is required"}
                        </Text>
                      ) : null}
                    </View>
                    <View style={styles.inputSection}>
                      <Text style={styles.inputLabel}>Password</Text>
                      <View
                        style={[
                          styles.inputWrapper,
                          isPasswordFocused && styles.inputWrapperFocused,
                          (passwordError || (isPasswordTouched && !password)) &&
                            styles.inputWrapperError,
                        ]}
                      >
                        <TextInput
                          style={styles.input}
                          placeholder="Enter password"
                          placeholderTextColor="#9CA3AF"
                          value={password}
                          onChangeText={handlePasswordChange}
                          onFocus={() => setIsPasswordFocused(true)}
                          onBlur={() => {
                            setIsPasswordFocused(false);
                            setIsPasswordTouched(true);
                            validatePassword(password, true);
                          }}
                          secureTextEntry={!showPassword}
                          returnKeyType="done"
                          autoCapitalize="none"
                        />
                        <View style={styles.errorIconContainer}>
                          {passwordError || (isPasswordTouched && !password) ? (
                            <AlertCircle
                              size={20}
                              color="#D00B0B"
                              style={{ marginRight: 10 }}
                            />
                          ) : null}
                          <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeIconButton}
                          >
                            {showPassword ? (
                              <EyeOff size={20} color="#9CA3AF" />
                            ) : (
                              <Eye size={20} color="#9CA3AF" />
                            )}
                          </TouchableOpacity>
                        </View>
                      </View>
                      {passwordError || (isPasswordTouched && !password) ? (
                        <Text style={styles.errorText}>
                          {passwordError || "Password is required"}
                        </Text>
                      ) : null}
                    </View>
                  </>
                )}

                {/* Verify Button */}
                <TouchableOpacity
                  style={[
                    styles.verifyButton,
                    ((!isFormValid && !isCodeSent) ||
                      authStates.isEmailChangeRequested == "pending" ||
                      authStates.isEmailChangeRequestVerified == "pending") &&
                      styles.verifyButtonDisabled,
                  ]}
                  onPress={() => {
                    getCodeFromMobileNumber();
                  }}
                  activeOpacity={0.8}
                  disabled={
                    (!isCodeSent && !isFormValid) ||
                    authStates.isEmailChangeRequested == "pending" ||
                    authStates.isEmailChangeRequestVerified == "pending"
                  }
                >
                  {authStates.isEmailChangeRequested == "pending" ||
                  authStates.isEmailChangeRequestVerified == "pending" ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.verifyButtonText}>
                      {isCodeSent ? "Verify" : "Verify Email"}
                    </Text>
                  )}
                </TouchableOpacity>

                {/* Skip for now / Resend Code */}
                {isCodeSent ? (
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
                ) : null}
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
    marginTop: 15,
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  eyeIconButton: {
    padding: 4,
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
    marginTop:20,
    marginBottom: 40,
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

export default UpdateEmailPopup;
