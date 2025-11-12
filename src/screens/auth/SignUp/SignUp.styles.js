import { StyleSheet, Dimensions, Platform } from "react-native";
import { scaleFont } from "../../../utils/responsive";

const { width, height } = Dimensions.get("window");

// Responsive scaling functions
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

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
      marginBottom: 10,
      width: "90%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "start",
    },
    logoContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom:25
    },
    mainLogo: {
      height: 40,
      width: 130,
    },
    chakraLogo: {
      height: 165,
      width: 115,
      position: "absolute",
      right: -25,
      zIndex: 99,
      marginTop: 10,
    },
    headTitle: {
      fontSize: scaleFont(28),
      fontWeight: "700",
      color: "#4D5F75",
      letterSpacing: -0.8,
      marginTop: 15,
    },
    headDesc: {
      fontSize: scaleFont(13),
      color: "#939FA9",
      fontWeight: "400",
      marginTop: 15,
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
      fontSize: scaleFont(13),
      fontWeight: "600",
      color: props.socialButtonTextColor || "#1E2329",
      letterSpacing: -0.1,
      marginLeft: scale(12),
    },
    socialIcons: {
      height: 25,
      width: 25,
    },
    divider: {
      textAlign: "center",
      fontSize: scaleFont(13),
      color: "#8A97A3",
      fontWeight: "400",
      marginTop: 20,
      marginBottom:25
    },
    emailButton: {
      backgroundColor: "#162845ff",
      borderRadius: moderateScale(100),
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      width: "100%",
    },
    emailButtonText: {
      fontSize: scaleFont(13),
      fontWeight: "600",
      color: props.emailButtonTextColor || "#FFFFFF",
      letterSpacing: -0.2,
    },
    signupContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    signupText: {
      fontSize: scaleFont(13),
      color: props.signupTextColor || "#5A6B7D",
      fontWeight: "400",
    },
    signupLink: {
      fontSize: scaleFont(13),
      color: "#0F1419",
      fontWeight: "600",
      // remove textDecorationLine for manual underline
    },
    customUnderline: {
      height: 2,
      backgroundColor: "#0F1419",
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
    fullnameInput: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    nameInput: {
      width: "48%",
    },
    label: {
      fontSize: scaleFont(12),
      color: "#4E4E4E",
      fontWeight: "400",
      marginBottom: 8,
      textAlign: "left",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ABB8CC",
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 14,
      fontSize: scaleFont(13),
      color: "#0F1419",
      backgroundColor: "white",
      width: "100%",
    },
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ABB8CC",
      borderRadius: 15,
      paddingHorizontal: 15,
      paddingRight: 10,
      backgroundColor: "white",
    },
    passwordInput: {
      flex: 1,
      fontSize: scaleFont(13),
      color: "#0F1419",
      paddingVertical: 14,
    },
    eyeIconContainer: {
      padding: 6,
    },
    checkbox: {
      height: 20,
      width: 20,
      borderWidth: 2,
      borderColor: "#B5BECE",
      borderRadius: 3,
    },
    forgotPasswordMain: {
      marginBottom: 25,
      width: "100%",
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      gap:10
    },
     textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: scaleFont(12),
    color: '#5A5A5A',
  },
  link: {
    fontSize: scaleFont(12),
    color: '#2C3E50',
    fontWeight: '600',
  },
  });

// Export scaling functions for use in component if needed
export { scale, verticalScale, moderateScale };
