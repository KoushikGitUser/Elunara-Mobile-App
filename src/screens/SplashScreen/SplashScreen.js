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
import {
  setWalletBalance,
  setIsInitialRechargeCompleted,
  setIsPromotionalUser,
  setPromotionalDaysRemaining,
} from "../../redux/slices/toggleSlice";

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

      // If access token exists (with or without refresh token), fetch profile info and wallet info
      dispatch(commonFunctionForAPICalls({
        method: "GET",
        url: "/settings/profile",
        name: "getAllProfileInfos",
      }));

      dispatch(commonFunctionForAPICalls({
        method: "GET",
        url: "/wallet",
        name: "getUserWalletInfo",
      }));
    };
    checkAuthAndNavigate();
  }, []);

  const { settingsStates, walletStates: apiWalletStates } = useSelector((state) => state.API);

  // Sync wallet data to Toggle slice whenever wallet API resolves
  useEffect(() => {
    if (apiWalletStates.isWalletInfoFetched === true) {
      dispatch(setWalletBalance(apiWalletStates.walletBalance));
      dispatch(setIsInitialRechargeCompleted(apiWalletStates.isInitialRechargeCompleted));
      dispatch(setIsPromotionalUser(apiWalletStates.isPromotionalUser));
      dispatch(setPromotionalDaysRemaining(apiWalletStates.promotionalDaysRemaining));
    }
  }, [apiWalletStates.isWalletInfoFetched]);

  // Navigate to chat when profile is fetched
  useEffect(() => {
    const handleFetchResults = async () => {
      if (!isInitialMount.current) return;
      if (hasNavigated.current) return;

      const accessToken = await getToken();
      if (!accessToken) return;

      if (
        settingsStates.allPersonalisationsSettings.isPersonalInfosFetched === true
      ) {
        hasNavigated.current = true;
        isInitialMount.current = false;
        navigation.navigate("chat");
      }
    };

    handleFetchResults();
  }, [
    settingsStates.allPersonalisationsSettings.isPersonalInfosFetched,
  ]);

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
