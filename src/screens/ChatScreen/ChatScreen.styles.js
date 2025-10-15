import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  moderateScale,
  scale,
  scaleFont,
  verticalScale,
} from "../../utils/responsive";

export const createStyles = (props = {}) =>
  StyleSheet.create({
    chatMainWrapper: {
      height: "100%",
      width: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      backgroundColor: "#FAFAFA",
      paddingBottom: 20,
    },
    chatHeader: {
      width: "100%",
      height: verticalScale(64),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    upgradeButton: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingVertical: moderateScale(3),
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#081A35",
      fontSize: moderateScale(14),
      borderRadius: 24,
      fontWeight: 600,
      gap: 5,
    },
    chatMiddleSectionWrapper: {
      width: "100%",
      flex: 1,
    },
    chatInputMainWrapper: {
      width: "100%",
    },
    chatInputMain: {
      width: "100%",
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderWidth: 1,
      borderColor: "#ABB8CC",
      borderRadius: 24,
      flexDirection: "column",
      alignItems: "center",
      gap: verticalScale(12),
    },
    textInput: {
      width: "100%",
      height: verticalScale(37),
    },
    inputActionIconsMainWrapper: {
      height: verticalScale(32),
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    inputLeftActionIcons: {
      height: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: scale(12),
    },
    inputRightActionIcons: {
      height: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: scale(12),
    },
  });
