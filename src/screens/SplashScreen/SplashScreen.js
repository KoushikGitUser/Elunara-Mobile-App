import { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { getToken } from "../../utils/Secure/secureStore";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setWalletBalance,
  setIsInitialRechargeCompleted,
  setIsPromotionalUser,
  setPromotionalDaysRemaining,
} from "../../redux/slices/toggleSlice";
import { VideoView, useVideoPlayer } from "expo-video";
import AuthGradientText from "../../components/common/AuthGradientText";
import { appColors } from "../../themes/appColors";
import BigGrayChakra from "../../assets/images/BigGrayChakra.png";

const splashVideo = require("../../assets/images/splashVideo.mp4");
// Fallback if "playToEnd" event never fires (decode error / unusual codec / etc.)
const VIDEO_MAX_WAIT_MS = 7000;

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const hasNavigatedRef = useRef(false);
  const isMountedRef = useRef(true);
  const apisDispatchedRef = useRef(false);
  const [videoFinished, setVideoFinished] = useState(false);
  // Set true the moment the user taps "Try Again". If the retried fetches
  // fail too, we redirect to welcome instead of showing the error screen
  // a second time.
  const [retryAttempted, setRetryAttempted] = useState(false);
  // Animated dots for the "Loading..." label
  const [loadingDots, setLoadingDots] = useState("");

  const player = useVideoPlayer(splashVideo, (p) => {
    p.loop = false;
    p.muted = true;
    p.play();
  });

  const { settingsStates, walletStates: apiWalletStates } = useSelector(
    (state) => state.API,
  );

  const profileFetched =
    settingsStates.allPersonalisationsSettings.isPersonalInfosFetched === true;
  const walletFetched = apiWalletStates.isWalletInfoFetched === true;
  const profileError =
    settingsStates.allPersonalisationsSettings.personalInfosError === true;
  const walletError = apiWalletStates.walletInfoError === true;
  const hasError = profileError || walletError;
  const allFetched = profileFetched && walletFetched;
  // After the video ends, if the APIs aren't all back yet AND we don't have
  // an error to show, surface the loading indicator instead of staring at a
  // frozen last frame.
  const showLoading = videoFinished && !allFetched && !hasError;
