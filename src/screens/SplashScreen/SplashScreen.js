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

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const hasNavigated = useRef(false);
  const isInitialMount = useRef(true);
  const [videoFinished, setVideoFinished] = useState(false);
  const pendingNavigateRef = useRef(null);

  const player = useVideoPlayer(splashVideo, (p) => {
    p.loop = false;
    p.muted = true;
    p.play();
  });

  // Detect video end
  useEffect(() => {
    const subscription = player.addListener("playingChange", (event) => {
      if (!event.isPlaying) {
        setVideoFinished(true);
      }
    });
    return () => subscription.remove();
  }, [player]);

  // When video finishes, execute any pending navigation
  useEffect(() => {
    if (videoFinished && pendingNavigateRef.current) {
      pendingNavigateRef.current();
      pendingNavigateRef.current = null;
    }
  }, [videoFinished]);

  // Auth check & API calls
  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      if (hasNavigated.current) return;

      const accessToken = await getToken();

      if (!accessToken) {
        hasNavigated.current = true;
        const go = () => navigation.navigate("welcome");
        if (videoFinished) {
          go();
        } else {
          pendingNavigateRef.current = go;
        }
        return;
      }

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

  // Sync wallet data to Toggle slice
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

      if (settingsStates.allPersonalisationsSettings.isPersonalInfosFetched === true) {
        hasNavigated.current = true;
        isInitialMount.current = false;
        const go = () => navigation.navigate("chat");
        if (videoFinished) {
          go();
        } else {
          pendingNavigateRef.current = go;
        }
      }
    };

    handleFetchResults();
  }, [settingsStates.allPersonalisationsSettings.isPersonalInfosFetched, videoFinished]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <VideoView
        style={StyleSheet.absoluteFillObject}
        player={player}
        allowsFullscreen={false}
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
