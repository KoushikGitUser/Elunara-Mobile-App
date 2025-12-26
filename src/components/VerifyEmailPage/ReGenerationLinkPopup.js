import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
  Animated,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Keyboard,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { AlertCircle } from "lucide-react-native";
import { scaleFont } from "../../utils/responsive";
import { appColors } from "../../themes/appColors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  recoverAccount,
  setIsOTPReceivedForAccountRecovery,
} from "../../redux/slices/authSlice";
import {
  setUserMailIDOnForgotPassword,
  setUserOTPOnForgotPassword,
} from "../../redux/slices/globalDataSlice";
import { triggerToast } from "../../services/toast";

const ReGenerationLinkPopup = ({ close, toggleGenerateLinkPopup }) => {
  const [email, setEmail] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const animatedValue = useState(new Animated.Value(0))[0];
  const { globalDataStates } = useSelector((state) => state.Global);
  const { authStates } = useSelector((state) => state.Auth);

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text) {
      setEmailError("");
    } else if (!emailRegex.test(text)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  useEffect(() => {
    if (authStates.isOTPReceivedForAccountRecovery == true) {
      navigation.navigate("changepass", {
        recoveryToken: null,
        isForTokenOrOTP: "OTP",
      });
      triggerToast(
        "Link and OTP sent",
        "Recovery link and OTP sent to your mail ID",
        "success",
        3000
      );
      dispatch(setIsOTPReceivedForAccountRecovery(false));
    }
  }, [authStates.isOTPReceivedForAccountRecovery]);

  const getCodeFunction = () => {
    const formData = new FormData();
    formData.append("email", email);
    dispatch(recoverAccount(formData));
    dispatch(setUserMailIDOnForgotPassword(email));
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    validateEmail(text);
  };

  const isEmailValid = email && !emailError;
  const isOtpComplete = otp.every((digit) => digit.length === 1);

  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", (e) => {
      const height = e.endCoordinates.height;
      setKeyboardVisible(true);
      setKeyboardHeight(height);
      Animated.timing(animatedValue, {
        toValue: height / 2.5, // pushes up slightly, not fully
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
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

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    console.log("Resending OTP");
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <Modal
      visible={toggleGenerateLinkPopup}
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
        <View
          style={[
            styles.gapFiller,
            { height: isKeyboardVisible ? "50%" : "30%" },
          ]}
        />

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
                  inputRange: [0, 320], // average keyboard height
                  outputRange: [
                    0,

                       -(keyboardHeight * 2.7),
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
                <View style={styles.closeModalMain}>
                  <AntDesign
                    name="close"
                    size={24}
                    color={appColors.navyBlueShade}
                  />
                </View>
                {/* Title */}
                <Text style={styles.title}>Recover your account</Text>

                {/* Description */}
                <Text style={styles.description}>
                  Enter your registered email, and we'll send
                </Text>
                <Text style={styles.description}>
                  a new recovery link and a verification code.
                </Text>

                {/* Input Section */}
                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={[
                        styles.input,
                        isEmailFocused && styles.inputFocused,
                        emailError && styles.inputError,
                      ]}
                      placeholder="Enter your email"
                      placeholderTextColor="#9CA3AF"
                      value={email}
                      onChangeText={handleEmailChange}
                      onFocus={() => setIsEmailFocused(true)}
                      onBlur={() => setIsEmailFocused(false)}
                      keyboardType="email-address"
                      returnKeyType="done"
                      autoCapitalize="none"
                    />
                    {emailError ? (
                      <View style={styles.errorIconContainer}>
                        <AlertCircle
                          size={20}
                          color="#D00B0B"
                          style={{ marginRight: 10 }}
                        />
                      </View>
                    ) : null}
                  </View>
                  {emailError ? (
                    <Text style={styles.errorText}>{emailError}</Text>
                  ) : null}
                </View>

                {/* Verify Button */}
                <TouchableOpacity
                  style={[
                    styles.verifyButton,
                    (!isEmailValid ||
                      authStates.isOTPReceivedForAccountRecovery ==
                        "pending") &&
                      styles.verifyButtonDisabled,
                    { marginBottom:85 },
                  ]}
                  onPress={() => {
                    getCodeFunction();
                  }}
                  activeOpacity={0.8}
                  disabled={
                    !isEmailValid ||
                    authStates.isOTPReceivedForAccountRecovery == "pending"
                  }
                >
                  {authStates.isOTPReceivedForAccountRecovery == "pending" ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.verifyButtonText}>
                      Proceed
                    </Text>
                  )}
                </TouchableOpacity>

                {/* {isCodeSent && (
                  <View style={styles.resendContainer}>
                    <Text style={styles.resendText}>
                      Don't receive the OTP?{" "}
                    </Text>
                    <TouchableOpacity onPress={handleResend}>
                      <Text style={styles.resendLink}>Resend OTP</Text>
                    </TouchableOpacity>
                  </View>
                )} */}
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
  closeModalMain: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "#ffffffff",
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
  title: {
    fontSize: scaleFont(24),
    color: "#3A3A3A",
    marginBottom: 5,
    lineHeight: 36,
    fontFamily: "Mukta-Bold",
  },
  description: {
    fontSize: scaleFont(15),
    lineHeight: 26,
    color: "#8F8F8F",
    fontFamily: "Mukta-Regular",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 35,
    marginTop: 25,
    gap: 17,
  },
  otpInput: {
    width: "15%",
    height: 57,
    borderWidth: 1,
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
    fontSize: scaleFont(14),
    color: "#8F8F8F",
    fontFamily: "Mukta-Regular",
  },
  resendLink: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Bold",
    color: appColors.navyBlueShade,
    borderBottomWidth: 1,
    borderColor: appColors.navyBlueShade,
  },
  inputSection: {
    marginBottom: 24,
    marginTop: 30,
  },
  inputLabel: {
    fontSize: scaleFont(12),
    fontWeight: "600",
    color: "#5E5E5E",
    marginBottom: 8,
    fontFamily: "Mukta-Regular",
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingRight: 45,
    fontSize: scaleFont(14),
    color: "#1F2937",
    fontFamily: "Mukta-Regular",
  },
  inputFocused: {
    borderColor: appColors.navyBlueShade,
  },
  inputError: {
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
  verifyButton: {
    backgroundColor: "#081A35",
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  verifyButtonDisabled: {
    backgroundColor: "#CDD5DC",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontWeight: "500",
    fontFamily: "Mukta-Bold",
  },
  skipButton: {
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 10,
  },
  skipButtonText: {
    color: "#0F172A",
    fontSize: scaleFont(10),
    fontWeight: "600",
    textDecorationLine: "underline",
    letterSpacing: 0.2,
  },
  noteContainer: {
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  noteText: {
    fontSize: scaleFont(9),
    lineHeight: 20,
    color: "#6B7280",
    letterSpacing: 0.1,
  },
  noteBold: {
    fontWeight: "700",
    color: "#374151",
  },
});

export default ReGenerationLinkPopup;
