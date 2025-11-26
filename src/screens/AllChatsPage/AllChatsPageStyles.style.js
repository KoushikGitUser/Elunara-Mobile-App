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
      paddingHorizontal: 20,
      gap: 30,
      paddingTop: 10,
      paddingBottom: 10,
      alignItems: "center",
      backgroundColor: "#FAFAFA",
      borderColor: "#D3DAE5",
    },
    searchAndIcons: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: 20,
      gap: 20,
      marginTop:15,
      
    },
    searchInputMain: {
      flex: 1,
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
    },
    searchIcon: {
      position: "absolute",
      left: 10,
    },
    searchInput: {
      width: "100%",
      height: verticalScale(40),
      borderWidth: 1,
      borderRadius: 16,
      borderColor: "#ABB8CC",
      paddingLeft: 40,
    },
    iconsMain: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 20,
    },
    allChatsScrollMain: {
      width: "100%",
      marginTop:30,
      paddingHorizontal:20
    },
    cardContainer: {
      paddingVertical: 16,
      zIndex:5,
      width:"100%",
    },
    cardPressed: {
      backgroundColor: "#F9FAFB",
    },
    cardContent: {
      flexDirection: "row",
      width:"100%",
      alignItems: "center",
      position:"relative",
    },
    iconContainer: {
      alignSelf:"flex-start",
      marginTop:3,
      marginRight:18
    },
    textContainer: {
      flex: 1,
      justifyContent: "center",
    },
    titleText: {
      fontSize: scaleFont(15),
      fontWeight: "600",
      color: "#3A3A3A",
      marginBottom: 4,
    },
    subtitleContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    subtitleText: {
      fontSize: scaleFont(13),
      color: "#757575",
      fontWeight: "400",
    },
    dotSeparator: {
      fontSize: 14,
      color: "#9CA3AF",
      marginHorizontal: 8,
    },
    menuButton: {
     marginLeft:"auto"
    },
    menuPressed: {
      opacity: 0.5,
    },
    separator: {
      height: 1,
      backgroundColor: "#F3F4F6",
      marginHorizontal: 16,
    },
    menuModalMain: {
      position: "absolute",
      minHeight: verticalScale(250),
      minWidth: 180,
      paddingHorizontal: 8,
      paddingVertical: 15,
      backgroundColor: "#ffffffff",
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#D3DAE5",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 5,
      zIndex: 99999999,
      top: 70,
      right: 0,
    },
    menuOptionsMain: {
      width: "100%",
      minHeight: verticalScale(35),
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 10,
      paddingLeft: 5,
      paddingVertical:7,
      borderRadius:10
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
    },
    fullScreenWrapper: {
      position: "absolute",
      bottom: -50,
      left: -40,
      width:screenWidth,
      height:screenHeight,
      zIndex: 9,
      backgroundColor:"transparent"
    },
  });
