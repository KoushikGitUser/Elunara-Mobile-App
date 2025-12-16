import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useMemo, useState } from "react";
import { createStyles } from "./SignIn.styles";
import mainLogo from "../../../assets/images/Knowledge Chakra 1.png";
import chakraLogo from "../../../assets/images/Knowledge Chakra 2.png";
import google from "../../../assets/images/search.png";
import LinkedIn from "../../../assets/images/linkedin.png";
import apple from "../../../assets/images/apple-logo.png";
import SignInSlider from "../../../components/SignIn/SignInSlider/SignInSlider";
import { useNavigation } from "@react-navigation/native";
import ForgotPassword from "../../../components/SignIn/ForgotPassword/ForgotPassword";
import GradientText from "../../../components/common/GradientText";
import { scaleFont } from "../../../utils/responsive";
import { triggerToast } from "../../../services/toast";
import { useFonts } from "expo-font";
import { appColors } from "../../../themes/appColors";
import BackArrowLeftIcon from "../../../../assets/SvgIconsComponent/BackArrowLeftIcon";
import { AlertCircle, Eye, EyeOff } from "lucide-react-native";
import { useDispatch } from "react-redux";
import { userSignIn } from "../../../redux/slices/authSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toggleForgotPassword, setToggleForgotPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading,setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  // Real-time validation functions
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
    if (text.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (text.length > 32) {
      return "Password must not exceed 32 characters";
    }
    return "";
  };

  const handleUserSignIn = () => {
    setLoading(true);
    const newErrors = {
      email: "",
      password: "",
    };
    let hasError = false;

    // Validate email
    if (!email.trim()) {
      newErrors.email = "Email is required";
      hasError = true;
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = "Valid Email ID required";
        hasError = true;
      }
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      hasError = true;
    } else if (password.length > 32) {
      newErrors.password = "Password must not exceed 32 characters";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

  
   setTimeout(() => {
    setLoading(false);
    const formData = new FormData();
    formData.append("email", email.trim());
    formData.append("password", password.trim());
    dispatch(userSignIn(formData));

    // Proceed with login
    navigation.navigate("chat");
   }, 2500);


  };

  const styleProps = {
    // Example: backgroundColor: '#F5F5F5',
    // Example: headingColor: '#000000',
    // Add any dynamic values here
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
      {toggleForgotPassword && (
        <ForgotPassword
          close={setToggleForgotPassword}
          toggleForgotPassword={toggleForgotPassword}
        />
      )}
      <ScrollView
        contentContainerStyle={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
        style={styles.container}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
           <TouchableOpacity onPress={() => navigation.navigate("welcome")}>
              <BackArrowLeftIcon />
            </TouchableOpacity>
            {
              <GradientText
                marginBottom={0}
                marginTop={20}
                children=" Welcome back"
                fullWidth={true}
                fontSize={scaleFont(24)}
              />
            }
            <Text style={styles.headDesc}>
              Pick up right where you left off
            </Text>
            <Text style={[styles.headDesc, { marginTop: 0 }]}>
              —smarter learning awaits.
            </Text>
          </View>
          <View>
            <Image source={chakraLogo} style={styles.chakraLogo} />
          </View>
        </View>

        {/* Email Label */}
        <View style={styles.inputFieldsMain}>
          <Text style={styles.label}>Email</Text>
          <View style={[
            styles.input,
            { flexDirection: "row", alignItems: "center", paddingHorizontal: 0 },
            focusedInput === "email" && { borderColor: appColors.navyBlueShade },
            errors.email && { borderColor: "#D00B0B", borderWidth: 2 },
          ]}>
            <TextInput
              style={{ flex: 1, height: "100%", paddingHorizontal: 15, fontFamily: "Mukta-Regular", fontSize: scaleFont(14) }}
              placeholder="Enter your email"
              placeholderTextColor="#B0B7C3"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors(prev => ({ ...prev, email: validateEmail(text) }));
              }}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <AlertCircle size={20} color="#D00B0B" style={{ marginRight: 15 }} />
            )}
          </View>
          {errors.email && (
            <Text style={{ color: "#D00B0B", fontSize: scaleFont(11), marginTop: 4, fontFamily: "Mukta-Regular" }}>
              {errors.email}
            </Text>
          )}

          {/* Password Label */}
          <Text style={[styles.label, { marginTop: 20 }]}>Password</Text>
          <View style={[
            styles.passwordContainer,
            focusedInput === "password" && { borderColor: appColors.navyBlueShade },
            errors.password && { borderColor: "#D00B0B", borderWidth: 2 },
          ]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              placeholderTextColor="#B0B7C3"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors(prev => ({ ...prev, password: validatePassword(text) }));
              }}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.password && (
              <AlertCircle size={20} color="#D00B0B" style={{ marginRight: 10 }} />
            )}
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{ marginRight: 5 }}
              activeOpacity={0.7}
            >
              {showPassword ? (
                <EyeOff size={22} color="#0F1419" />
              ) : (
                <Eye size={22} color="#0F1419" />
              )}
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={{ color: "#D00B0B", fontSize: scaleFont(11), marginTop: 4, fontFamily: "Mukta-Regular" }}>
              {errors.password}
            </Text>
          )}

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => setToggleForgotPassword(true)}
            style={styles.forgotPasswordMain}
            activeOpacity={0.6}
          >
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          {/* Email Button */}
          <TouchableOpacity
            onPress={handleUserSignIn}
            style={[
              styles.emailButton,
              (!email.trim() || !password || loading) && { backgroundColor: "#CDD5DC" },
            ]}
            activeOpacity={0.8}
            disabled={!email.trim() || !password || loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.emailButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("signup")}>
              <Text style={styles.signupLink}>Sign Up</Text>
              <View style={styles.customUnderline} />
            </TouchableOpacity>
          </View>
          <Text style={styles.divider}>or</Text>
          {/* Divider */}
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsContainer}>
          {/* Google Button */}
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
            <Image source={google} style={styles.socialIcons} />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* LinkedIn Button */}
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
            <Image source={LinkedIn} style={styles.socialIcons} />
            <Text style={styles.socialButtonText}>Continue with LinkedIn</Text>
          </TouchableOpacity>

          {/* Apple Button */}
          <TouchableOpacity
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

export default SignIn;
