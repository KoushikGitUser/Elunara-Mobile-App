import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Animated,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { scaleFont } from "../../../utils/responsive";

const { width } = Dimensions.get("window");

const ForgotPassword = ({ close, toggleForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [otp, setOtp] = useState(["0", "0", "0", "0"]);
  const inputRefs = useRef([]);
  const animatedValue = useState(new Animated.Value(0))[0];

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

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    console.log("Resending OTP");
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <Modal
      visible={toggleForgotPassword}
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
        <View style={styles.gapFiller} />

        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={0.5}
          onPress={() => {
            close(false);
            Keyboard.dismiss();
          }}
        />
        <Animated.View
          style={{
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 320], // average keyboard height
                  outputRange: [
                    0,
                    isCodeSent
                      ? -(keyboardHeight * 2.7)
                      : -(keyboardHeight * 2.3),
                  ],
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
                <View style={styles.closeModalMain}>
                  <AntDesign name="close" size={24} color="black" />
                </View>
                {/* Title */}
                {isCodeSent ? (
                  <Text style={styles.title}>Verify Account</Text>
                ) : (
                  <Text style={styles.title}>Forgot Your Password?</Text>
                )}

                {/* Description */}
                {isCodeSent ? (
                  <Text style={styles.description}>
                    Code has been send to{" "}
                    <Text style={[styles.description,{fontWeight:900,color:"black"}]}>samanthaa2gmail.com.</Text>
                  </Text>
                ) : (
                  <Text style={styles.description}>
                    Enter your email, and we'll send a
                  </Text>
                )}
                {isCodeSent ? (
                  <Text style={styles.description}>
                    Enter the code to verify your account.
                  </Text>
                ) : (
                  <Text style={styles.description}>verification code.</Text>
                )}

                {/* Input Section */}
                {isCodeSent ? (
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
                ) : (
                  <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      placeholderTextColor="#9CA3AF"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="text"
                      returnKeyType="done"
                    />
                  </View>
                )}

                {/* Verify Button */}
                <TouchableOpacity
                  style={[
                    styles.verifyButton,
                    !email && styles.verifyButtonDisabled,
                    { marginBottom: isCodeSent ? 35 : 85 },
                  ]}
                  onPress={() => {
                    setIsCodeSent(true);
                  }}
                  activeOpacity={0.8}
                  disabled={!email}
                >
                  <Text style={styles.verifyButtonText}>
                    {isCodeSent ? "Verify" : "Get Code"}
                  </Text>
                </TouchableOpacity>

                {isCodeSent && (
                  <View style={styles.resendContainer}>
                    <Text style={styles.resendText}>
                      Don't receive the OTP?{" "}
                    </Text>
                    <TouchableOpacity onPress={handleResend}>
                      <Text style={styles.resendLink}>Resend OTP</Text>
                    </TouchableOpacity>
                  </View>
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
  closeModalMain: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "#ffffffff",
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
  title: {
    fontSize: scaleFont(23),
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 5,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(11),
    lineHeight: 24,
    color: "#6B7280",
    letterSpacing: 0.2,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 35,
    marginTop: 40,
    gap: 10,
  },
  otpInput: {
    width: 65,
    height: 65,
    borderWidth: 1.5,
    borderColor: "#d1d5db",
    borderRadius: 16,
    textAlign: "center",
    fontSize: scaleFont(15),
    fontWeight: "600",
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
  inputSection: {
    marginBottom: 24,
    marginTop: 30,
  },
  inputLabel: {
    fontSize: scaleFont(10),
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: scaleFont(10),
    color: "#1F2937",
    letterSpacing: 0.2,
  },
  verifyButton: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  verifyButtonDisabled: {
    backgroundColor: "#CDD5DC",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(11),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  skipButton: {
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 10,
  },
  skipButtonText: {
    color: "#0F172A",
    fontSize: scaleFont(10),
    fontWeight: "600",
    textDecorationLine: "underline",
    letterSpacing: 0.2,
  },
  noteContainer: {
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  noteText: {
    fontSize: scaleFont(9),
    lineHeight: 20,
    color: "#6B7280",
    letterSpacing: 0.1,
  },
  noteBold: {
    fontWeight: "700",
    color: "#374151",
  },
});

export default ForgotPassword;
