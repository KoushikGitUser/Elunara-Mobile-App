import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  moderateScale,
  scale,
  scaleFont,
  verticalScale,
} from "../../utils/responsive";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

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
      height: verticalScale(64),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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
    chatMiddleSectionWrapper: {
      width: "100%",
      flex: 1,
      justifyContent:"flex-end"
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
      gap:20
    },
    topicsMain: {
      width: "100%",
      height: verticalScale(112),
      borderWidth: 1,
      borderColor: "#D3DAE5",
      borderRadius: 20,
      paddingHorizontal:12,
      paddingVertical:10, 
      flexDirection:"column",
      justifyContent:"flex-start",
      alignItems:"flex-start",
    },
    topicIcon:{
      height:24,
      width:24,
      borderWidth:1,
      borderRadius:50,
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center"
    },
    topicTitle:{
      fontSize:moderateScale(14),
      fontWeight:600
    },
    topicDesc:{
      fontSize:moderateScale(12),
      fontWeight:400
    },
    chatHistorySidebarBackgroundWrapper:{
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT,
        backgroundColor:"rgba(0, 0, 0, 0.12)",
        position:"absolute",
        left:0,
        top:0,
        zIndex:10
    },
    chatHistorySidebarWrapper:{
      width:SCREEN_WIDTH * 0.75,
      height:"100%",
      borderTopRightRadius:16,
      borderBottomRightRadius:16,
      backgroundColor:"white",
      borderWidth:1,
      borderColor:"lightgrey",
      position:"absolute",
      left:0,
      top:0,
      zIndex:20,
      paddingHorizontal:20,
      flexDirection:"column",
      justifyContent:"space-between",
      alignItems:"center"
    },
    chatHistorySidebarHeader:{
      width:"100%",
      flexDirection:"column",
      alignItems:"center",
      gap:verticalScale(20),
    },
    sidebarTopImageMain:{
      width:"100%",
      flexDirection:"row",
      justifyContent:"flex-start",
      gap:20,
      marginTop:20
    },
    searchInputMain:{
     width:"100%",
     position:"relative",
    },
    searchIcon:{
     position:"absolute",
     left:15,
     top:"30%",

    },
    searchInput:{
     width:"100%",
     height: verticalScale(40),
     borderWidth:1,
     borderRadius:12,
     borderColor:"#ABB8CC",
     paddingLeft:45
    },
    newButtonsMain:{
     width:"100%",
     flexDirection:"column",
     justifyContent:"space-between",
     alignItems:"center",
     gap:20
    },
    newChatBtn:{
       width:"100%",
       height:verticalScale(36),
       flexDirection:"row",
       justifyContent:"flex-start",
       alignItems:"center",
       gap:20,
       paddingHorizontal:20,
       backgroundColor:"#EBF1FB",
       borderRadius:12
    },
    newLearningTabBtn:{
       width:"100%",
       height:verticalScale(36),
       flexDirection:"row",
       justifyContent:"flex-start",
       alignItems:"center",
       gap:20,
       paddingHorizontal:20
    },
    btnTexts:{
       fontWeight:600,
    },
    chakraLogoSidebar:{
      height:verticalScale(32),
      width:verticalScale(32),
    },
    elunaraLogoSidebar:{
      height:verticalScale(32),
      width:verticalScale(95),
    },
    chatHistorySidebarMiddle:{
      width:"100%",
      flex:1,
    },
    chatHistorySidebarFooter:{
      width:"100%",
      flexDirection:"column",
      alignItems:"center",
      gap:verticalScale(15),
    },
    chatInputMainWrapper: {
      width: "100%",
    },
    chatInputMain: {
      width: "100%",
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderWidth: 1,
      borderColor: "#ABB8CC",
      borderRadius: 24,
      flexDirection: "column",
      alignItems: "center",
      gap: verticalScale(12),
    },
    textInput: {
      width: "100%",
      height: verticalScale(37),
    },
    inputActionIconsMainWrapper: {
      height: verticalScale(32),
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    inputLeftActionIcons: {
      height: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: scale(12),
    },
    inputRightActionIcons: {
      height: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: scale(12),
    },
  });
