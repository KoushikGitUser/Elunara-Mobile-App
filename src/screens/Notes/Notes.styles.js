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
      paddingVertical: 15,
      paddingHorizontal: 20,
      paddingBottom: 65,
      backgroundColor: "#E2E2E2",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      zIndex: 1,
    },
    searchInputMain: {
      width:"60%",
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor:"white",
      borderRadius:16
    },
    searchIcon: {
      position: "absolute",
      left: 10,
    },
    searchInput: {
      width:"100%",
      height: verticalScale(40),
      borderWidth: 1,
      borderRadius: 16,
      borderColor: "#ABB8CC",
      paddingLeft: 40,
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
      padding: 3,
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
