import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { moderateScale, verticalScale } from "../../../utils/responsive";
import { EvilIcons, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { ChevronDown } from "lucide-react-native";

const AIMessageBox = ({ message }) => {
  return (
    <View style={styles.mainBox}>
      <View style={styles.messageBox}>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.messageActions}> 
       <Ionicons name="copy-outline" size={18} color="black" />
       <SimpleLineIcons name="share-alt" size={18} color="black" />
       <Ionicons name="bookmark-outline" size={18} color="black" />
       <EvilIcons name="like" size={24} color="black" />
       <View style={{flexDirection:"row",}}>
       <Ionicons name="repeat" size={24} color="black" />
       <ChevronDown strokeWidth={1.25} />
       </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    gap:10,
    alignItems: "flex-start",
    marginBottom:15
  },
  messageBox: {
    minHeight: verticalScale(45),
    maxWidth: "100%",
    backgroundColor: "#ffffffff",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 16,
    borderTopLeftRadius: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: moderateScale(16),
    fontWeight: 400,
  },
  messageActions:{
    width:"auto",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    gap:12,
    marginLeft:10
  }
});

export default AIMessageBox;
