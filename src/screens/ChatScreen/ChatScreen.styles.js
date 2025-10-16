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
    },
  });
