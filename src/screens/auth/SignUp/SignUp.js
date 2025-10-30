import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useMemo, useState } from "react";
import chakraLogo from "../../../assets/images/Knowledge Chakra 2.png";
import google from "../../../assets/images/search.png";
import LinkedIn from "../../../assets/images/linkedin.png";
import apple from "../../../assets/images/apple-logo.png";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./SignUp.styles";
import VerificationMailPopup from "../../../components/SignUp/VerificationMailPopup";
import MobileVerificationPopup from "../../../components/ChatScreen/MobileVerificationPopup";
import { scaleFont } from "../../../utils/responsive";
import GradientText from "../../../components/common/GradientText";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [verificationMailSent, setVerificationMailSent] = useState(false);
  const [mobileVerificationPopup, setMobileVerificationPopup] = useState(false);

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
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {verificationMailSent && (
        <VerificationMailPopup
          close={setVerificationMailSent}
          verificationMailSent={verificationMailSent}
        />
      )}
      {mobileVerificationPopup && (
        <MobileVerificationPopup
          close={setMobileVerificationPopup}
          mobileVerificationPopup={mobileVerificationPopup}
        />
      )}
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
                  fontWeight: "400",
                  color: "black",
                  fontSize: scaleFont(22),
                  flexDirection: "row",
                  alignItems: "center",
                },
              ]}
            >
              <GradientText
                fullWidth={false}
                children="Join Elunara"
                fontSize={scaleFont(28)}
              />
              <Text
                style={[
                  styles.headTitle,
                  {
                    fontWeight: "400",
                    marginTop: 1,
                    color: "black",
                    fontSize: scaleFont(22),
                    paddingLeft:10
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
                  fontSize: scaleFont(22),
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

        {/* Email Label */}
        <View style={styles.inputFieldsMain}>
          <View style={styles.fullnameInput}>
            <View style={styles.nameInput}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your First Name"
                placeholderTextColor="#B0B7C3"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.nameInput}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your Last Name"
                placeholderTextColor="#B0B7C3"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          {/* Password Label */}
          <Text style={[styles.label, { marginTop: 20 }]}>Email ID</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your Email ID"
              placeholderTextColor="#B0B7C3"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Forgot Password */}
          <View style={styles.forgotPasswordMain} activeOpacity={0.6}>
            <TouchableOpacity
              onPress={() => setIsChecked(!isChecked)}
              style={styles.checkbox}
            >
              {isChecked && (
                <Ionicons name="checkmark-outline" size={16} color="black" />
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
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.link}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Email Button */}
          <TouchableOpacity
            onPress={() => setVerificationMailSent(true)}
            style={styles.emailButton}
            activeOpacity={0.8}
          >
            <Text style={styles.emailButtonText}>Verify Email</Text>
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
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
