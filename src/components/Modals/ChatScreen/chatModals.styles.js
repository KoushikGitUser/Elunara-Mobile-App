import { StyleSheet, Dimensions, Platform } from "react-native";
import { verticalScale } from "../../../utils/responsive";

const { width,height} = Dimensions.get("window");

export const createStyles = ({}) =>
  StyleSheet.create({
    menuModalMain: {
      position: "absolute",
      minHeight: verticalScale(250),
      minWidth: 240,
      paddingHorizontal: 8,
      paddingVertical: 10,
      backgroundColor: "white",
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#D3DAE5",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 5,
      zIndex: 90,
      top: 80,
      right: 20,
    },
    menuOptionsMain: {
      width: "100%",
      minHeight: verticalScale(35),
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 15,
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
      width,
      height,
      zIndex: 9,
      backgroundColor:"transparent"
    },
    addItemsMain:{
      position:"absolute",
      minHeight:verticalScale(120),
      minWidth:165,
      borderRadius:16,
      borderWidth:1,
      borderColor:"#D3DAE5",
      backgroundColor:"white",
      bottom:40,
      left:0,
      zIndex:99,
      flexDirection:"column",
      justifyContent:"space-between",
      alignItems:"center",
      gap:5,
      paddingVertical:7,
      paddingHorizontal:5
    }
  });
