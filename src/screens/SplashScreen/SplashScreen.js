import { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
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

const splashVideo = require("../../assets/images/splashVideo.mp4");
// Fallback if "playToEnd" event never fires (decode error / unusual codec / etc.)
const VIDEO_MAX_WAIT_MS = 7000;
// After video ends, give the profile API at most this long; then navigate to chat anyway.
const PROFILE_FETCH_MAX_WAIT_MS = 8000;

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const hasNavigatedRef = useRef(false);
  const isMountedRef = useRef(true);
  const apisDispatchedRef = useRef(false);
  const [videoFinished, setVideoFinished] = useState(false);

  const player = useVideoPlayer(splashVideo, (p) => {
    p.loop = false;
    p.muted = true;
    p.play();
  });

  const { settingsStates, walletStates: apiWalletStates } = useSelector((state) => state.API);

  // Track mounted status so listeners/timers never setState on a torn-down view
  useEffect(() => {
    return () => { isMountedRef.current = false; };
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

  // After the video has fully played, decide what to do.
  // Nothing — no API call, no navigation — happens before this point,
  // so the axios interceptor's 401 → reset("signin") can't fire mid-video.
  useEffect(() => {
    if (!videoFinished || hasNavigatedRef.current) return;

    const decideNext = async () => {
      const accessToken = await getToken();
      if (!isMountedRef.current) return;

      // Flow A — no token: go straight to welcome.
      if (!accessToken) {
        hasNavigatedRef.current = true;
        navigation.navigate("welcome");
        return;
      }

      // Flow B / C — token exists: fire profile + wallet APIs now.
      // For Flow C (invalid token), the 401 from these calls makes the
      // axios interceptor reset to "signin"; that's fine because the
      // video has already completed and the splash is about to navigate.
      if (!apisDispatchedRef.current) {
        apisDispatchedRef.current = true;
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
      }
    };

    decideNext();
  }, [videoFinished]);

  // Once profile is fetched (or our max-wait elapses), go to chat.
  useEffect(() => {
    if (!videoFinished || hasNavigatedRef.current) return;
    if (!apisDispatchedRef.current) return;

    if (settingsStates.allPersonalisationsSettings.isPersonalInfosFetched === true) {
      hasNavigatedRef.current = true;
      navigation.navigate("chat");
      return;
    }

    // Fallback: don't keep the user staring at the last frame if the profile
    // API is slow. After PROFILE_FETCH_MAX_WAIT_MS, navigate anyway — the
    // chat screen has its own loading states.
    const fallback = setTimeout(() => {
      if (!isMountedRef.current || hasNavigatedRef.current) return;
      hasNavigatedRef.current = true;
      navigation.navigate("chat");
    }, PROFILE_FETCH_MAX_WAIT_MS);
    return () => clearTimeout(fallback);
  }, [
    videoFinished,
    settingsStates.allPersonalisationsSettings.isPersonalInfosFetched,
  ]);

  // Sync wallet data to Toggle slice when wallet API responds
  useEffect(() => {
    if (apiWalletStates.isWalletInfoFetched === true) {
      dispatch(setWalletBalance(apiWalletStates.walletBalance));
      dispatch(setIsInitialRechargeCompleted(apiWalletStates.isInitialRechargeCompleted));
      dispatch(setIsPromotionalUser(apiWalletStates.isPromotionalUser));
      dispatch(setPromotionalDaysRemaining(apiWalletStates.promotionalDaysRemaining));
    }
  }, [apiWalletStates.isWalletInfoFetched]);

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default SplashScreen;
