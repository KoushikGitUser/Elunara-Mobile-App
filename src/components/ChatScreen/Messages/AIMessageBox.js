import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moderateScale, verticalScale } from "../../../utils/responsive";
import { EvilIcons, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { ChevronDown } from "lucide-react-native";
import copy from "../../../assets/images/copy.png";
import share from "../../../assets/images/Share.png";
import bookmark from "../../../assets/images/Bookmarks.png";
import feedback from "../../../assets/images/Feedback.png";
import repeat from "../../../assets/images/Repeat.png";
import * as Clipboard from 'expo-clipboard';
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
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";

const AIMessageBox = ({ message, messageUuid, isSavedToNotes = false }) => {
  const dispatch = useDispatch();
  const { chatsStates } = useSelector((state) => state.API);
  const [changeResponsePopup,setChangeResponsePopup] = useState(false);
  const [sharePopup,setSharePopup] = useState(false);
  const [feedbackPopup,setFeedbackPopup] = useState(false);
  const [savedToNotes,setSavedToNotes] = useState(isSavedToNotes);
  const [isAddingToNotes, setIsAddingToNotes] = useState(false);
  const [isRemovingFromNotes, setIsRemovingFromNotes] = useState(false);

  const isAddToNotesPending = chatsStates?.loaderStates?.isAddToNotesPending;
  const isRemoveFromNotesPending = chatsStates?.loaderStates?.isRemoveFromNotesPending;

  // Watch for add to notes success
  useEffect(() => {
    if (isAddingToNotes && isAddToNotesPending === true) {
      setSavedToNotes(true);
      triggerToastWithAction("Response saved in note", "Response saved in note", "success", 5000, "View", () => console.log("View"));
      setIsAddingToNotes(false);
    }
  }, [isAddToNotesPending, isAddingToNotes]);

  // Watch for remove from notes success
  useEffect(() => {
    if (isRemovingFromNotes && isRemoveFromNotesPending === true) {
      setSavedToNotes(false);
      triggerToast("Response removed from notes", "", "normal", 3000);
      setIsRemovingFromNotes(false);
    }
  }, [isRemoveFromNotesPending, isRemovingFromNotes]);

  const handleCopy = async() => {
    await Clipboard.setStringAsync(message);
    triggerToast("Message copied!","","normal",3000)
  };

  const handleAddToNotes = () => {
    if (!messageUuid) {
      triggerToast("messageUuid is not available", "", "error", 3000);
      return;
    }
    setIsAddingToNotes(true);
    const payload = {
      method: "POST",
      url: `/messages/${messageUuid}/add-to-notes`,
      name: "postAddToNotes",
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  const handleRemoveFromNotes = () => {
    if (!messageUuid) {
      triggerToast("messageUuid is not available", "", "error", 3000);
      return;
    }
    setIsRemovingFromNotes(true);
    const payload = {
      method: "POST",
      url: `/messages/${messageUuid}/remove-from-notes`,
      name: "postRemoveFromNotes",
    };
    dispatch(commonFunctionForAPICalls(payload));
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

        <TouchableOpacity onPress={savedToNotes ? handleRemoveFromNotes : handleAddToNotes}>
          {savedToNotes ? <BookmarkFilledIcon/> : <BookMarkIcon/>}
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
