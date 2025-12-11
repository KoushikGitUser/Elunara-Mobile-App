import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
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
import { triggerToast, triggerToastWithAction } from "../../../services/toast";
import ChangeResponsePopup from "../../Modals/ChatScreen/Messages/ChangeResponsePopup";
import MessageSharePopup from "../../Modals/ChatScreen/Messages/MessageSharePopup";
import BookmarkFilledIcon from "../../../../assets/SvgIconsComponent/ChatMessagesActionIcons/BookmarkFilledIcon";
import FeedbackPopup from "../../Modals/ChatScreen/Messages/FeedbackPopup";

const AIMessageBox = ({ message }) => {
  const [changeResponsePopup,setChangeResponsePopup] = useState(false);
  const [sharePopup,setSharePopup] = useState(false);
  const [feedbackPopup,setFeedbackPopup] = useState(false);
  const [savedToNotes,setSavedToNotes] = useState(false); 
  const handleCopy = () => {
    Clipboard.setString(message);
    triggerToast("Message copied!","","normal",3000)
  };

  return (
    <View style={styles.mainBox}>
      <View style={styles.messageBox}>
        <Text style={[styles.message,{fontFamily:'Mukta-Regular'}]}>{message}</Text>
      </View>

      <View style={styles.messageActions}>
       {changeResponsePopup && <ChangeResponsePopup setChangeResponsePopup={setChangeResponsePopup}/>}
       {sharePopup && <MessageSharePopup setSharePopup={setSharePopup}/>}
       {feedbackPopup && <FeedbackPopup close={setFeedbackPopup} />}
        <TouchableOpacity onPress={handleCopy}>
          <CopyIcon/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSharePopup(true)}>
          <ShareIcon/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          setSavedToNotes(!savedToNotes);
          triggerToastWithAction("Response saved in note","Response saved in note","success",5000,"View",()=>console.log("View")
          )
        }}>
          {savedToNotes?<BookmarkFilledIcon/>:<BookMarkIcon/>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFeedbackPopup(true)}>
          <FeedbackIcon/>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => setChangeResponsePopup(true)}>
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
    fontSize: moderateScale(15),
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
