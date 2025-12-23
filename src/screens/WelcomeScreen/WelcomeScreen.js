import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useMemo } from "react";
import mainLogo from "../../assets/images/Knowledge Chakra 1.png";
import chakraLogo from "../../assets/images/Knowledge Chakra 2.png";
import google from "../../assets/images/search.png";
import LinkedIn from "../../assets/images/linkedin.png";
import apple from "../../assets/images/apple-logo.png";
import SignInSlider from "../../components/SignIn/SignInSlider/SignInSlider";
import { createStyles } from "./WelcomeScreen.styles";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { signWithGoogle, signWithApple, signWithLinkedIn } from "../../redux/slices/authSlice";
import { appColors } from "../../themes/appColors";

const WelcomeScreen = () => {
  // You can pass custom props to override default styles
  const styleProps = {};

  const styles = useMemo(() => createStyles(styleProps), []);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { authStates } = useSelector((state) => state.Auth);

  const [fontsLoaded] = useFonts({
    "Mukta-Bold": require("../../../assets/fonts/Mukta-Bold.ttf"),
    "Mukta-Regular": require("../../../assets/fonts/Mukta-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
    }
  }, [fontsLoaded]);

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
              disabled={authStates.isRedirectURLReceivedForGoogle == "pending"}
              onPress={() => {
                dispatch(signWithGoogle());
              }}
              style={styles.socialButton}
              activeOpacity={0.7}
            >
              {authStates.isRedirectURLReceivedForGoogle == "pending" ? (
                <ActivityIndicator size="small" color={appColors.navyBlueShade} />
              ) : (
                <>
                  <Image source={google} style={styles.socialIcons} />
                  <Text style={styles.socialButtonText}>Continue with Google</Text>
                </>
              )}
            </TouchableOpacity>

            {/* LinkedIn Button */}
            <TouchableOpacity
              disabled={authStates.isRedirectURLReceivedForLinkedIn == "pending"}
              onPress={() => {
                dispatch(signWithLinkedIn());
              }}
              style={styles.socialButton}
              activeOpacity={0.7}
            >
              {authStates.isRedirectURLReceivedForLinkedIn == "pending" ? (
                <ActivityIndicator size="small" color={appColors.navyBlueShade} />
              ) : (
                <>
                  <Image source={LinkedIn} style={styles.socialIcons} />
                  <Text style={styles.socialButtonText}>
                    Continue with LinkedIn
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* Apple Button */}
            <TouchableOpacity
              disabled={authStates.isRedirectURLReceivedForApple == "pending"}
              onPress={() => {
                dispatch(signWithApple());
              }}
              style={[styles.socialButton, { marginBottom: 0 }]}
              activeOpacity={0.7}
            >
              {authStates.isRedirectURLReceivedForApple == "pending" ? (
                <ActivityIndicator size="small" color={appColors.navyBlueShade} />
              ) : (
                <>
                  <Image source={apple} style={styles.socialIcons} />
                  <Text style={styles.socialButtonText}>Continue with Apple</Text>
                </>
              )}
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
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.footerLink}>Terms Of Use</Text>
              </TouchableOpacity>
              <Text style={styles.footerDot}> • </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.footerLink}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
