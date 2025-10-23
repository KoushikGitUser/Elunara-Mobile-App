import { StyleSheet, Dimensions, Platform } from "react-native";
import { verticalScale } from "../../../utils/responsive";


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const createStyles = ({}) =>
  StyleSheet.create({
    menuModalMain:{
        position:"absolute",
        minHeight:verticalScale(250),
        minWidth:240,
        paddingHorizontal:15,
        paddingVertical:10,
        backgroundColor:"white",
        borderRadius:16,
        borderWidth:1,
        borderColor:"#D3DAE5",
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center",
        gap:5,
        zIndex:90,
        top:60,
        right:0,
    },
    menuOptionsMain:{
        width:"100%",
        minHeight:verticalScale(35),
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        gap:15,
        paddingLeft:5
    }
  });
