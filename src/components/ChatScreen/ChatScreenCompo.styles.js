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
      top:30,
      left:0,
      zIndex:9,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal:20,
      paddingVertical:18,
      alignItems: "center",
      backgroundColor: "#FAFAFA",
      borderColor:"#D3DAE5"
    },
    upgradeButton: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingVertical: moderateScale(5),
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#081A35",
      fontSize: moderateScale(14),
      borderRadius: 24,
      fontWeight: 600,
      gap: 5,
    },
    chatnameAndSection:{
       flexDirection:"column",
       justifyContent:"space-between",
       alignItems:"center",
       gap:5
    },
    topicNamemain:{
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingVertical: 2,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#93BCFD",
      backgroundColor:"#E9F2FF",
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
      zIndex: 2,
    },
    chatLoaderMain:{
      width:"100%",
      flexDirection:"row",
      justifyContent:"flex-start",
      paddingVertical:10,
      marginBottom:10

    },
    topicsMainWrapper: {
      width: "100%",
      paddingVertical: moderateScale(25),
      flexDirection: "row",
      justifyContent: "space-between",
    },
    grid:{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    },
    topicsContainerHalf: {
      width: "47%",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 20,
    },
    chakraLogoRight: {
      height: 142,
      width: 100,
      position: "absolute",
      right: -20,
      top:180,
      zIndex: 1,
      marginTop: 10,
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
