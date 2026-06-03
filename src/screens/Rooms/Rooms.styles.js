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
      // Match ChatScreen: let the flex:1 middle section push the chat input
      // to the bottom of the screen. Previously this used
      // justifyContent: "space-between", which distributed leftover space
      // between children and lifted the input off the bottom edge.
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
    // Outer ScrollView style — fills the available space; layout/padding goes
    // into the contentContainerStyle below so flexGrow + justifyContent work
    // for both short (empty room) and long (many chats) content.
    roomMiddleMain: {
      flex: 1,
      width: "100%",
      zIndex: 2,
    },
    roomMiddleContent: {
      flexGrow: 1,
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingHorizontal: 20,
      // Top padding clears the absolute-positioned RoomsHeader so first
      // content isn't hidden behind it on initial render. Mirrors ChatScreen's
      // greetings ScrollView (ChatMiddleWrapper, non-chatting branch).
      paddingTop: 100,
      paddingBottom: 20,
      gap: 25,
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
      minHeight: "auto",
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
