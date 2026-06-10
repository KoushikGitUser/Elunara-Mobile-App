import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  BackHandler,
  Alert,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SuccessCheckMark from "../../../components/SignUp/SuccessCheckMark";
import { appColors } from "../../../themes/appColors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import RejectedCrossMark from "../../../components/SignUp/RejectedCrossMark";
import loader from "../../../assets/images/authLoader.gif";
import GradientText from "../../../components/common/GradientText";
import { scaleFont } from "../../../utils/responsive";
import { loginUsingProviderCallback } from "../../../redux/slices/authSlice";
import { storeToken } from "../../../utils/Secure/secureStore";
import { triggerToast } from "../../../services/toast";

const AuthenticateUserUsingProvider = ({ route }) => {
  const { token, error } = route.params || {};
  const [isVerified, setIsVerified] = useState("loading");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { authStates } = useSelector((state) => state.Auth);

  const getErrorMessage = () => {
    if (error === "email_required") {
      return "No email id found in this device as an account";
    }
    return "Looks like something went wrong. Please try again later.";
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      const backAction = () => {
        return true; // prevent default behavior (exit)
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove(); // clean up
    } else {
      // iOS: prevent the user swipe-back gesture from returning to the
      // auth flow after the OAuth round-trip, but allow programmatic
      // navigation (RESET / REPLACE / NAVIGATE) so the success effect
      // below can move the user to the chat screen.
      //
      // Earlier this listener called e.preventDefault() unconditionally,
      // which silently cancelled the navigation.reset() to "chat" — the
      // user was stuck on the "Redirecting…" UI forever. This was the
      // bug behind Apple's Guideline 2.1(a) rejection (iPad Air M3,
      // iPadOS 26.5). Only blocking POP / GO_BACK / POP_TO_TOP keeps the
      // intent (no user-initiated back) while letting RESET through.
      const unsub = navigation.addListener("beforeRemove", (e) => {
        const type = e?.data?.action?.type;
        if (type === "POP" || type === "GO_BACK" || type === "POP_TO_TOP") {
          e.preventDefault();
        }
      });
      return unsub;
    }
  }, [navigation]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isVerified == true) {
        // Reset the stack so OAuth/welcome screens are wiped — back from
        // chat must never land on the auth flow.
        navigation.reset({ index: 0, routes: [{ name: "chat" }] });
        storeToken(token);
        triggerToast(
          "Logged in",
          "You have been logged in successfully",
          "success",
          3000
        );
      }
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, [isVerified]);

  useEffect(() => {
    if (token) {
      setIsVerified(true);
    } else if (error) {
      setIsVerified(false);
    }
  }, [token, error]);

  return (
    <SafeAreaView style={styles.wrapper}>
      {isVerified == true ? (
        <View style={styles.wrapper}>
          <SuccessCheckMark color={appColors.navyBlueShade} />
          <Text
            style={[
              styles.description,
              { textAlign: "center", marginTop: 20, fontSize: 18 },
            ]}
          >
            Your have been logged in successfully
          </Text>
          <View style={styles.signupContainer}>
            <Text
              style={[
                styles.description,
                {
                  textAlign: "center",
                  fontSize: 25,
                  color: appColors.navyBlueShade,
                },
              ]}
            >
              Redirecting...
            </Text>
          </View>
        </View>
      ) : isVerified == false ? (
        <View style={styles.wrapper}>
          <RejectedCrossMark />
          <Text
            style={[
              styles.description,
              { textAlign: "center", marginTop: 20, fontSize: 18 },
            ]}
          >
            {getErrorMessage()}
          </Text>
          <View style={styles.signupContainer}>
            <TouchableOpacity 
              style={styles.generateBtn}
              onPress={() => navigation.navigate("signin")}
              activeOpacity={0.7}
            >
              <Text style={styles.signupLink}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : isVerified == "loading" ? (
        <View style={styles.wrapper}>
          <Image
            style={{ height: 100, width: 100, objectFit: "contain" }}
            source={loader}
          />
          <GradientText
            children="Loading..."
            fullWidth={false}
            widthNumber={0.45}
            fontSize={24}
          />
          <Text
            style={{
              fontFamily: "Mukta-Regular",
              fontSize: 16,
              color: "#757575",
              marginBottom: 15,
            }}
          >
            Almost there! We appreciate your patience.
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    lineHeight: 30,
    color: "#757575",
    fontFamily: "Mukta-Regular",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signupText: {
    fontSize: scaleFont(14),
    color: "#5A6B7D",
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
  },
  generateBtn: {
    backgroundColor: appColors.navyBlueShade,
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 50,
  },
  signupLink: {
    fontSize: scaleFont(14),
    color: "white",
    fontFamily: "Mukta-Bold",
    // remove textDecorationLine for manual underline
  },
  customUnderline: {
    height: 2,
    backgroundColor: "#0F1419",
    width: "100%", // adjust based on text width
    marginTop: 1, // pushes the line slightly downward
  },
});

export default AuthenticateUserUsingProvider;
