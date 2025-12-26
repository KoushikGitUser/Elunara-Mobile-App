import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as SecureStore from "expo-secure-store";
import chakraLogo from "../../../assets/images/Knowledge Chakra 2.png";
import google from "../../../assets/images/search.png";
import LinkedIn from "../../../assets/images/linkedin.png";
import apple from "../../../assets/images/apple-logo.png";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./ChangePassword.styles";
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { recoverAccount, resetPassword, setIsOTPReceivedForAccountRecovery, setIsPasswordResetToFalse } from "../../../redux/slices/authSlice";
import { appColors } from "../../../themes/appColors";
import { Check, X, Info } from "lucide-react-native";
import { triggerToast } from "../../../services/toast";

const ChangePassword = ({ route }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [hasStartedTypingPassword, setHasStartedTypingPassword] =
    useState(false);
  const inputRefs = useRef([]);
  const [hasStartedTypingConfirm, setHasStartedTypingConfirm] = useState(false);
  const { globalDataStates } = useSelector((state) => state.Global);
  const { authStates } = useSelector((state) => state.Auth);
  const { recoveryToken, isForTokenOrOTP } = route.params || {};

  // Resend OTP timer state
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Validation states
  const hasMinLength = password.length >= 8;
  const hasNumberAndSpecial =
    /[0-9]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;
  const isFormValid = hasMinLength && hasNumberAndSpecial && passwordsMatch;

  // Error states (only show errors after user starts typing)
  const hasPasswordError =
    hasStartedTypingPassword && (!hasMinLength || !hasNumberAndSpecial);
  const showConfirmError = hasStartedTypingConfirm && !passwordsMatch;



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
    if (!canResend) return;
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
    const formData = new FormData();
    formData.append("email", globalDataStates.userMailIDOnForgotPassword);
    dispatch(recoverAccount(formData));
    // Reset timer
    setResendTimer(30);
    setCanResend(false);
    // TODO: Call your resend OTP API here
  };

  // Timer effect for resend OTP
  useEffect(() => {
    if (isForTokenOrOTP !== "OTP") return;

    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer, isForTokenOrOTP]);

  // Handle password change
  const handlePasswordChange = (text) => {
    if (!hasStartedTypingPassword && text.length > 0) {
      setHasStartedTypingPassword(true);
    }
    setPassword(text);
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (text) => {
    if (!hasStartedTypingConfirm && text.length > 0) {
      setHasStartedTypingConfirm(true);
    }
    setConfirmPassword(text);
  };

  // Get hint color based on validation state
  const getHintColor = (isValid, hasStartedTyping) => {
    if (!hasStartedTyping) return "#757575"; // Default gray
    return isValid ? "#03B32F" : "#D00B0B"; // Green or Red
  };

  const styleProps = {
    // Example: backgroundColor: '#F5F5F5',
    // Example: headingColor: '#000000',
    // Add any dynamic values here
  };

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const styles = useMemo(() => createStyles(styleProps), []);

  const [fontsLoaded] = useFonts({
    "Mukta-Bold": require("../../../../assets/fonts/Mukta-Bold.ttf"),
    "Mukta-Regular": require("../../../../assets/fonts/Mukta-Regular.ttf"),
    "Mukta-Medium": require("../../../../assets/fonts/Mukta-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) { 
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (authStates.isPasswordReset == true) {
      navigation.navigate("signin");
      triggerToast(
        "Password reset successfull",
        "Your account password has been reset successfully. You can now log-in.",
        "success",
        3000
      );
      dispatch(setIsPasswordResetToFalse());
    }
  }, [authStates.isPasswordReset]);

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

  const resetPasswordFunction = () => {
    if (isForTokenOrOTP == "token") {
      const formData = new FormData();
      formData.append("token", recoveryToken);
      formData.append("password", password);
      formData.append("password_confirmation", confirmPassword);
      dispatch(resetPassword(formData));
    } else {
      const formData = new FormData();
      formData.append("email", globalDataStates.userMailIDOnForgotPassword);
      formData.append("otp", globalDataStates.userOTPOnForgotPassword);
      formData.append("password", password);
      formData.append("password_confirmation", confirmPassword);
      dispatch(resetPassword(formData));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Feather
              onPress={() => navigation.navigate("welcome")}
              name="arrow-left"
              size={30}
              color="black"
            />
            <Text style={styles.headTitle}>Create New Password</Text>
            <Text style={styles.headDesc}>Almost there! Just set up your</Text>
            <Text style={[styles.headDesc, { marginTop: 0 }]}>
              new password below.
            </Text>
          </View>
          <View>
            <Image source={chakraLogo} style={styles.chakraLogo} />
          </View>
        </View>

        {/* Password Label */}
        <View style={styles.inputFieldsMain}>
          <Text style={styles.label}>Create Password</Text>
          <View
            style={[
              styles.passwordContainer,
              isPasswordFocused &&
                !hasPasswordError && { borderColor: appColors.navyBlueShade },
              hasPasswordError && { borderColor: "#D00B0B" },
            ]}
          >
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter new password"
              placeholderTextColor="#B0B7C3"
              value={password}
              onChangeText={handlePasswordChange}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              secureTextEntry={!showPassword}
            />
            {hasPasswordError ? (
              <Info size={20} color="#D00B0B" style={{ marginRight: 6 }} />
            ) : null}
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIconContainer}
              activeOpacity={0.7}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#0F1419"
              />
            </TouchableOpacity>
          </View>
          {isPasswordFocused && (
            <View style={styles.passwordHintsContainer}>
              <View style={styles.hintRow}>
                {hasStartedTypingPassword ? (
                  hasMinLength ? (
                    <Check size={16} color="#22C55E" />
                  ) : (
                    <X size={16} color="#D00B0B" />
                  )
                ) : null}
                <Text
                  style={[
                    styles.passwordHintText,
                    {
                      color: getHintColor(
                        hasMinLength,
                        hasStartedTypingPassword
                      ),
                    },
                  ]}
                >
                  Minimum 8 characters
                </Text>
              </View>
              <View style={styles.hintRow}>
                {hasStartedTypingPassword ? (
                  hasNumberAndSpecial ? (
                    <Check size={16} color="#22C55E" />
                  ) : (
                    <X size={16} color="#D00B0B" />
                  )
                ) : null}
                <Text
                  style={[
                    styles.passwordHintText,
                    {
                      color: getHintColor(
                        hasNumberAndSpecial,
                        hasStartedTypingPassword
                      ),
                    },
                  ]}
                >
                  Must include a mix of numbers & special characters
                </Text>
              </View>
            </View>
          )}

          {/* Confirm Password Label */}
          <Text style={[styles.label, { marginTop: 20 }]}>
            Confirm Password
          </Text>
          <View
            style={[
              styles.passwordContainer,
              isConfirmPasswordFocused &&
                !showConfirmError && { borderColor: appColors.navyBlueShade },
              showConfirmError && { borderColor: "#D00B0B" },
            ]}
          >
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm new password"
              placeholderTextColor="#B0B7C3"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              onFocus={() => setIsConfirmPasswordFocused(true)}
              onBlur={() => setIsConfirmPasswordFocused(false)}
            />
            {showConfirmError ? (
              <Info size={20} color="#D00B0B" style={{ marginRight: 6 }} />
            ) : null}
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIconContainer}
              activeOpacity={0.7}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#0F1419"
              />
            </TouchableOpacity>
          </View>
          {hasStartedTypingConfirm && (
            <View style={styles.passwordHintsContainer}>
              <View style={styles.hintRow}>
                {passwordsMatch ? (
                  <Check size={16} color="#22C55E" />
                ) : (
                  <X size={16} color="#D00B0B" />
                )}
                <Text
                  style={[
                    styles.passwordHintText,
                    { color: passwordsMatch ? "#22C55E" : "#D00B0B" },
                  ]}
                >
                  {passwordsMatch
                    ? "Passwords match"
                    : "Passwords do not match"}
                </Text>
              </View>
            </View>
          )}
          {isForTokenOrOTP == "OTP" && (
            <Text style={[styles.label, { marginTop: 50 }]}>OTP</Text>
          )}
          {isForTokenOrOTP == "OTP" && (
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
          )}

          {isForTokenOrOTP == "OTP" && (
            <View style={styles.resendContainer}>
              <TouchableOpacity
                onPress={handleResend}
                disabled={!canResend}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.resendLink, !canResend && { opacity: 0.5 }]}
                >
                  {canResend
                    ? "Resend OTP"
                    : `Resend OTP in 00:${resendTimer
                        .toString()
                        .padStart(2, "0")}`}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Continue Button */}
          <TouchableOpacity
            onPress={() => {
              if (isFormValid) {
                resetPasswordFunction();
              }
            }}
            style={[
              styles.emailButton,
              (!isFormValid || authStates.isPasswordReset == "pending") &&
                styles.emailButtonDisabled,
            ]}
            activeOpacity={0.8}
            disabled={!isFormValid}
          >
            {authStates.isPasswordReset == "pending" ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.emailButtonText}>Continue</Text>
            )}
          </TouchableOpacity>

          {/* Sign Up Link */}
          {/* <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("signin")}>
              <Text style={styles.signupLink}>Log In</Text>
              <View style={styles.customUnderline} />
            </TouchableOpacity>
          </View> */}
          {/* Divider */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
