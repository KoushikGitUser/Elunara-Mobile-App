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
   notesMainWrapper:{
    width:"100%",
    height:"100%",
    paddingVertical:10,
    flexDirection:"column",
    justifyContent:"space-between",
    gap:10,
   },
   notesHeader:{
    width:"100%",
    paddingVertical:10,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20,
   },
   backBtn:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
   },
   rightOptionsMain:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    gap:12,
   },
   doneBtn:{
    borderWidth:1,
    borderRadius:25,
    paddingVertical:7,
    paddingHorizontal:20
   },
   notesInput:{
    width:"100%",
    flex:1,
    paddingHorizontal:20,
    color:"black",
   },
   footerActions:{
    width:"100%",
    paddingVertical:15,
    paddingHorizontal:20,
    backgroundColor:"#E2E2E2",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"flex-end",
   },
   menuDots:{
    position:"relative",
   },
   notesPopup:{
    position:"absolute",
    backgroundColor:"white",
    borderWidth:1,
    borderColor:"#D3DAE5",
    borderRadius:16,
    padding:10,
    width:"auto",
    height:"auto",
    top:"100%",
    right:0
   },
   notesPopupOptions:{
    flexDirection:"row",
    justifyContent:"flex-start",
    gap:15,

   }
  });
