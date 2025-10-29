import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  moderateScale,
  scale,
  scaleFont,
  verticalScale,
} from "../../utils/responsive";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const createStyles = ({}) =>
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
      position:"absolute",
      top:0,
      left:0,
      zIndex:9,
      minHeight: verticalScale(64),
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal:20,
      paddingTop:60,
      paddingBottom:25,
      alignItems: "center",
      backgroundColor: "#FAFAFA",
      borderColor:"#D3DAE5"
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
    rightChatHeaderIcons: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
    },
    chatMiddleSectionWrapper: {
      width: "100%",
      flex: 1,
      justifyContent: "flex-end",
    },
    messagesContainer: {
      width: "100%",
      flex: 1,
      flexDirection: "column",
      marginTop:80,
    },
    topicsMainWrapper: {
      width: "100%",
      paddingVertical: moderateScale(30),
      flexDirection: "row",
      justifyContent: "space-between",
    },
    topicsContainerHalf: {
      width: "47%",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 20,
    },
    topicsMain: {
      width: "100%",
      height: verticalScale(112),
      borderWidth: 1,
      borderColor: "#D3DAE5",
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 10,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    topicIcon: {
      height: 24,
      width: 24,
      borderWidth: 1,
      borderRadius: 50,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    topicTitle: {
      fontSize: moderateScale(14),
      fontWeight: 600,
    },
    topicDesc: {
      fontSize: moderateScale(12),
      fontWeight: 400,
    },
  });
