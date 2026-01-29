import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useMemo, useState } from "react";
import mainLogo from "../../assets/images/Knowledge Chakra 1.png";
import chakraLogo from "../../assets/images/Knowledge Chakra 2.png";
import google from "../../assets/images/search.png";
import LinkedIn from "../../assets/images/linkedin.png";
import apple from "../../assets/images/apple-logo.png";
import SignInSlider from "../../components/SignIn/SignInSlider/SignInSlider";
import { createStyles } from "./WelcomeScreen.styles";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import {
  signWithGoogle,
  signWithApple,
  signWithLinkedIn,
} from "../../redux/slices/authSlice";
import TermsOfUseModal from "../../components/WelcomeScreen/TermsOfUseModal";
import PrivacyPolicyModal from "../../components/WelcomeScreen/PrivacyPolicyModal";

const WelcomeScreen = () => {
  // You can pass custom props to override default styles
  const styleProps = {};

  const styles = useMemo(() => createStyles(styleProps), []);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { authStates } = useSelector((state) => state.Auth);

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const [fontsLoaded] = useFonts({
    "Mukta-Bold": require("../../../assets/fonts/Mukta-Bold.ttf"),
    "Mukta-Regular": require("../../../assets/fonts/Mukta-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
    }
  }, [fontsLoaded]);



  useEffect(() => {
    const backAction = () => {
      return true; // prevent default behavior (exit)
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove(); // clean up
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#ff0000ff"
        />
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image source={mainLogo} style={styles.mainLogo} />
            </View>
            <View>
              <Image source={chakraLogo} style={styles.chakraLogo} />
            </View>
          </View>
          <SignInSlider />
          {/* Buttons Section */}
          <View style={styles.buttonsContainer}>
            {/* Google Button */}
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  "https://api.elunara.ai/api/v1/auth/google/redirect?platform=android"
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
                  "https://api.elunara.ai/api/v1/auth/linkedin/redirect?platform=android"
                );
              }}
              style={styles.socialButton}
              activeOpacity={0.7}
            >
              <Image source={LinkedIn} style={styles.socialIcons} />
              <Text style={styles.socialButtonText}>
                Continue with LinkedIn
              </Text>
            </TouchableOpacity>



            {/* Divider */}
            <Text style={styles.divider}>or</Text>

            {/* Email Button */}
            <TouchableOpacity
              onPress={() => navigation.navigate("signin")}
              style={styles.emailButton}
              activeOpacity={0.8}
            >
              <Text style={styles.emailButtonText}>Login with Email</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("signup")}
                activeOpacity={0.7}
              >
                <Text style={styles.signupLink}>Sign Up</Text>
                <View style={styles.customUnderline} />
              </TouchableOpacity>
            </View>

            {/* Footer Links */}
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() => setShowTermsModal(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.footerLink}>Terms Of Use</Text>
              </TouchableOpacity>
              <Text style={styles.footerDot}> • </Text>
              <TouchableOpacity
                onPress={() => setShowPrivacyModal(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.footerLink}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modals */}
      <TermsOfUseModal
        visible={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
      <PrivacyPolicyModal
        visible={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
    </SafeAreaView>
  );
};

export default WelcomeScreen;
