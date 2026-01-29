import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { scaleFont } from "../../../utils/responsive";
import { verticalScale } from "../SignUp/SignUp.styles";
import loader from "../../../assets/images/authLoader.gif";
import GradientText from "../../../components/common/GradientText";
import SuccessCheckMark from "../../../components/SignUp/SuccessCheckMark";
import { appColors } from "../../../themes/appColors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { verifyEmail } from "../../../redux/slices/authSlice";
import RejectedCrossMark from "../../../components/SignUp/RejectedCrossMark";
import ReGenerationLinkPopup from "../../../components/VerifyEmailPage/ReGenerationLinkPopup";

const VerifyEmailWhileSignup = ({ route }) => {
  const [isVerified, setIsVerified] = useState("loading");
  const [generateLinkPopup, setGenerateLinkPopup] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { authStates } = useSelector((state) => state.Auth);
  const { emailToken } = route.params || {};

  useEffect(() => {
    setTimeout(() => {
      const formData = new FormData();
      formData.append("token", emailToken);
      dispatch(verifyEmail(formData));
    }, 100);
  }, [emailToken]);

  useEffect(() => {
    if (authStates.isMailVerified == true) {
      setIsVerified(true);
    }
    if (authStates.isMailVerified == false) {
      setIsVerified(false);
    }
  }, [authStates.isMailVerified]);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("signin");
      return true; // prevent default behavior (exit)
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove(); // clean up
  }, [navigation]);

  return (
    <SafeAreaView style={styles.wrapper}>
      {generateLinkPopup && (
        <ReGenerationLinkPopup
          toggleGenerateLinkPopup={generateLinkPopup}
          close={setGenerateLinkPopup}
        />
      )}
      {isVerified == true ? (
        <View style={styles.wrapper}>
          <SuccessCheckMark color={appColors.navyBlueShade} />
          <Text
            style={[
              styles.description,
              { textAlign: "center", marginTop: 20, fontSize: 18 },
            ]}
          >
            Your email has been verified successfully
          </Text>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>You can now {""}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("signin");
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.signupLink,{color:appColors.navyBlueShade}]}> Log In</Text>
              <View style={styles.customUnderline} />
            </TouchableOpacity>
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
            The link has been expired, want to recover your account?
          </Text>
          <View style={styles.signupContainer}>
            <TouchableOpacity
              style={styles.generateBtn}
              onPress={() => {
                setGenerateLinkPopup(true);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.signupLink}> Recover Account</Text>
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
    fontSize: scaleFont(16),
    lineHeight: 24,
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

export default VerifyEmailWhileSignup;
