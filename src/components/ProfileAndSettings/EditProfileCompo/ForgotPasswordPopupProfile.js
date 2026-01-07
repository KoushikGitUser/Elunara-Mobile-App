import { View, Text, Modal, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard, Animated, ScrollView, TextInput, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Toaster from '../../UniversalToaster/Toaster';
import { BlurView } from '@react-native-community/blur';
import { AlertCircle, Eye, EyeOff, Check, X } from 'lucide-react-native';
import { scaleFont } from '../../../utils/responsive';
import { useDispatch, useSelector } from 'react-redux';
import { appColors } from '../../../themes/appColors';
import { forgotPasswordFromProfile, updatePasswordForgotProfile, setForgotPasswordProfileStatesToNull } from '../../../redux/slices/authSlice';
import { triggerToast } from '../../../services/toast';

const ForgotPasswordPopupProfile = ({ visible, close }) => {
  // Popup state: 'getCode' or 'createPassword'
  const [popupState, setPopupState] = useState('getCode');

  // Password states
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // Focus states
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  // Visibility states
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Typing states
  const [hasStartedTypingNewPassword, setHasStartedTypingNewPassword] = useState(false);
  const [hasStartedTypingConfirm, setHasStartedTypingConfirm] = useState(false);

  // Keyboard animation
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const animatedValue = useState(new Animated.Value(0))[0];

  // Resend OTP timer
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // OTP input refs
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const { authStates } = useSelector((state) => state.Auth);

  // Password validation states
  const hasMinLength = newPassword.length >= 8;
  const hasNumberAndSpecial =
    /[0-9]/.test(newPassword) && /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const passwordsMatch =
    newPassword === confirmNewPassword && confirmNewPassword.length > 0;

  // Form validation
  const isNewPasswordValid = hasMinLength && hasNumberAndSpecial;
  const otpComplete = otp.every(digit => digit !== "");
  const isFormValid = isNewPasswordValid && passwordsMatch && otpComplete;

  // Error states
  const hasNewPasswordError = hasStartedTypingNewPassword && (!hasMinLength || !hasNumberAndSpecial);
  const showConfirmError = hasStartedTypingConfirm && !passwordsMatch;

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle OTP backspace
  const handleOtpKeyPress = (index, key) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle new password change
  const handleNewPasswordChange = (text) => {
    if (!hasStartedTypingNewPassword && text.length > 0) {
      setHasStartedTypingNewPassword(true);
    }
    setNewPassword(text);
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (text) => {
    if (!hasStartedTypingConfirm && text.length > 0) {
      setHasStartedTypingConfirm(true);
    }
    setConfirmNewPassword(text);
  };

  // Get hint color based on validation state
  const getHintColor = (isValid, hasStartedTyping) => {
    if (!hasStartedTyping) return "#757575";
    return isValid ? "#03B32F" : "#D00B0B";
  };

  // Handle Get Code button press
  const handleGetCode = () => {
    dispatch(forgotPasswordFromProfile({}));
  };

  // Handle Update Password button press
  const handleUpdatePassword = () => {
    if (isFormValid) {
      const payload = {
        otp: otp.join(""),
        password: newPassword,
        password_confirmation: confirmNewPassword
      };
      dispatch(updatePasswordForgotProfile(payload));
    }
  };

  // Handle Resend OTP
  const handleResendOtp = () => {
    if (!canResend) return;
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    dispatch(forgotPasswordFromProfile({}));
    setResendTimer(30);
    setCanResend(false);
  };

  // Reset all states when popup closes
  const resetAllStates = () => {
    setPopupState('getCode');
    setNewPassword("");
    setConfirmNewPassword("");
    setOtp(["", "", "", "", "", ""]);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setHasStartedTypingNewPassword(false);
    setHasStartedTypingConfirm(false);
    setResendTimer(30);
    setCanResend(false);
    dispatch(setForgotPasswordProfileStatesToNull());
  };

  // Handle close
  const handleClose = () => {
    resetAllStates();
    close(false);
    Keyboard.dismiss();
  };

  // Listen for isCodeSentForForgotPassInProfile
  useEffect(() => {
    if (authStates.isCodeSentForForgotPassInProfile === true) {
      setPopupState('createPassword');
      setResendTimer(30);
      setCanResend(false);
    }
  }, [authStates.isCodeSentForForgotPassInProfile]);

  // Listen for isPasswordUpdatedForgotProfile
  useEffect(() => {
    if (authStates.isPasswordUpdatedForgotProfile === true) {
      handleClose();
      triggerToast(
        "Password Updated Successfully!",
        "Your password has been reset successfully.",
        "success",
        3000
      );
    }
  }, [authStates.isPasswordUpdatedForgotProfile]);

  // Timer effect for resend OTP
  useEffect(() => {
    if (popupState !== 'createPassword') return;

    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer, popupState]);

  // Keyboard listeners
  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", (e) => {
      const height = e.endCoordinates.height;
      setKeyboardHeight(height);
      Animated.timing(animatedValue, {
        toValue: height / 2.5,
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

  // Reset states when popup opens
  useEffect(() => {
    if (visible) {
      resetAllStates();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <Toaster />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[styles.container]}
      >
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={5}
          reducedTransparencyFallbackColor="rgba(0,0,0,0.4)"
        />
        <View style={styles.androidBlur} /> 

        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={0.5}
          onPress={handleClose}
        />
        <Animated.View
          style={{
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 700],
                  outputRange: [0, -(keyboardHeight * 1.2)],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <ScrollView
            contentContainerStyle={[styles.scrollContent]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.modalSheet}>
              <View style={[styles.content, { paddingBottom: keyboardHeight > 0 ? keyboardHeight : 20 }]}>

                {/* State 1: Get Code */}
                {popupState === 'getCode' && (
                  <>
                    <Text style={styles.title}>Forgot Your Password?</Text>
                    <Text style={styles.description}>
                      No worries! We'll send you a verification code on your
                    </Text>
                    <Text style={[styles.description, { marginBottom: 35 }]}>
                      registered email to get you back on track.
                    </Text>

                    <TouchableOpacity
                      style={[
                        styles.primaryButton,
                        authStates.isCodeSentForForgotPassInProfile === "pending" && styles.primaryButtonDisabled,
                      ]}
                      onPress={handleGetCode}
                      activeOpacity={0.8}
                      disabled={authStates.isCodeSentForForgotPassInProfile === "pending"}
                    >
                      {authStates.isCodeSentForForgotPassInProfile === "pending" ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={styles.primaryButtonText}>Get Code</Text>
                      )}
                    </TouchableOpacity>
                  </>
                )}

                {/* State 2: Create Password */}
                {popupState === 'createPassword' && (
                  <>
                    <Text style={styles.title}>Create New Password</Text>
                    <Text style={[styles.description,{marginBottom:20}]}>
                      Almost there! Just set up your new password below.
                    </Text>

                    {/* Create Password Input */}
                    <View style={styles.inputSection}>
                      <Text style={styles.inputLabel}>Create Password</Text>
                      <View
                        style={[
                          styles.inputWrapper,
                          isNewPasswordFocused && !hasNewPasswordError && styles.inputWrapperFocused,
                          hasNewPasswordError && styles.inputWrapperError,
                        ]}
                      >
                        <TextInput
                          style={styles.input}
                          placeholder="Enter new password"
                          placeholderTextColor="#9CA3AF"
                          value={newPassword}
                          onChangeText={handleNewPasswordChange}
                          onFocus={() => setIsNewPasswordFocused(true)}
                          onBlur={() => setIsNewPasswordFocused(false)}
                          secureTextEntry={!showNewPassword}
                          returnKeyType="next"
                          autoCapitalize="none"
                        />
                        <View style={styles.errorIconContainer}>
                          {hasNewPasswordError ? (
                            <AlertCircle
                              size={20}
                              color="#D00B0B"
                              style={{ marginRight: 10 }}
                            />
                          ) : null}
                          <TouchableOpacity
                            onPress={() => setShowNewPassword(!showNewPassword)}
                            style={styles.eyeIconButton}
                          >
                            {showNewPassword ? (
                              <EyeOff size={20} color="#9CA3AF" />
                            ) : (
                              <Eye size={20} color="#9CA3AF" />
                            )}
                          </TouchableOpacity>
                        </View>
                      </View>

                      {/* Password validation hints */}
                      {isNewPasswordFocused && (
                        <View style={styles.passwordHintsContainer}>
                          <View style={styles.hintRow}>
                            {hasStartedTypingNewPassword ? (
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
                                    hasStartedTypingNewPassword
                                  ),
                                },
                              ]}
                            >
                              Minimum 8 characters
                            </Text>
                          </View>
                          <View style={styles.hintRow}>
                            {hasStartedTypingNewPassword ? (
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
                                    hasStartedTypingNewPassword
                                  ),
                                },
                              ]}
                            >
                              Must include a mix of numbers & special characters
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>

                    {/* Confirm Password Input */}
                    <View style={styles.inputSection}>
                      <Text style={styles.inputLabel}>Confirm Password</Text>
                      <View
                        style={[
                          styles.inputWrapper,
                          isConfirmPasswordFocused && !showConfirmError && styles.inputWrapperFocused,
                          showConfirmError && styles.inputWrapperError,
                        ]}
                      >
                        <TextInput
                          style={styles.input}
                          placeholder="Confirm new password"
                          placeholderTextColor="#9CA3AF"
                          value={confirmNewPassword}
                          onChangeText={handleConfirmPasswordChange}
                          onFocus={() => setIsConfirmPasswordFocused(true)}
                          onBlur={() => setIsConfirmPasswordFocused(false)}
                          secureTextEntry={!showConfirmPassword}
                          returnKeyType="next"
                          autoCapitalize="none"
                        />
                        <View style={styles.errorIconContainer}>
                          {showConfirmError ? (
                            <AlertCircle
                              size={20}
                              color="#D00B0B"
                              style={{ marginRight: 10 }}
                            />
                          ) : null}
                          <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={styles.eyeIconButton}
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={20} color="#9CA3AF" />
                            ) : (
                              <Eye size={20} color="#9CA3AF" />
                            )}
                          </TouchableOpacity>
                        </View>
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
                    </View>

                    {/* OTP Input */}
                    <View style={styles.inputSection}>
                      <Text style={styles.inputLabel}>Enter OTP</Text>
                      <View style={styles.otpContainer}>
                        {otp.map((digit, index) => (
                          <TextInput
                            key={index}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            style={styles.otpInput}
                            value={digit}
                            onChangeText={(value) => handleOtpChange(index, value)}
                            onKeyPress={({ nativeEvent: { key } }) =>
                              handleOtpKeyPress(index, key)
                            }
                            keyboardType="number-pad"
                            maxLength={1}
                            selectTextOnFocus
                          />
                        ))}
                      </View>
                    </View>

                    {/* Update Password Button */}
                    <TouchableOpacity
                      style={[
                        styles.primaryButton,
                        (!isFormValid || authStates.isPasswordUpdatedForgotProfile === "pending") &&
                          styles.primaryButtonDisabled,
                      ]}
                      onPress={handleUpdatePassword}
                      activeOpacity={0.8}
                      disabled={!isFormValid || authStates.isPasswordUpdatedForgotProfile === "pending"}
                    >
                      {authStates.isPasswordUpdatedForgotProfile === "pending" ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={styles.primaryButtonText}>Update Password</Text>
                      )}
                    </TouchableOpacity>

                    {/* Resend OTP */}
                    <View style={styles.resendContainer}>
                      <Text style={styles.resendText}>Didn't receive the OTP? </Text>
                      <TouchableOpacity
                        onPress={handleResendOtp}
                        disabled={!canResend}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[styles.resendLink, !canResend && { opacity: 0.5 }]}
                        >
                          {canResend
                            ? "Resend OTP"
                            : `Resend in 00:${resendTimer.toString().padStart(2, "0")}`}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

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
    marginBottom: 20,
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
  passwordHintsContainer: {
    marginTop: 8,
    gap: 6,
  },
  hintRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  passwordHintText: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
  },
  otpInput: {
    width: "14%",
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
  primaryButton: {
    backgroundColor: "#081A35",
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 35,
  },
  primaryButtonDisabled: {
    backgroundColor: "#CDD5DC",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Bold",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  resendText: {
    fontSize: scaleFont(13),
    color: "#757575",
    fontFamily: "Mukta-Regular",
  },
  resendLink: {
    fontSize: scaleFont(13),
    color: appColors.navyBlueShade,
    fontFamily: "Mukta-Regular",
    textDecorationLine: "underline",
  },
});

export default ForgotPasswordPopupProfile
