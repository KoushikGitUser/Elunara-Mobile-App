import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  moderateScale,
  scale,
  scaleFont,
  verticalScale,
} from "../../../utils/responsive";
import { appColors } from "../../../themes/appColors";

const { width, height } = Dimensions.get("window");

export const createStyles = (props = {}) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#FAFAFA",
    },
    container: {
      flexDirection: "column",
      backgroundColor: "#FAFAFA",
      gap: 30,
    },
    header: {
      marginTop: 30,
      marginBottom: 5,
      width: "90%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "start",
    },
    logoContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom: 30,
    },
    mainLogo: {
      height: 40,
      width: 130,
    },
    chakraLogo: {
      height: 134,
      width: 93,
      position: "absolute",
      right: -30,
      marginTop: 15,
      zIndex: 99,
    },
    headTitle: {
      fontSize: scaleFont(24),
      fontWeight: "700",
      color: "#4D5F75",
      letterSpacing: -0.8,
      marginTop: 15,
    },
    headDesc: {
      fontSize: scaleFont(16),
      color: "#757575",
      fontWeight: "400",
      marginTop: 15,
      fontFamily: "Mukta-Regular",
    },
    logo: {
      fontSize: moderateScale(30, 0.2),
      fontWeight: "300",
      color: props.logoColor || "#0F1419",
      letterSpacing: 0.3,
    },
    registered: {
      fontSize: moderateScale(9),
      color: props.logoColor || "#0F1419",
      marginLeft: scale(1),
      marginTop: verticalScale(3),
      fontWeight: "400",
    },
    tagline: {
      fontSize: moderateScale(12.5),
      color: props.taglineColor || "#5A6B7D",
      marginTop: verticalScale(4),
      fontWeight: "400",
      letterSpacing: 0.1,
    },
    content: {
      flex: 1,
      width: "90%",
      marginBottom: 20,
    },
    flowerContainer: {
      position: "absolute",
      right: -scale(50),
      top: verticalScale(-15),
      zIndex: 0,
    },
    headingContainer: {
      marginTop: 80,
    },
    heading: {
      fontSize: scaleFont(40),
      fontWeight: "700",
      color: "#4D5F75",
      letterSpacing: -0.8,
    },
    subheading: {
      fontSize: scaleFont(15),
      color: "#939FA9",
      lineHeight: moderateScale(25, 0.2),
      fontWeight: "400",
      marginTop: 10,
      marginBottom: 30,
      letterSpacing: 0.1,
    },
    progressContainer: {
      flexDirection: "row",
      gap: scale(12),
      marginBottom: verticalScale(10),
    },
    progressBar: {
      width: scale(34),
      height: verticalScale(3.5),
      backgroundColor: props.progressBarInactive || "#D9DFE5",
      borderRadius: 2,
    },
    progressActive: {
      backgroundColor: props.progressBarActive || "#2C3E50",
    },
    buttonsContainer: {
      paddingBottom: 20,
      width: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 50,
    },
    socialButton: {
      flexDirection: "row",
      width: "90%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: props.socialButtonBg || "#FFFFFF",
      borderWidth: 1.5,
      borderColor: "#999999ff",
      paddingVertical: 12,
      borderRadius: moderateScale(100),
      marginBottom: 15,
    },
    socialButtonText: {
      fontSize: scaleFont(14),
      fontFamily: "Mukta-Bold",
      color: appColors.navyBlueShade,
      letterSpacing: -0.1,
      marginLeft: scale(12),
    },
    socialIcons: {
      height: 25,
      width: 25,
    },
    divider: {
      textAlign: "center",
      fontSize: scaleFont(14),
      color: "#9C9C9C",
      fontWeight: "400",
      marginTop: 15,
      marginBottom: 20,
      fontFamily: "Mukta-Regular",
    },
    emailButton: {
      backgroundColor: appColors.navyBlueShade,
      borderRadius: moderateScale(100),
      alignItems: "center",
      justifyContent: "center",
      height: verticalScale(40),
      width: "100%",
    },
    emailButtonText: {
      fontSize: scaleFont(14),
      fontFamily: "Mukta-Bold",
      color:"#FFFFFF",
    },
    signupContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    signupText: {
      fontSize: scaleFont(14),
      color:"#8F8F8F",
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
      backgroundColor: appColors.navyBlueShade,
      width: "100%", // adjust based on text width
      marginTop: 1, // pushes the line slightly downward
    },
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    footerLink: {
      fontSize: scaleFont(10),
      color: props.footerLinkColor || "#7A8794",
      fontWeight: "400",
    },
    footerDot: {
      fontSize: scaleFont(10),
      color: props.footerLinkColor || "#7A8794",
    },
    inputFieldsMain: {
      width: "90%",
    },
    label: {
      fontSize: scaleFont(12),
      color: "#4E4E4E",
      fontWeight: "400",
      marginBottom: 8,
      textAlign: "left",
      fontFamily: "Mukta-Regular",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ABB8CC",
      borderRadius: 15,
      paddingHorizontal: 20,
      height: 50,
      fontSize: scaleFont(14),
      color: "#0F1419",
      backgroundColor: "white",
      fontFamily: "Mukta-Regular",
    },
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ABB8CC",
      borderRadius: 15,
      paddingHorizontal: 15,
      height: 50,
      paddingRight: 10,
      backgroundColor: "white",
    },
    passwordInput: {
      flex: 1,
      fontSize: scaleFont(14),
      color: "#0F1419",
      paddingVertical: 14,
      fontFamily: "Mukta-Regular",
      height: 50,
    },
    eyeIconContainer: {
      padding: 6,
    },
    forgotPassword: {
      alignSelf: "flex-end",
      marginTop: verticalScale(10),
      fontSize: scaleFont(13),
      color: appColors.navyBlueShade,
      fontFamily: "Mukta-Bold",
    },
    forgotPasswordMain: {
      borderBottomWidth: 1.5,
      borderColor: appColors.navyBlueShade,
      alignSelf: "flex-end",
      marginBottom: 25,
    },
  });

// Export scaling functions for use in component if needed
export { scale, verticalScale, moderateScale };
