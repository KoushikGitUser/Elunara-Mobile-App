import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  moderateScale,
  scale,
  scaleFont,
  verticalScale,
} from "../../utils/responsive";

const screenHeight = Dimensions.get("window").height;

export const createStyles = (props = {}) =>
  StyleSheet.create({
    chatMainWrapper: {
      flex:1,
      width: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#FAFAFA",
    },
    middleAndChatInputWrapper: {
      width: "100%",
      flexDirection: "column",
      paddingHorizontal: 20,
      backgroundColor: "#FAFAFA",
    },
  });
