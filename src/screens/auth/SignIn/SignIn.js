import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useMemo, useState } from "react";
import { createStyles } from "./SignIn.styles";
import mainLogo from "../../../assets/images/Knowledge Chakra 1.png";
import chakraLogo from "../../../assets/images/Knowledge Chakra 2.png";
import google from "../../../assets/images/search.png";
import LinkedIn from "../../../assets/images/linkedin.png";
import apple from "../../../assets/images/apple-logo.png";
import SignInSlider from "../../../components/SignIn/SignInSlider/SignInSlider";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ForgotPassword from "../../../components/SignIn/ForgotPassword/ForgotPassword";
import GradientText from "../../../components/common/GradientText";
import { scaleFont } from "../../../utils/responsive";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toggleForgotPassword, setToggleForgotPassword] = useState(false);

  const styleProps = {
    // Example: backgroundColor: '#F5F5F5',
    // Example: headingColor: '#000000',
    // Add any dynamic values here
  };

  const navigation = useNavigation();

  const styles = useMemo(() => createStyles(styleProps), []);
  const subtitle =
    "Pick up right where you left off  /n—smarter learning awaits.";

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
            <Feather
              onPress={() => navigation.navigate("welcome")}
              name="arrow-left"
              size={24}
              color="black"
            />
            {
              <GradientText
                marginBottom={0}
                marginTop={20}
                children=" Welcome back"
                fullWidth={true}
                fontSize={scaleFont(25)}
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
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#B0B7C3"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password Label */}
          <Text style={[styles.label, { marginTop: 20 }]}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              placeholderTextColor="#B0B7C3"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIconContainer}
              activeOpacity={0.7}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#0F1419"
              />
            </TouchableOpacity>
          </View>

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
            onPress={() => navigation.navigate("chat")}
            style={styles.emailButton}
            activeOpacity={0.8}
          >
            <Text style={styles.emailButtonText}>Login</Text>
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
