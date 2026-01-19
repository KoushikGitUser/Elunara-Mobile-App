import {
  View,
  Text,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Animated,
  ScrollView,
  TextInput,
  Keyboard,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { scaleFont } from "../../utils/responsive";
import { BlurView } from "@react-native-community/blur";
import BackArrowLeftIcon from "../../../assets/SvgIconsComponent/BackArrowLeftIcon";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../redux/slices/authSlice";
import SuccessCheckMark from "./SuccessCheckMark";
import { appColors } from "../../themes/appColors";
import { useNavigation } from "@react-navigation/native";

const VerifyMailOtpPopup = ({ close, verifyMailOtpPopup }) => {
  const animatedValue = useState(new Animated.Value(0))[0];
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const { globalDataStates } = useSelector((state) => state.Global);
  const { authStates } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", (e) => {
      const height = e.endCoordinates.height;
      setKeyboardHeight(height);
      Animated.timing(animatedValue, {
        toValue: height / 2.5, // pushes up slightly, not fully
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);



    useEffect(() => {
      const backAction = () => {
        return true; // prevent default behavior (exit)
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove(); // clean up
    }, []);

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const verifyMailOtpFunction = () => {
      const fullOTP = otp.join("");
      const formData = new FormData();
      formData.append("otp", fullOTP);
      formData.append("email", globalDataStates.userMailIDOnSignup);
      dispatch(verifyEmail(formData));
  };

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Modal
      visible={verifyMailOtpPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => close(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[styles.container]}
      >
        {/* Blur Background */}
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={5}
          reducedTransparencyFallbackColor="rgba(0,0,0,0.4)"
        />
        <View style={styles.androidBlur} />
        <View
          style={[styles.gapFiller, { height: authStates.isMailVerified == true ? "30%" : "40%" }]}
        />

        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={0.5}
        />
        <Animated.View
          style={{
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 400], // average keyboard height
                  outputRange: [0, -(keyboardHeight * 3.5)],
                  // perfect lift without large gap
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          {/* Modal Sheet */}
          <ScrollView
            contentContainerStyle={[styles.scrollContent]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.modalSheet}>
              {/* Content */}
              <View style={styles.content}>
                {/* Title */}

                {authStates.isMailVerified == true? (
                  <View style={styles.verified}>
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
                      <Text style={styles.signupText}>
                        You can now {""}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>{ 
                          close(false);
                          navigation.navigate("signin");
                        }}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.signupLink}> Log In</Text>
                        <View style={styles.customUnderline} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <>
                    <View style={styles.closeModalMain}>
                      <TouchableOpacity>
                        <BackArrowLeftIcon />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.title}>Enter the 4-digit code</Text>
                    {/* Description */}
                    <Text style={styles.description}>
                      We've sent a one-time password (OTP) to
                    </Text>
                    <Text
                      style={[
                        styles.description,
                        {
                          marginBottom: 35,
                          color: "black",
                          fontFamily: "Mukta-Bold",
                        },
                      ]}
                    >
                      {globalDataStates.userMailIDOnSignup}
                    </Text>

                    {/* Input Section */}
                    <View style={styles.otpContainer}>
                      {otp.map((digit, index) => (
                        <TextInput
                          key={index}
                          ref={(ref) => (inputRefs.current[index] = ref)}
                          style={[styles.otpInput]}
                          value={digit}
                          onChangeText={(value) => handleChange(index, value)}
                          onKeyPress={({ nativeEvent: { key } }) =>
                            handleKeyPress(index, key)
                          }
                          keyboardType="number-pad"
                          maxLength={1}
                          selectTextOnFocus
                        />
                      ))}
                    </View>

                    {/* Verify Button */}
                    <TouchableOpacity
                      style={[
                        styles.verifyButton,
                        (otp.some((digit) => digit === "") || authStates.isMailVerified == "pending") &&
                          styles.verifyButtonDisabled,
                      ]}
                      onPress={() => {
                        verifyMailOtpFunction();
                      }}
                      activeOpacity={0.8}
                      disabled={otp.some((digit) => digit === "") || authStates.isMailVerified == "pending"}
                    >
                      {authStates.isMailVerified == "pending" ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                      ) : (
                        <Text style={styles.verifyButtonText}>Verify</Text>
                      )}
                    </TouchableOpacity>

                    {/* Skip for now */}
                    <TouchableOpacity
                      style={[styles.skipButton, { marginBottom: 70 }]}
                      onPress={() => close(false)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.skipButtonText}>
                        Resend Code in 00:20
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  androidBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  gapFiller: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "40%",
    backgroundColor: "white",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
    marginBottom: 0,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  closeModalMain: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: scaleFont(24),
    color: "#3A3A3A",
    marginBottom: 5,
    marginTop: 10,
    lineHeight: 36,
    fontFamily: "Mukta-Bold",
  },
  description: {
    fontSize: scaleFont(16),
    lineHeight: 24,
    color: "#757575",
    fontFamily: "Mukta-Regular",
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: scaleFont(12),
    color: "#374151",
    marginBottom: 8,
    fontFamily: "Mukta-Regular",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: scaleFont(14),
    color: "#3A3A3A",
    fontFamily: "Mukta-Regular",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 35,
    marginTop: 5,
    gap: 17,
  },
  otpInput: {
    width: "15%",
    height: 57,
    borderWidth: 1,
    borderColor: "#B5BECE",
    backgroundColor: "white",
    color: "#828282",
    borderRadius: 16,
    textAlign: "center",
    fontSize: scaleFont(15),
    fontWeight: "600",
    fontFamily: "Mukta-Regular",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
  },
  resendText: {
    fontSize: scaleFont(10),
    color: "#6b7280",
  },
  resendLink: {
    fontSize: scaleFont(10),
    fontWeight: "600",
    color: "#111827",
    textDecorationLine: "underline",
  },
  verifyButton: {
    backgroundColor: "#081A35",
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  verified: {
    marginBottom: 100,
    marginTop: 30,
  },
  verifyButtonDisabled: {
    backgroundColor: "#CDD5DC",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Bold",
  },
  skipButton: {
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 10,
  },
  skipButtonText: {
    color: "#0F172A",
    fontSize: scaleFont(14),
    fontWeight: "600",
    borderBottomWidth: 1,
    fontFamily: "Mukta-Bold",
  },
  noteContainer: {
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  noteText: {
    fontSize: scaleFont(14),
    lineHeight: 20,
    color: "#3A3A3A",
    letterSpacing: 0.1,
    fontFamily: "Mukta-Regular",
  },
  noteBold: {
    fontFamily: "Mukta-Bold",
    color: "#3A3A3A",
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
  signupLink: {
    fontSize: scaleFont(14),
    color: appColors.navyBlueShade,
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

export default VerifyMailOtpPopup;
