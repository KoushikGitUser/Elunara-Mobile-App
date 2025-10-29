import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { verticalScale } from "../../../../utils/responsive";
import { X } from "lucide-react-native";

const ImageFile = ({ file }) => {
  return (
    <View style={styles.imageFileMain}>
      <Image style={styles.imageFile} source={file} />
      <TouchableOpacity style={styles.crossBtn}>
        <X size={15} color="white" strokeWidth={1.5} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageFileMain: {
    borderRadius: 16,
    position:"relative"
  },
  imageFile: {
    height: verticalScale(65),
    width: 100,
    borderRadius: 16,
    borderWidth:1,
    borderColor:"#ABB8CC"
  },
  crossBtn:{
    position:"absolute",
    height:20,
    width:20,
    borderRadius:50,
    backgroundColor:"black",
    left:"92%",
    bottom:"86%",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  }
});

export default ImageFile;
