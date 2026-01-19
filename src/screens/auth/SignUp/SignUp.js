import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useMemo, useState } from "react";
import chakraLogo from "../../../assets/images/Knowledge Chakra 2.png";
import google from "../../../assets/images/search.png";
import LinkedIn from "../../../assets/images/linkedin.png";
import apple from "../../../assets/images/apple-logo.png";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./SignUp.styles";
import VerificationMailPopup from "../../../components/SignUp/VerificationMailPopup";
import MobileVerificationPopup from "../../../components/ChatScreen/MobileVerificationPopup";
import { scaleFont } from "../../../utils/responsive";
import GradientText from "../../../components/common/GradientText";
import { useDispatch, useSelector } from "react-redux";
import { useFonts } from "expo-font";
import { appColors } from "../../../themes/appColors";
import { Check, AlertCircle, Eye, EyeOff } from "lucide-react-native";
import BackArrowLeftIcon from "../../../../assets/SvgIconsComponent/BackArrowLeftIcon";
import {
  userSignUp,
  signWithGoogle,
  signWithApple,
  signWithLinkedIn,
  setIsSignedUpToFalse,
} from "../../../redux/slices/authSlice";
import { triggerToast } from "../../../services/toast";
import VerifyMailOtpPopup from "../../../components/SignUp/VerifyMailOtpPopup";
import { setUserMailIDOnSignup } from "../../../redux/slices/globalDataSlice";
import AccountNotRecoveredPopup from "../../../components/SignUp/AccountNotRecoveredPopup";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [verificationMailSent, setVerificationMailSent] = useState(false);
  const [mobileVerificationPopup, setMobileVerificationPopup] = useState(false);
  const [verifyMailOtpPopup, setVerifyMailOtpPopup] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [toggleAccNotRecovered, setToggleAccNotRecovered] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    checkbox: "",
  });
  const { authStates } = useSelector((state) => state.Auth);

  useEffect(() => {
    if (authStates.isSignedUp == true) {
      setVerificationMailSent(true);
      dispatch(setIsSignedUpToFalse());
    } else if (authStates.isAccountRecoverable) {
      setToggleAccNotRecovered(true);
    }
  }, [authStates.isSignedUp, authStates.isAccountRecoverable]);

  // Social login redirect handlers
  useEffect(() => {
    if (authStates.isRedirectURLReceivedForGoogle == true) {
      Linking.openURL(authStates.redirectURLForGoogle);
    }
  }, [authStates.isRedirectURLReceivedForGoogle]);

  useEffect(() => {
    if (authStates.isRedirectURLReceivedForApple == true) {
      Linking.openURL(authStates.redirectURLForApple);
    }
  }, [authStates.isRedirectURLReceivedForApple]);

  useEffect(() => {
    if (authStates.isRedirectURLReceivedForLinkedIn == true) {
      Linking.openURL(authStates.redirectURLForLinkedIn);
    }
  }, [authStates.isRedirectURLReceivedForLinkedIn]);

  useEffect(() => {
    const backAction = () => {
      return true; // prevent default behavior (exit)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // clean up
  }, []);

  const styleProps = {};

  // Real-time validation functions
  const validateFirstName = (text) => {
    if (!text.trim()) {
      return "First name is required";
    }
    const firstNameRegex = /^[A-Za-z\s]+$/;
    if (!firstNameRegex.test(text.trim())) {
      return "Only alphabets and space allowed";
    }
    return "";
  };

  const validateLastName = (text) => {
    if (!text.trim()) {
      return "Last name is required";
    }
    const lastNameRegex = /^[A-Za-z]+$/;
    if (!lastNameRegex.test(text.trim())) {
      return "No space or number allowed";
    }
    return "";
  };

  const validateEmail = (text) => {
    if (!text.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(text.trim())) {
      return "Valid Email ID required";
    }
    return "";
  };

  const validatePassword = (text) => {
    if (!text) {
      return "Password is required";
    }
    if (text.length < 8 || text.length > 32) {
      return "Password must be between 8 and 32 characters";
    }
    const hasLetter = /[A-Za-z]/.test(text);
    const hasNumber = /[0-9]/.test(text);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(text);
    if (!hasLetter || !hasNumber || !hasSpecialChar) {
      return "Password must include letter, number, and special character";
    }
    return "";
  };

  const validateConfirmPassword = (text, passwordValue) => {
    if (!text) {
      return "Confirm password is required";
    }
    if (passwordValue !== text) {
      return "Passwords do not match";
    }
    return "";
  };

  const dispatch = useDispatch();

  const hasErrors = Object.values(errors).some((error) => error !== "");

  const handleUserSignUp = () => {
    if (hasErrors) return;
    const formData = new FormData();
    formData.append("first_name", firstName.trim());
    formData.append("last_name", lastName.trim());
    formData.append("email", email.trim());
    formData.append("password", password);
    formData.append("password_confirmation", confirmPassword);
    dispatch(setUserMailIDOnSignup(email.trim()));
    dispatch(userSignUp(formData));
  };

  const navigation = useNavigation();

  const styles = useMemo(() => createStyles(styleProps), []);
  const subtitle =
    "Pick up right where you left off  /n—smarter learning awaits.";

  const [fontsLoaded] = useFonts({
    "Mukta-Bold": require("../../../../assets/fonts/Mukta-Bold.ttf"),
    "Mukta-Regular": require("../../../../assets/fonts/Mukta-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
    }
  }, [fontsLoaded]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {verificationMailSent && (
        <VerificationMailPopup
          setVerifyMailOtpPopup={setVerifyMailOtpPopup}
          close={setVerificationMailSent}
          verificationMailSent={verificationMailSent}
        />
      )}
      {toggleAccNotRecovered && (
        <AccountNotRecoveredPopup
          close={setToggleAccNotRecovered}
          toggleAccNotRecovered={toggleAccNotRecovered}
        />
      )}
      {verifyMailOtpPopup && (
        <VerifyMailOtpPopup
          close={setVerifyMailOtpPopup}
          verifyMailOtpPopup={verifyMailOtpPopup}
        />
      )}
      {mobileVerificationPopup && (
        <MobileVerificationPopup
          close={setMobileVerificationPopup}
          mobileVerificationPopup={mobileVerificationPopup}
        />
      )}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <TouchableOpacity
            style={{ position: "" }}
            onPress={() => navigation.navigate("welcome")}
          >
            <BackArrowLeftIcon />
          </TouchableOpacity>

          {/* <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginTop: 20,
                width: "auto",
              }}
            > */}

          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
              },
            ]}
          >
            <GradientText
              marginBottom={0}
              marginTop={20}
              children="Join Elunara"
              fullWidth={false}
              widthNumber={0.5}
              fontSize={scaleFont(25)}
            />
            <Text
              style={[
                styles.headTitle,
                {
                  marginTop: 15,
                  color: "black",
                  fontSize: scaleFont(24),
                  paddingLeft: 10,
                  fontFamily: "Mukta-Regular",
                },
              ]}
            >
              - Your AI
            </Text>
          </View>
          {/* </View> */}

          <Text
            style={[
              styles.headTitle,
              {
                fontWeight: "400",
                marginTop: 1,
                color: "black",
                fontSize: scaleFont(24),
                fontFamily: "Mukta-Regular",
              },
            ]}
          >
            Learning Companion
          </Text>
          <Text style={styles.headDesc}>
            One account. Smarter questions, faster
          </Text>
          <Text style={[styles.headDesc, { marginTop: 0 }]}>
            answers, better learning. Let's get started.
          </Text>
        </View>
        <View>
          <Image source={chakraLogo} style={styles.chakraLogo} />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
        style={styles.container}
      >
        {/* Header Section */}

        {/* Email Label */}
        <View style={styles.inputFieldsMain}>
          <View style={[styles.fullnameInput, { alignItems: "flex-start" }]}>
            <View style={styles.nameInput}>
              <Text style={styles.label}>First Name</Text>
              <View
                style={[
                  styles.input,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 0,
                  },
                  focusedInput === "firstName" && {
                    borderColor: appColors.navyBlueShade,
                  },
                  errors.firstName && {
                    borderColor: "#D00B0B",
                    borderWidth: 2,
                  },
                ]}
              >
                <TextInput
                  style={{
                    flex: 1,
                    height: "100%",
                    paddingHorizontal: 15,
                    fontFamily: "Mukta-Regular",
                    fontSize: scaleFont(14),
                  }}
                  placeholder="Your First Name"
                  placeholderTextColor="#B0B7C3"
                  value={firstName}
                  onChangeText={(text) => {
                    setFirstName(text);
                    setErrors((prev) => ({
                      ...prev,
                      firstName: validateFirstName(text),
                    }));
                  }}
                  onFocus={() => setFocusedInput("firstName")}
                  onBlur={() => setFocusedInput(null)}
                />
                {errors.firstName && (
                  <AlertCircle
                    size={20}
                    color="#D00B0B"
                    style={{ marginRight: 10 }}
                  />
                )}
              </View>
              <View style={{ minHeight: 20, marginTop: 4 }}>
                {errors.firstName && (
                  <Text
                    style={{
                      color: "#D00B0B",
                      fontSize: scaleFont(11),
                      fontFamily: "Mukta-Regular",
                    }}
                  >
                    {errors.firstName}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.nameInput}>
              <Text style={styles.label}>Last Name</Text>
              <View
                style={[
                  styles.input,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 0,
                  },
                  focusedInput === "lastName" && {
                    borderColor: appColors.navyBlueShade,
                  },
                  errors.lastName && { borderColor: "#D00B0B", borderWidth: 2 },
                ]}
              >
                <TextInput
                  style={{
                    flex: 1,
                    height: "100%",
                    paddingHorizontal: 15,
                    fontFamily: "Mukta-Regular",
                    fontSize: scaleFont(14),
                  }}
                  placeholder="Your Last Name"
                  placeholderTextColor="#B0B7C3"
                  value={lastName}
                  onChangeText={(text) => {
                    setLastName(text);
                    setErrors((prev) => ({
                      ...prev,
                      lastName: validateLastName(text),
                    }));
                  }}
                  onFocus={() => setFocusedInput("lastName")}
                  onBlur={() => setFocusedInput(null)}
                />
                {errors.lastName && (
                  <AlertCircle
                    size={20}
                    color="#D00B0B"
                    style={{ marginRight: 10 }}
                  />
                )}
              </View>
              <View style={{ minHeight: 20, marginTop: 4 }}>
                {errors.lastName && (
                  <Text
                    style={{
                      color: "#D00B0B",
                      fontSize: scaleFont(11),
                      fontFamily: "Mukta-Regular",
                    }}
                  >
                    {errors.lastName}
                  </Text>
                )}
              </View>
            </View>
          </View>

          {/* Password Label */}
          <Text style={[styles.label, { marginTop: 20 }]}>Email ID</Text>
          <View
            style={[
              styles.passwordContainer,
              focusedInput === "email" && {
                borderColor: appColors.navyBlueShade,
              },
              errors.email && { borderColor: "#D00B0B", borderWidth: 2 },
            ]}
          >
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your Email ID"
              placeholderTextColor="#B0B7C3"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors((prev) => ({ ...prev, email: validateEmail(text) }));
              }}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.email && (
              <AlertCircle
                size={20}
                color="#D00B0B"
                style={{ marginRight: 15 }}
              />
            )}
          </View>
          {errors.email && (
            <Text
              style={{
                color: "#D00B0B",
                fontSize: scaleFont(11),
                marginTop: 4,
                fontFamily: "Mukta-Regular",
              }}
            >
              {errors.email}
            </Text>
          )}
          <Text style={[styles.label, { marginTop: 20 }]}>Password</Text>
          <View
            style={[
              styles.passwordContainer,
              focusedInput === "password" && {
                borderColor: appColors.navyBlueShade,
              },
              errors.password && { borderColor: "#D00B0B", borderWidth: 2 },
            ]}
          >
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your Password"
              placeholderTextColor="#B0B7C3"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors((prev) => ({
                  ...prev,
                  password: validatePassword(text),
                  confirmPassword: confirmPassword
                    ? validateConfirmPassword(confirmPassword, text)
                    : prev.confirmPassword,
                }));
              }}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.password && (
              <AlertCircle
                size={20}
                color="#D00B0B"
                style={{ marginRight: 10 }}
              />
            )}
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{ marginRight: 15 }}
            >
              {showPassword ? (
                <EyeOff size={22} color="#0F1419" />
              ) : (
                <Eye size={22} color="#0F1419" />
              )}
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text
              style={{
                color: "#D00B0B",
                fontSize: scaleFont(11),
                marginTop: 4,
                fontFamily: "Mukta-Regular",
              }}
            >
              {errors.password}
            </Text>
          )}
          <Text style={[styles.label, { marginTop: 20 }]}>
            Confirm Password
          </Text>
          <View
            style={[
              styles.passwordContainer,
              focusedInput === "confirmPassword" && {
                borderColor: appColors.navyBlueShade,
              },
              errors.confirmPassword && {
                borderColor: "#D00B0B",
                borderWidth: 2,
              },
            ]}
          >
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your Password Again"
              placeholderTextColor="#B0B7C3"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setErrors((prev) => ({
                  ...prev,
                  confirmPassword: validateConfirmPassword(text, password),
                }));
              }}
              onFocus={() => setFocusedInput("confirmPassword")}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.confirmPassword && (
              <AlertCircle
                size={20}
                color="#D00B0B"
                style={{ marginRight: 10 }}
              />
            )}
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ marginRight: 15 }}
            >
              {showConfirmPassword ? (
                <EyeOff size={22} color="#0F1419" />
              ) : (
                <Eye size={22} color="#0F1419" />
              )}
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && (
            <Text
              style={{
                color: "#D00B0B",
                fontSize: scaleFont(11),
                marginTop: 4,
                fontFamily: "Mukta-Regular",
              }}
            >
              {errors.confirmPassword}
            </Text>
          )}

          {/* Forgot Password */}
          <View style={styles.forgotPasswordMain} activeOpacity={0.6}>
            <TouchableOpacity
              onPress={() => {
                const newChecked = !isChecked;
                setIsChecked(newChecked);
                setErrors((prev) => ({
                  ...prev,
                  checkbox: newChecked
                    ? ""
                    : "Please agree to the Terms of Use and Privacy Policy",
                }));
              }}
              style={[
                styles.radioOuter,
                {
                  borderColor: isChecked ? appColors.navyBlueShade : "#D3DAE5",
                  backgroundColor: isChecked
                    ? appColors.navyBlueShade
                    : "transparent",
                },
                errors.checkbox && { borderColor: "#D00B0B", borderWidth: 2 },
              ]}
            >
              {isChecked && (
                <Check size={19} color="white" strokeWidth={1.75} />
              )}
            </TouchableOpacity>

            <View style={styles.textContainer}>
              <Text style={styles.text}>I agree to the </Text>
              <TouchableOpacity
                onPress={() => setMobileVerificationPopup(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.link}>Terms of Use</Text>
              </TouchableOpacity>
              <Text style={styles.text}> and </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("changepass")}
                activeOpacity={0.7}
              >
                <Text style={styles.link}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
          {errors.checkbox && (
            <Text
              style={{
                color: "#D00B0B",
                fontSize: scaleFont(11),
                marginTop: -15,
                marginBottom: 15,
                fontFamily: "Mukta-Regular",
              }}
            >
              {errors.checkbox}
            </Text>
          )}
          {/* Email Button */}
          <TouchableOpacity
            onPress={() => handleUserSignUp()}
            style={[
              styles.emailButton,
              (hasErrors ||
                !firstName.trim() ||
                !lastName.trim() ||
                !email.trim() ||
                !password ||
                !confirmPassword ||
                !isChecked ||
                authStates.isSignedUp == "pending") && {
                backgroundColor: "#CDD5DC",
              },
            ]}
            activeOpacity={0.8}
            disabled={
              authStates.isSignedUp == "pending" ||
              hasErrors ||
              !firstName.trim() ||
              !lastName.trim() ||
              !email.trim() ||
              !password ||
              !confirmPassword ||
              !isChecked
            }
          >
            {authStates.isSignedUp == "pending" ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.emailButtonText}>Verify Email</Text>
            )}
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("signin")}
              activeOpacity={0.7}
            >
              <Text style={styles.signupLink}>Log In</Text>
              <View style={styles.customUnderline} />
            </TouchableOpacity>
          </View>
          <Text style={styles.divider}>or</Text>
          {/* Divider */}
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsContainer}>
          {/* Google Button */}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "http://api.elunara.ai/api/v1/auth/google/redirect?platform=android"
              );
            }}
            style={styles.socialButton}
            activeOpacity={0.7}
          >
            <Image source={google} style={styles.socialIcons} />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* LinkedIn Button */}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "http://api.elunara.ai/api/v1/auth/linkedin/redirect?platform=android"
              );
            }}
            style={styles.socialButton}
            activeOpacity={0.7}
          >
            <Image source={LinkedIn} style={styles.socialIcons} />
            <Text style={styles.socialButtonText}>Continue with LinkedIn</Text>
          </TouchableOpacity>

          {/* Apple Button */}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "http://api.elunara.ai/api/v1/auth/apple/redirect?platform=android"
              );
            }}
            style={[styles.socialButton, { marginBottom: 0 }]}
            activeOpacity={0.7}
          >
            <Image source={apple} style={styles.socialIcons} />
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
