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
import React, { useEffect, useMemo, useState } from "react";
import * as SecureStore from "expo-secure-store";
import chakraLogo from "../../../assets/images/Knowledge Chakra 2.png";
import google from "../../../assets/images/search.png";
import LinkedIn from "../../../assets/images/linkedin.png";
import apple from "../../../assets/images/apple-logo.png";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./ChangePassword.styles";
import { useFonts } from "expo-font";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../redux/slices/authSlice";
import { appColors } from "../../../themes/appColors";
import { Check, X, Info } from "lucide-react-native";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [hasStartedTypingPassword, setHasStartedTypingPassword] =
    useState(false);
  const [hasStartedTypingConfirm, setHasStartedTypingConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

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
    if (!hasStartedTyping) return "#6B7280"; // Default gray
    return isValid ? "#22C55E" : "#D00B0B"; // Green or Red
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

  const resetPasswordFunction = async () => {
    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync("authToken");
      const formData = new FormData();
      formData.append("token", token);
      formData.append("password", password);
      formData.append("password_confirmation", confirmPassword);
      dispatch(resetPassword(formData));
    } catch (error) {
      console.error("Error retrieving auth token:", error);
    } finally {
      setLoading(false);
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
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
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

          {/* Continue Button */}
          <TouchableOpacity
            onPress={() => {
              if (isFormValid) {
                resetPasswordFunction();
              }
            }}
            style={[
              styles.emailButton,
              (!isFormValid || loading) && styles.emailButtonDisabled,
            ]}
            activeOpacity={0.8}
            disabled={!isFormValid}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.emailButtonText}>Continue</Text>
            )}
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("signin")}>
              <Text style={styles.signupLink}>Log In</Text>
              <View style={styles.customUnderline} />
            </TouchableOpacity>
          </View>
          {/* Divider */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
