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
    mainWrapper: {
      width: "100%",
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#FAFAFA",
    },
    roomsHeader: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor:"#FAFAFA",
      paddingHorizontal:20,
      paddingVertical:15,
      zIndex:999
    },
    rightHeaderIcons: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 20,
    },
    roomMiddleMain: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingHorizontal:20,
      width: "100%",
      gap: 25,
      marginBottom:30
    },
    middleIconAndText: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 20,
      width: "100%",
    },
    roomLogo: {
      height: 50,
      width: 51,
    },
    middleBelowAddSection: {
      minHeight: verticalScale(192),
      width: "100%",
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "#D3DAE5",
      backgroundColor: "white",
      paddingHorizontal: 12,
      paddingVertical: 16,
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
    },
    chatsScrollRooms:{
      width:"100%",
      maxHeight:SCREEN_HEIGHT*0.4
    },
    sources:{
      width:"100%",
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",

    },
    sourcesInn:{
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      gap:10
    },
    sourcesAndInstruction:{
     backgroundColor:"#F3F3F3",
     borderWidth:1,
     borderColor:"#E2E2E2",
     paddingHorizontal:10,
     paddingVertical:5,
     borderRadius:50
    },
    editBtn:{
     borderBottomWidth:1
    },
    addDetailsOptions: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: 20,
    },
    addDetailsBtn: {
      width: "100%",
      minHeight: verticalScale(44),
      borderWidth: 1,
      borderColor: "black",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
    },
    noResultMain: {
      width: "100%",
      flexDirection: "column",
      justifyContent: "center",
      gap: 10,
      alignItems: "center",
    },
  });
