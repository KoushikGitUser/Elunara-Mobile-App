import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { moderateScale, verticalScale } from "../../../utils/responsive";
import { EvilIcons, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { ChevronDown } from "lucide-react-native";
import copy from "../../../assets/images/copy.png";
import share from "../../../assets/images/Share.png";
import bookmark from "../../../assets/images/Bookmarks.png";
import feedback from "../../../assets/images/Feedback.png";
import repeat from "../../../assets/images/Repeat.png";
import Clipboard from "@react-native-clipboard/clipboard";
import CopyIcon from "../../../../assets/SvgIconsComponent/ChatMessagesActionIcons/CopyIcon";
import ShareIcon from "../../../../assets/SvgIconsComponent/ChatMessagesActionIcons/ShareIcon";
import NotesIcon from "../../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/NotesIcon"
import BookMarkIcon from "../../../../assets/SvgIconsComponent/ChatMessagesActionIcons/BookMarkIcon";
import FeedbackIcon from "../../../../assets/SvgIconsComponent/ChatMessagesActionIcons/FeedbackIcon";
import SwitchIcon from "../../../../assets/SvgIconsComponent/ChatMessagesActionIcons/SwitchIcon";

const AIMessageBox = ({ message }) => {
  
  const handleCopy = () => {
    Clipboard.setString(message);
  };

  return (
    <View style={styles.mainBox}>
      <View style={styles.messageBox}>
        <Text style={styles.message}>{message}</Text>
      </View>

      <View style={styles.messageActions}>
        <TouchableOpacity onPress={handleCopy}>
          <CopyIcon/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Share pressed")}>
          <ShareIcon/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Bookmark pressed")}>
          <BookMarkIcon/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Feedback pressed")}>
          <FeedbackIcon/>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => console.log("Repeat pressed")}>
            <SwitchIcon/>
          </TouchableOpacity>
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
    gap: 10,
    alignItems: "flex-start",
    marginBottom: 15,
  },
  messageBox: {
    minHeight: verticalScale(45),
    maxWidth: "100%",
    backgroundColor: "#ffffffff",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 20,
    borderTopLeftRadius: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: moderateScale(14),
    fontWeight: 400,
    color:"#5E5E5E"
  },
  messageActions: {
    width: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginLeft: 10,
  },
});

export default AIMessageBox;
