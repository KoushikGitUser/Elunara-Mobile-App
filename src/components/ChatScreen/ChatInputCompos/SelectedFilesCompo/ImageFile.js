import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { verticalScale } from "../../../../utils/responsive";
import { X } from "lucide-react-native";

const ImageFile = ({ file, onRemove }) => {
  return (
    <View style={styles.imageFileMain}>
      <Image style={styles.imageFile} source={file} />
      <TouchableOpacity style={styles.crossBtn} onPress={onRemove}>
        <X size={15} color="white" strokeWidth={1.5} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageFileMain: {
    borderRadius: 20,
    position:"relative"
  },
  imageFile: {
    height: verticalScale(65),
    width: 100,
    borderRadius: 20,
    borderWidth:1,
    borderColor:"#ABB8CC"
  },
  crossBtn:{
    position:"absolute",
    height:24,
    width:24,
    borderRadius:50,
    backgroundColor:"black",
    right:-12,
    top:-10,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  }
});

export default ImageFile;
