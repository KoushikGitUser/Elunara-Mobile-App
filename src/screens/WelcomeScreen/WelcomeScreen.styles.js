import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  moderateScale,
  scale,
  scaleFont,
  verticalScale,
} from "../../utils/responsive";
import { appColors } from "../../themes/appColors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const createStyles = (props = {}) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#ffffffff",
    },
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#ffffffff",
    },
    header: {
      marginTop: verticalScale(20),
      marginBottom: verticalScale(5),
      width: "90%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    logoContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    mainLogo: {
      height: verticalScale(44),
      width: scale(110),
      objectFit:"cover"
    },
    chakraLogo: {
      height: verticalScale(150),
      width: scale(80),
      objectFit:"contain",
      position: "absolute",
      right: -scale(25),
      marginTop: verticalScale(20),
      zIndex: 99,
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
    },
    flowerContainer: {
      position: "absolute",
      right: -scale(50),
      top: verticalScale(-15),
      zIndex: 0,
    },
    headingContainer: {
      marginTop: verticalScale(40),
    },
    heading: {
      fontSize: scaleFont(36),
      fontWeight: "700",
      color: props.headingColor || "#4D5F75",
      letterSpacing: -0.8,
    },
    subheading: {
      fontSize: scaleFont(14),
      color: props.subheadingColor || "#939FA9",
      lineHeight: moderateScale(22, 0.2),
      fontWeight: "400",
      marginTop: verticalScale(6),
      marginBottom: verticalScale(16),
      letterSpacing: 0.1,
    },
    progressContainer: {
      flexDirection: "row",
      gap: scale(12),
      marginBottom: verticalScale(8),
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
    sliderWrapper: {
      width: "100%",
      height: SCREEN_HEIGHT * 0.36,
      overflow: "hidden",
    },
    buttonsContainer: {
      paddingBottom: verticalScale(16),
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
    },
    socialButton: {
      flexDirection: "row",
      width: "90%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: props.socialButtonBg || "#FFFFFF",
      borderWidth: 1.5,
      borderColor: "#081A35",
      paddingVertical: verticalScale(10),
      borderRadius: moderateScale(100),
      marginBottom: verticalScale(10),
    },
    socialButtonText: {
      fontSize: scaleFont(14),
      fontFamily: "Mukta-Bold",
      color: appColors.navyBlueShade,
      letterSpacing: -0.1,
      marginLeft: scale(12),
    },
    socialIcons: {
      height: moderateScale(22),
      width: moderateScale(22),
    },
    divider: {
      textAlign: "center",
      fontSize: scaleFont(15),
      color: props.dividerColor || "#8A97A3",
      marginVertical: verticalScale(6),
      fontFamily: "Mukta-Regular",
    },
    emailButton: {
      backgroundColor: appColors.navyBlueShade,
      borderRadius: moderateScale(100),
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: verticalScale(10),
      width: "90%",
      marginBottom: verticalScale(8),
    },
    emailButtonText: {
      fontSize: scaleFont(14),
      fontFamily: "Mukta-Bold",
      color: props.emailButtonTextColor || "#FFFFFF",
    },
    signupContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: verticalScale(14),
      marginTop: verticalScale(4),
    },
    signupText: {
      fontSize: scaleFont(13),
      color: props.signupTextColor || "#5A6B7D",
      fontFamily: "Mukta-Regular",
    },
    signupLink: {
      fontSize: scaleFont(13),
      color: "#0F1419",
      fontFamily: "Mukta-Bold",
    },
    customUnderline: {
      height: 2,
      backgroundColor: "#0F1419",
      width: "100%",
      marginTop: 1,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    footerLink: {
      fontSize: scaleFont(12),
      color: props.footerLinkColor || "#7A8794",
      fontFamily: "Mukta-Regular",
    },
    footerDot: {
      fontSize: scaleFont(10),
      color: props.footerLinkColor || "#7A8794",
    },
    homeIndicator: {
      width: scale(134),
      height: verticalScale(5),
      backgroundColor: props.homeIndicatorColor || "#1C1C1E",
      borderRadius: 100,
      alignSelf: "center",
      marginBottom: verticalScale(8),
      opacity: 1,
    },
  });
