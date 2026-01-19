import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  moderateScale,
  scale,
  scaleFont,
  verticalScale,
} from "../../utils/responsive";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;


export const createStyles = (props = {}) =>
  StyleSheet.create({
        chatHeader: {
      width: "100%",
      zIndex: 9,
      minHeight: verticalScale(64),
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: 30,
      paddingTop: 10,
      paddingBottom: 10,
      alignItems: "center",
      backgroundColor: "#FAFAFA",
      borderColor: "#D3DAE5",
    },
  });
