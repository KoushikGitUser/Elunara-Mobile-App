import { DarkTheme, useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Image,
} from "react-native";
import { scaleFont } from "../../utils/responsive";
import chakraLogoSplash from "../../assets/images/chakraBig.png";
import elunaraLogoSplash from "../../assets/images/ElunaraLogoSplash.png";
import { getToken } from "../../utils/Secure/secureStore";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";
import { useDispatch, useSelector } from "react-redux";

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const hasNavigated = useRef(false); // Track if we've already navigated
  const isInitialMount = useRef(true); // Track if this is the initial mount

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      // Prevent re-running if already navigated
      if (hasNavigated.current) return;

      const accessToken = await getToken();

      // If no access token available, navigate to welcome screen
      if (!accessToken) {
        hasNavigated.current = true;
        navigation.navigate("welcome");
        return;
      }

      // If access token exists (with or without refresh token), fetch profile info
      const payload = {
        method: "GET",
        url: "/settings/profile",
        name: "getAllProfileInfos",
      };

      dispatch(commonFunctionForAPICalls(payload));
    };
    checkAuthAndNavigate();
  }, []);

  const { settingsStates } = useSelector((state) => state.API);

  useEffect(() => {
    const handleProfileFetchResult = async () => {
      // Only handle navigation on initial mount, ignore subsequent state changes
      if (!isInitialMount.current) return;
      if (hasNavigated.current) return;

      const accessToken = await getToken();

      // Only process if access token exists
      if (!accessToken) {
        return;
      }

      // Only navigate to chat when profile is successfully fetched (true)
      // Ignore false states as they could be "loading" or "error"
      // If there's an auth error, the axios interceptor will handle logout
      if (
        settingsStates.allPersonalisationsSettings.isPersonalInfosFetched ===
        true
      ) {
        hasNavigated.current = true;
        isInitialMount.current = false;
        navigation.navigate("chat");
      }
    };

    handleProfileFetchResult();
  }, [settingsStates.allPersonalisationsSettings.isPersonalInfosFetched]);

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        style={styles.bigLogo}
        imageStyle={{ opacity: 0.2 }}
        source={chakraLogoSplash}
      >
        <Image source={elunaraLogoSplash} style={styles.elunaraLogoSplash} />
        <StatusBar backgroundColor="#081A35" barStyle="light-content" />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#081A35",
  },
  logo: {
    fontSize: scaleFont(48),
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  elunaraLogoSplash: {
    height: 100,
    width: 300,
    opacity: 1,
  },
  bigLogo: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tagline: {
    fontSize: scaleFont(16),
    color: "#E1BEE7",
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;
