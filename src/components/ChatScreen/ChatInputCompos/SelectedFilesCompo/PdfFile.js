import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { scaleFont, verticalScale } from "../../../../utils/responsive";
import pdfLogo from "../../../../assets/images/pdf.png";
import { X } from "lucide-react-native";

const PdfFile = ({ file, onRemove }) => {
  const truncateFileName = (fileName) => {
    if (!fileName) return "";

    // Remove the .pdf extension if it exists
    const nameWithoutExtension = fileName.replace(/\.pdf$/i, "");

    // If the name is longer than 15 characters, truncate it
    if (nameWithoutExtension.length > 15) {
      return nameWithoutExtension.substring(0, 15) + "...pdf";
    }

    // Return the original name with .pdf extension
    return nameWithoutExtension + ".pdf";
  };

  return (
    <View style={styles.pdfMain}>
      <View style={styles.pdfLogoContainer}>
        <Image
          source={pdfLogo}
          style={{ height: 25, width: 25, objectFit: "contain" }}
        />
      </View>
      <View>
        <Text style={{ fontSize: scaleFont(12), fontWeight: 600 }}>
          {truncateFileName(file.name)}
        </Text>
        <Text style={{ fontSize: scaleFont(12), fontWeight: 400 }}>PDF</Text>
      </View>
      <TouchableOpacity style={styles.crossBtn} onPress={onRemove}>
        <X size={15} color="white" strokeWidth={1.5} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pdfMain: {
    height: verticalScale(65),
    minWidth: 187,
    backgroundColor: "#EBF1FB",
    borderRadius: 20,
    position: "relative",
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 17,
  },
  pdfLogoContainer: {
    height: "100%",
    width: 60,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#c3cddcff",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  crossBtn:{
    position:"absolute",
    height:24,
    width:24,
    borderRadius:50,
    backgroundColor:"black",
    right:-15,
    top:-12,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  }
});

export default PdfFile;
