import { View, Text, Modal, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard, Animated, ScrollView, TextInput, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Toaster from '../../UniversalToaster/Toaster';
import { BlurView } from '@react-native-community/blur';
import { AlertCircle, Eye, EyeOff, Check, X } from 'lucide-react-native';
import { scaleFont } from '../../../utils/responsive';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { appColors } from '../../../themes/appColors';
import { updatePasswordWithCurrent } from '../../../redux/slices/authSlice';
import { triggerToast } from '../../../services/toast';

const UpdatePasswordPopup = ({updatePassPopup,close,setForgotPassProfilePopup}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [isCurrentPasswordFocused, setIsCurrentPasswordFocused] = useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [isCurrentPasswordTouched, setIsCurrentPasswordTouched] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const animatedValue = useState(new Animated.Value(0))[0];

  const [hasStartedTypingNewPassword, setHasStartedTypingNewPassword] = useState(false);
  const [hasStartedTypingConfirm, setHasStartedTypingConfirm] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { authStates } = useSelector((state) => state.Auth);

  // Validation states for new password
  const hasMinLength = newPassword.length >= 8;
  const hasNumberAndSpecial =
    /[0-9]/.test(newPassword) && /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const passwordsMatch =
    newPassword === confirmNewPassword && confirmNewPassword.length > 0;

  // Form validation
  const isNewPasswordValid = hasMinLength && hasNumberAndSpecial;
  const isFormValid = currentPassword.length >= 8 && isNewPasswordValid && passwordsMatch;

  // Error states
  const hasNewPasswordError = hasStartedTypingNewPassword && (!hasMinLength || !hasNumberAndSpecial);
  const showConfirmError = hasStartedTypingConfirm && !passwordsMatch;

  const validateCurrentPassword = (text, touched = isCurrentPasswordTouched) => {
    if (!text && touched) {
      setCurrentPasswordError("Current password is required");
    } else if (text && text.length < 8) {
      setCurrentPasswordError("Password must be at least 8 characters");
    } else {
      setCurrentPasswordError("");
    }
  };

  const handleCurrentPasswordChange = (text) => {
    setCurrentPassword(text);
    if (!isCurrentPasswordTouched) {
      setIsCurrentPasswordTouched(true);
    }
    validateCurrentPassword(text, true);
  };

  const handleNewPasswordChange = (text) => {
    if (!hasStartedTypingNewPassword && text.length > 0) {
      setHasStartedTypingNewPassword(true);
    }
    setNewPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    if (!hasStartedTypingConfirm && text.length > 0) {
      setHasStartedTypingConfirm(true);
    }
    setConfirmNewPassword(text);
  };

  const getHintColor = (isValid, hasStartedTyping) => {
    if (!hasStartedTyping) return "#757575";
    return isValid ? "#03B32F" : "#D00B0B";
  };

  useEffect(() => {
    if (authStates.isPasswordUpdated === true) {
      close(false);
      triggerToast(
        "Password Updated Successfully!",
        "Please use your new password the next time you log in",
        "success",
        3000
      );
    }
  }, [authStates.isPasswordUpdated]);

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

  const handleUpdatePassword = () => {
    if (isFormValid) {
      const payload = {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmNewPassword
      };
      dispatch(updatePasswordWithCurrent(payload));
    }
  };

  return (
    <Modal
      visible={updatePassPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => close(false)}
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
                <Text style={styles.title}>Update Your Password</Text>
                <Text style={styles.description}>
                  For your account security, please enter your current
                </Text>
                <Text style={[styles.description, { marginBottom: 35 }]}>
                  password and choose a new, strong password.
                </Text>

                {/* Current Password */}
                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>Current Password</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      isCurrentPasswordFocused && styles.inputWrapperFocused,
                      (currentPasswordError || (isCurrentPasswordTouched && !currentPassword)) &&
                        styles.inputWrapperError,
                    ]}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="Enter current password"
                      placeholderTextColor="#9CA3AF"
                      value={currentPassword}
                      onChangeText={handleCurrentPasswordChange}
                      onFocus={() => setIsCurrentPasswordFocused(true)}
                      onBlur={() => {
                        setIsCurrentPasswordFocused(false);
                        setIsCurrentPasswordTouched(true);
                        validateCurrentPassword(currentPassword, true);
                      }}
                      secureTextEntry={!showCurrentPassword}
                      returnKeyType="next"
                      autoCapitalize="none"
                    />
                    <View style={styles.errorIconContainer}>
                      {currentPasswordError || (isCurrentPasswordTouched && !currentPassword) ? (
                        <AlertCircle
                          size={20}
                          color="#D00B0B"
                          style={{ marginRight: 10 }}
                        />
                      ) : null}
                      <TouchableOpacity
                        onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                        style={styles.eyeIconButton}
                      >
                        {showCurrentPassword ? (
                          <EyeOff size={20} color="#9CA3AF" />
                        ) : (
                          <Eye size={20} color="#9CA3AF" />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  {currentPasswordError || (isCurrentPasswordTouched && !currentPassword) ? (
                    <Text style={styles.errorText}>
                      {currentPasswordError || "Current password is required"}
                    </Text>
                  ) : null}

                  {/* Forgot Password Link */}
                  <TouchableOpacity
                    style={styles.forgotPasswordContainer}
                    onPress={() => {
                      close(false);
                      setForgotPassProfilePopup(true)
                    }}
                  >
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                {/* New Password */}
                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>New Password</Text>
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

                {/* Confirm New Password */}
                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>Confirm New Password</Text>
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
                      returnKeyType="done"
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

                {/* Update Button */}
                <TouchableOpacity
                  style={[
                    styles.verifyButton,
                    (!isFormValid || authStates.isPasswordUpdated === "pending") &&
                      styles.verifyButtonDisabled,
                  ]}
                  onPress={handleUpdatePassword}
                  activeOpacity={0.8}
                  disabled={!isFormValid || authStates.isPasswordUpdated === "pending"}
                >
                  {authStates.isPasswordUpdated === "pending" ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.verifyButtonText}>Update Password</Text>
                  )}
                </TouchableOpacity>
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
    marginBottom: 20,
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
  errorText: {
    color: "#D00B0B",
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    marginTop: 4,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: scaleFont(13),
    color: appColors.navyBlueShade,
    fontFamily: "Mukta-Regular",
    textDecorationLine: "underline",
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
  verifyButton: {
    backgroundColor: "#081A35",
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
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
});

export default UpdatePasswordPopup