// 
  // Track mounted status so listeners/timers never setState on a torn-down view
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []); 

  // Detect actual video end — "playToEnd" fires only on genuine completion,
  // unlike "playingChange" which also fires on pause / error / backgrounding.
  useEffect(() => {
    const subscription = player.addListener("playToEnd", () => {
      if (isMountedRef.current) setVideoFinished(true);
    });
    return () => subscription.remove();
  }, [player]);

  // Safety net: in case playToEnd never fires (rare decode/codec edge case)
  useEffect(() => {
    const fallback = setTimeout(() => {
      if (isMountedRef.current) setVideoFinished(true);
    }, VIDEO_MAX_WAIT_MS);
    return () => clearTimeout(fallback);
  }, []);

  // Animate the "..." after "Loading" while the loader is visible.
  useEffect(() => {
    if (!showLoading) {
      setLoadingDots("");
      return;
    }
    const interval = setInterval(() => {
      setLoadingDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, [showLoading]);

  const dispatchSplashApis = useCallback(() => {
    apisDispatchedRef.current = true;
    dispatch(
      commonFunctionForAPICalls({
        method: "GET",
        url: "/settings/profile",
        name: "getAllProfileInfos",
      }),
    );
    dispatch(
      commonFunctionForAPICalls({
        method: "GET",
        url: "/wallet",
        name: "getUserWalletInfo",
      }),
    );
  }, [dispatch]);

  // After the video has fully played, decide what to do.
  // Nothing — no API call, no navigation — happens before this point,
  // so the axios interceptor's 401 → reset("signin") can't fire mid-video.
  useEffect(() => {
    if (!videoFinished || hasNavigatedRef.current) return;
    // When the error screen is showing, don't navigate or re-fire APIs —
    // the user must press Try Again.
    if (hasError) return;

    const decideNext = async () => {
      const accessToken = await getToken();
      if (!isMountedRef.current) return;

      // Flow A — no token: go straight to welcome. Reset so back from
      // welcome doesn't bounce back to the splash route.
      if (!accessToken) {
        hasNavigatedRef.current = true;
        navigation.reset({ index: 0, routes: [{ name: "welcome" }] });
        return;
      }

      // Flow B / C — token exists: fire profile + wallet APIs now.
      // For Flow C (invalid token), the 401 from these calls makes the
      // axios interceptor reset to "signin"; that's fine because the
      // video has already completed and the splash is about to navigate.
      if (!apisDispatchedRef.current) {
        dispatchSplashApis();
      }
    };

    decideNext();
  }, [videoFinished, dispatchSplashApis, navigation]);

  // Once profile + wallet are fetched, go to chat. No max-wait timer anymore
  // — if the network is slow, the loading indicator is the right UX; if the
  // API errors, the error screen below takes over.
  useEffect(() => {
    if (!videoFinished || hasNavigatedRef.current) return;
    if (!apisDispatchedRef.current) return;
    if (hasError) return;
    if (!allFetched) return;

    hasNavigatedRef.current = true;
    navigation.reset({ index: 0, routes: [{ name: "chat" }] });
  }, [videoFinished, allFetched, hasError, navigation]);

  // Sync wallet data to Toggle slice when wallet API responds
  useEffect(() => {
    if (apiWalletStates.isWalletInfoFetched === true) {
      dispatch(setWalletBalance(apiWalletStates.walletBalance));
      dispatch(
        setIsInitialRechargeCompleted(apiWalletStates.isInitialRechargeCompleted),
      );
      dispatch(setIsPromotionalUser(apiWalletStates.isPromotionalUser));
      dispatch(
        setPromotionalDaysRemaining(apiWalletStates.promotionalDaysRemaining),
      );
    }
  }, [apiWalletStates.isWalletInfoFetched]);

  const handleRetry = useCallback(async () => {
    // Run the same token check as the initial splash flow. If the user
    // somehow lost their token between the first attempt and the retry, we
    // route them to welcome instead of pointlessly firing APIs that will
    // 401.
    const accessToken = await getToken();
    if (!isMountedRef.current) return;

    if (!accessToken) {
      hasNavigatedRef.current = true;
      navigation.reset({ index: 0, routes: [{ name: "welcome" }] });
      return;
    }

    // Token exists — re-dispatch both APIs. Their `pending` handlers clear
    // the error flags, so the error screen drops back to the loading state.
    // Setting retryAttempted last (after the dispatches commit the pending
    // state) ensures the post-retry watcher below doesn't trip on the
    // pre-retry hasError that's about to become false.
    apisDispatchedRef.current = true;
    dispatch(
      commonFunctionForAPICalls({
        method: "GET",
        url: "/settings/profile",
        name: "getAllProfileInfos",
      }),
    );
    dispatch(
      commonFunctionForAPICalls({
        method: "GET",
        url: "/wallet",
        name: "getUserWalletInfo",
      }),
    );
    setRetryAttempted(true);
  }, [dispatch, navigation]);

  // After a retry: if either API fails again, send the user to welcome
  // instead of looping on the error screen.
  useEffect(() => {
    if (!retryAttempted || !hasError) return;
    if (hasNavigatedRef.current) return;
    hasNavigatedRef.current = true;
    navigation.reset({ index: 0, routes: [{ name: "welcome" }] });
  }, [retryAttempted, hasError, navigation]);

  // Error screen — visual mirror of NoInternetScreen with a different
  // icon/title/description. Only shown AFTER the video has fully played, so
  // an early-arriving rejection (or the test `hasError = true` hack) doesn't
  // interrupt the splash animation.
  if (hasError && videoFinished) {
    return (
      <View style={styles.errorContainer}>
        <Image source={BigGrayChakra} style={styles.chakraLogo} />
        <View style={styles.errorContent}>
          <Feather
            name="alert-circle"
            size={55}
            color="#888888"
          />
          <AuthGradientText
            marginTop={40}
            marginBottom={10}
            fontSize={25}
            fullWidth={true}
            textAlign="left"
          >
            Something went wrong
          </AuthGradientText>
          <Text style={styles.errorDescription}>
            We&rsquo;re having trouble connecting to the server. Please try
            again.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <VideoView
        style={StyleSheet.absoluteFillObject}
        player={player}
        fullscreenOptions={{ enable: false }}
        allowsPictureInPicture={false}
        nativeControls={false}
        contentFit="cover"
      />
      {/* Transparent overlay to block any touch on video controls */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none" />

      {/* Loading indicator — shown after video ends if APIs are still pending */}
      {showLoading && (
        <View style={styles.loadingOverlay} pointerEvents="none">
          <ActivityIndicator size="small" color="#FFFFFF" />
          <Text style={styles.loadingText}>Loading{loadingDots}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingOverlay: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Mukta-Regular",
    letterSpacing: 0.5,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  chakraLogo: {
    position: "absolute",
    top: 100,
    right: 0,
    height: 200,
    width: 120,
  },
  errorContent: {
    alignItems: "flex-start",
  },
  errorDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "left",
    marginTop: 8,
    marginBottom: 44,
    fontFamily: "Mukta-Regular",
  },
  retryButton: {
    backgroundColor: appColors.navyBlueShade,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    alignSelf: "center",
    width: "100%",
    alignItems: "center",
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
  },
});

export default SplashScreen;
