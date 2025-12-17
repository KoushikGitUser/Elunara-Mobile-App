import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { SimpleLineIcons } from "@expo/vector-icons";
import verifiedIcon from '../../assets/images/Group.png';
import { scaleFont } from "../../utils/responsive";
import { appColors } from "../../themes/appColors";
import { ArrowRight } from "lucide-react-native";

const { width } = Dimensions.get("window");

const VerificationMailPopup = ({close,verificationMailSent,setVerifyMailOtpPopup}) => {

  return (
    <Modal
      visible={verificationMailSent}
      transparent={true}
      animationType="slide"
      onRequestClose={() => close(false)}
    >
      <View style={styles.container}>
        {/* Blur Background */}

        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={7}
          reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.43)"
        />
        <View style={styles.androidBlur} />

        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => close(false)}
        />

        {/* Modal Sheet */}
        <View style={styles.modalSheet}>
          {/* Handle Bar */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Icon */}
            <View style={styles.iconContainer}>
            <Image source={verifiedIcon} style={styles.verifiedIcon} />
            </View>

            {/* Title */}
            <Text style={styles.title}>Verification mail sent!</Text>

            {/* Description */}
            <Text style={styles.description}>
              It may take a few minutes to arrive, check your spam or promotions
              folder if you don't see it.
            </Text>
             <Text style={[styles.description,{marginBottom:15}]}>
              Click the link, verify your account and sign in.
            </Text>
            <Text style={[styles.description,{textAlign:"center",fontFamily:"Mukta-Bold",marginBottom:15,color:appColors.navyBlueShade,fontSize:20}]}>
              or
            </Text>
            <Text style={[styles.description,{marginBottom:25}]}>
              Enter the OTP received in the same mail, verify your account and sign in.
            </Text>

            {/* Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setVerifyMailOtpPopup(true);
                close(false);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Enter OTP</Text>
              <ArrowRight color="white" size={20} strokeWidth={1.75} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.18)",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
   modalSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
verifiedIcon:{
    height:55,
    width:50
},
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: scaleFont(24),
    color: "#1F2937",
    marginBottom: 16,
    fontFamily:"Mukta-Bold"
  },
  description: {
    fontSize: scaleFont(16),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
   fontFamily:"Mukta-Regular"
  },
  button: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom:20,
    flexDirection:"row",
    gap:5
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
     fontFamily:"Mukta-Bold"
  },
});

export default VerificationMailPopup;
