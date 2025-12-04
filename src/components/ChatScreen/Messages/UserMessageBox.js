import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { use } from "react";
import { moderateScale, scaleFont, verticalScale } from "../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import pdfLogo from "../../../assets/images/pdf.png";
import { setToggleUserMessageActionPopup } from "../../../redux/slices/toggleSlice";
import { setChatTitleOnLongPress, setUserMessageOnLongPress } from "../../../redux/slices/globalDataSlice";

const UserMessageBox = ({ chat }) => {
  const { globalDataStates } = useSelector((state) => state.Global);
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

  const dispatch = useDispatch();

  return (
    <View style={styles.mainBox}>
      {chat.file?.mimeType == "image/png" ||
      chat.file?.mimeType == "image/jpg" ||
      chat.file?.mimeType == "image/jpeg" ? (
        <Image source={chat.file} style={styles.attachedImage} />
      ) : chat.file?.mimeType == "application/pdf"?(
        <View style={styles.pdfMain}>
          <View style={styles.pdfLogoContainer}>
            <Image
              source={pdfLogo}
              style={{ height: 25, width: 25, objectFit: "contain" }}
            />
          </View> 
          <View>
            <Text style={{ fontSize: scaleFont(12), fontWeight: 600 }}>
              {truncateFileName(chat.file?.name)}
            </Text>
            <Text style={{ fontSize: scaleFont(12), fontWeight: 400 }}>
              PDF
            </Text>
          </View>
        </View>
      ):null}

      <TouchableOpacity onLongPress={()=>{
        dispatch(setToggleUserMessageActionPopup(true));
        dispatch(setUserMessageOnLongPress(chat.message))
      }} style={styles.messageBox}>
        <Text style={[styles.message,{fontFamily:'Mukta-Regular'}]}>{chat.message} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    gap: 12,
    alignItems: "flex-end",
    marginTop: 20,
  },
  messageBox: {
    minHeight: verticalScale(45),
    maxWidth: "80%",
    backgroundColor: "#EBF1FB",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 20,
    borderTopRightRadius: 0,
    paddingHorizontal: 20,
    paddingVertical: 13,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: moderateScale(15),
    fontWeight: 400,
    color:"#3A3A3A"
  },
    pdfMain: {
    height: verticalScale(65),
    minWidth: 187,
    backgroundColor: "#EBF1FB",
    borderRadius: 20,
    position: "relative",
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingRight: 40,
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
  attachedImage:{
    width:"50%",
    objectFit:"cover",
    height:verticalScale(150),
    borderRadius:20,
    
  }
});

export default UserMessageBox;
