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
    notesMainWrapper: {
      width: "100%",
      height: "100%",
      paddingVertical: 10,
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 10,
    },
    notesHeader: {
      width: "100%",
      paddingVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    backBtn: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    rightOptionsMain: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
    },
    doneBtn: {
      borderWidth: 1,
      borderRadius: 25,
      paddingVertical: 7,
      paddingHorizontal: 20,
    },
    notesInput: {
      width: "100%",
      flex: 1,
      paddingHorizontal: 20,
      color: "black",
    },
    footerActions: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginBottom: 50,
      backgroundColor: "#E2E2E2",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 1,
    },
    sizingOptionsMain:{
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      gap:15
    },
    backFromSize:{
      borderRightWidth:1,
      paddingVertical:1,
      paddingRight:10,
      borderColor:"#888888",

    },
    searchInputMain: {
      width:"60%",
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor:"white",
      borderRadius:16,
      borderWidth: 1,
      borderColor: "#ABB8CC",
      height: verticalScale(37),
    },
    searchIcon: {
      position: "absolute",
      left: 10,
      zIndex: 1,
    },
    searchInput: {
      flex: 1,
      height: "100%",
      paddingLeft: 40,
      paddingRight: 60,
    },
    collapsedButton: {
      position: "absolute",
      right: 20,
      backgroundColor: "#081A35",
      padding: 12,
      borderRadius: 100,
      zIndex: 9,
    },
    textPlusImgArea: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    crossIcon: {
      backgroundColor: "white",
      borderRadius: 50,
      padding: 4,
      borderWidth: 1,
    },
    menuDots: {
      position: "relative",
    },
    notesPopup: {
      position: "absolute",
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "#D3DAE5",
      borderRadius: 21,
      padding: 10,
      width: "auto",
      top: 100,
      right: 50,
      zIndex: 99,
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 10,
    },
    notesPopupOptions: {
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: 5,
      alignItems: "center",
      width: "100%",
      height: 45,
      padding: 7,
      borderRadius: 12,
    },
    optionsPopupWrapper: {
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: 9,
    },
  });
