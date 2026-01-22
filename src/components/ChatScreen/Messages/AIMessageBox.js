import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moderateScale, verticalScale } from "../../../utils/responsive";
import { ChevronDown } from "lucide-react-native";
import copy from "../../../assets/images/copy.png";
import share from "../../../assets/images/Share.png";
import bookmark from "../../../assets/images/Bookmarks.png"; 
import feedback from "../../../assets/images/Feedback.png";
import repeat from "../../../assets/images/Repeat.png";
import * as Clipboard from 'expo-clipboard';
import CopyIcon from "../../../../assets/SvgIconsComponent/ChatMessagesActionIcons/CopyIcon";
import ShareIcon from "../../../../assets/SvgIconsComponent/ChatMessagesActionIcons/ShareIcon";
import BookMarkIcon from "../../../../assets/SvgIconsComponent/ChatMessagesActionIcons/BookMarkIcon";
import FeedbackIcon from "../../../../assets/SvgIconsComponent/ChatMessagesActionIcons/FeedbackIcon";
import SwitchIcon from "../../../../assets/SvgIconsComponent/ChatMessagesActionIcons/SwitchIcon";
import { triggerToast, triggerToastWithAction } from "../../../services/toast";
import ChangeResponsePopup from "../../Modals/ChatScreen/Messages/ChangeResponsePopup";
import MessageSharePopup from "../../Modals/ChatScreen/Messages/MessageSharePopup";
import BookmarkFilledIcon from "../../../../assets/SvgIconsComponent/ChatMessagesActionIcons/BookmarkFilledIcon";
import FeedbackPopup from "../../Modals/ChatScreen/Messages/FeedbackPopup";
import { commonFunctionForAPICalls, resetVersionSwitched } from "../../../redux/slices/apiCommonSlice";
import { setCurrentAIMessageIndexForRegeneration, setChatMessagesArray } from "../../../redux/slices/globalDataSlice";
import Markdown from 'react-native-markdown-display';

const AIMessageBox = ({ message, messageIndex, isSavedToNotes = false }) => {
  const dispatch = useDispatch();
  const { chatsStates } = useSelector((state) => state.API);
  const { globalDataStates } = useSelector((state) => state.Global);
  const [changeResponsePopup,setChangeResponsePopup] = useState(false);
  const [sharePopup,setSharePopup] = useState(false);
  const [feedbackPopup,setFeedbackPopup] = useState(false);
  const [savedToNotes,setSavedToNotes] = useState(isSavedToNotes);
  const [isAddingToNotes, setIsAddingToNotes] = useState(false);
  const [isRemovingFromNotes, setIsRemovingFromNotes] = useState(false);

  // Local state for version management
  const [currentVersion, setCurrentVersion] = useState(1);
  const [totalVersions, setTotalVersions] = useState(1);

  // Local state for customization badges (generation data)
  const [generationData, setGenerationData] = useState({
    llm: { name: "Auto" },
    style: { name: "Auto" },
    language: { name: "Auto" }
  });

  // Local state for switched version message content
  const [switchedVersionMessageContent, setSwitchedVersionMessageContent] = useState(null);

  const isAddToNotesPending = chatsStates?.loaderStates?.isAddToNotesPending;
  const isRemoveFromNotesPending = chatsStates?.loaderStates?.isRemoveFromNotesPending;

  // Get message UUID
  const messageUuid = globalDataStates.messageIDsArray[messageIndex] || "";

  // Get switchedVersionData from API response
  const switchedVersionData = chatsStates?.allChatsDatas?.switchedVersionData;

  // Get regenerated response data
  const regeneratedResponse = chatsStates?.allChatsDatas?.regeneratedResponse;

  // Get version info from the message in chatMessagesArray (updated by both regeneration and version switching)
  const currentMessage = globalDataStates.chatMessagesArray[messageIndex];

  // Check if this message has regenerations
  const hasRegenerations = totalVersions > 1;

  // Watch for regeneration success - update versions and generation data from regeneratedResponse
  const isAIResponseRegenerated = chatsStates?.loaderStates?.isAIResponseRegenerated;
  const currentAIMessageIndexForRegeneration = globalDataStates.currentAIMessageIndexForRegeneration;

  useEffect(() => {
    if (
      isAIResponseRegenerated === true &&
      regeneratedResponse &&
      currentAIMessageIndexForRegeneration === messageIndex
    ) {
      // Update versions from regeneration response
      if (regeneratedResponse.version !== undefined) {
        setCurrentVersion(regeneratedResponse.version);
      }
      if (regeneratedResponse.total_versions !== undefined) {
        setTotalVersions(regeneratedResponse.total_versions);
      }

      // Update generation data (customization badges) from regeneration response
      if (regeneratedResponse.generation) {
        setGenerationData({
          llm: regeneratedResponse.generation.llm || { name: "Auto" },
          style: regeneratedResponse.generation.style || { name: "Auto" },
          language: regeneratedResponse.generation.language || { name: "Auto" }
        });
      }
    }
  }, [isAIResponseRegenerated, regeneratedResponse, currentAIMessageIndexForRegeneration, messageIndex]);

  // Watch for compare store success - treat it like regeneration
  const isStoreCompareResponsePending = chatsStates?.loaderStates?.isStoreCompareResponsePending;
  const isStoreCompareStyleResponsePending = chatsStates?.loaderStates?.isStoreCompareStyleResponsePending;

  useEffect(() => {
    if (
      (isStoreCompareResponsePending === true || isStoreCompareStyleResponsePending === true) &&
      regeneratedResponse &&
      currentAIMessageIndexForRegeneration === messageIndex
    ) {
      // Update versions from compare store response (stored in regeneratedResponse)
      if (regeneratedResponse.version !== undefined) {
        setCurrentVersion(regeneratedResponse.version);
      }
      if (regeneratedResponse.total_versions !== undefined) {
        setTotalVersions(regeneratedResponse.total_versions);
      }

      // Update generation data (customization badges) from compare store response
      if (regeneratedResponse.generation) {
        setGenerationData({
          llm: regeneratedResponse.generation.llm || { name: "Auto" },
          style: regeneratedResponse.generation.style || { name: "Auto" },
          language: regeneratedResponse.generation.language || { name: "Auto" }
        });
      }

      // Show toast notification
      triggerToast(`Comparison response selected - Version ${regeneratedResponse.version}`, "", "success", 3000);
    }
  }, [isStoreCompareResponsePending, isStoreCompareStyleResponsePending, regeneratedResponse, currentAIMessageIndexForRegeneration, messageIndex]);

  // Watch for version switch success - update versions from switchedVersionData
  const isVersionSwitched = chatsStates?.loaderStates?.isVersionSwitched;

  useEffect(() => {
    if (
      isVersionSwitched === true &&
      switchedVersionData &&
      currentAIMessageIndexForRegeneration === messageIndex
    ) {
      // Update versions from switch version response
      if (switchedVersionData.version !== undefined) {
        setCurrentVersion(switchedVersionData.version);
      }
      if (switchedVersionData.total_versions !== undefined) {
        setTotalVersions(switchedVersionData.total_versions);
      }

      // Update generation data (customization badges) from switch version response
      if (switchedVersionData.generation) {
        setGenerationData({
          llm: switchedVersionData.generation.llm || { name: "Auto" },
          style: switchedVersionData.generation.style || { name: "Auto" },
          language: switchedVersionData.generation.language || { name: "Auto" }
        });
      }

      // Set switched version message content
      if (switchedVersionData.content) {
        setSwitchedVersionMessageContent(switchedVersionData.content);

        // Update the chatMessagesArray to show the new content
        const updatedChatMessagesArray = globalDataStates.chatMessagesArray.map((msg, index) => {
          if (index === messageIndex) {
            return {
              ...msg,
              message: switchedVersionData.content,
              version: switchedVersionData.version,
              total_versions: switchedVersionData.total_versions,
              generation: switchedVersionData.generation
            };
          }
          return msg;
        });

        // Dispatch the updated array to Redux
        dispatch(setChatMessagesArray(updatedChatMessagesArray));
      }

      // Show toast notification
      triggerToast(`Switched to version ${switchedVersionData.version}`, "", "normal", 3000);
      dispatch(resetVersionSwitched());
    }
  }, [isVersionSwitched, switchedVersionData, currentAIMessageIndexForRegeneration, messageIndex]);
  const lastNotesActionMessageUuid = chatsStates?.allChatsDatas?.lastNotesActionMessageUuid;

  // Helper function to update message's is_saved_to_notes in chatMessagesArray
  const updateMessageNotesStatus = (isSaved) => {
    const updatedMessages = globalDataStates.chatMessagesArray.map((msg) => {
      if (msg.uuid === messageUuid) {
        return { ...msg, is_saved_to_notes: isSaved };
      }
      return msg;
    });
    dispatch(setChatMessagesArray(updatedMessages));
  };

  // Watch for add to notes success - only update if this message was the one acted upon
  useEffect(() => {
    if (isAddingToNotes && isAddToNotesPending === true && lastNotesActionMessageUuid === messageUuid) {
      setSavedToNotes(true);
      updateMessageNotesStatus(true);
      triggerToastWithAction("Response saved in note", "Response saved in note", "success", 5000, "View", () => console.log("View"));
      setIsAddingToNotes(false);
    }
  }, [isAddToNotesPending, isAddingToNotes, lastNotesActionMessageUuid, messageUuid]);

  // Watch for remove from notes success - only update if this message was the one acted upon
  useEffect(() => {
    if (isRemovingFromNotes && isRemoveFromNotesPending === true && lastNotesActionMessageUuid === messageUuid) {
      setSavedToNotes(false);
      updateMessageNotesStatus(false);
      triggerToast("Response removed from notes", "", "normal", 3000);
      setIsRemovingFromNotes(false);
    }
  }, [isRemoveFromNotesPending, isRemovingFromNotes, lastNotesActionMessageUuid, messageUuid]);

  const handleCopy = async() => {
    await Clipboard.setStringAsync(currentMessage?.message || message);
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

  const handlePreviousVersion = () => {
    // Calculate previous version number based on current version from Redux
    const previousVersionNumber = currentVersion - 1;

    if (previousVersionNumber >= 1) {
      console.log("qiwudgiuqgwdiuqgwd");

      // Store the message index for the handler to use
      dispatch(setCurrentAIMessageIndexForRegeneration(messageIndex));

      // Call API to switch version
      const payload = {
        method: "POST",
        url: `/messages/${messageUuid}/versions/${previousVersionNumber}`,
        name: "switchVersionsOfAIResponse",
      };
      dispatch(commonFunctionForAPICalls(payload));
    }
  };

  const handleNextVersion = () => {
    // Calculate next version number based on current version from Redux
    const nextVersionNumber = currentVersion + 1;

    if (nextVersionNumber <= totalVersions) {
      // Store the message index for the handler to use
      dispatch(setCurrentAIMessageIndexForRegeneration(messageIndex));

      // Call API to switch version
      const payload = {
        method: "POST",
        url: `/messages/${messageUuid}/versions/${nextVersionNumber}`,
        name: "switchVersionsOfAIResponse",
      };
      dispatch(commonFunctionForAPICalls(payload));
    }
  };

  // Check if arrows should be disabled
  const isPrevDisabled = currentVersion <= 1;
  const isNextDisabled = currentVersion >= totalVersions;

  return (
    <View style={styles.mainBox}>
      <View style={styles.messageBox}>
         <Markdown>
           {currentMessage?.message || message}
          </Markdown>
      </View>

      {/* Customization Badges - Only show for regenerated messages */}
      {hasRegenerations && generationData && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.badgesContainer}
        >
          {generationData.llm?.name && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>LLM: {generationData.llm.name}</Text>
            </View>
          )}
          {generationData.style?.name && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Style: {generationData.style.name}</Text>
            </View>
          )}
          {generationData.language?.name && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Language: {generationData.language.name}</Text>
            </View>
          )}
        </ScrollView>
      )}

      {/* Actions Container - Everything on Left Side */}
      <View style={styles.actionsContainer}>
       {changeResponsePopup && <ChangeResponsePopup setChangeResponsePopup={setChangeResponsePopup}/>}
       {sharePopup && <MessageSharePopup setSharePopup={setSharePopup} messageContent={currentMessage?.message || message} />}
       {feedbackPopup && <FeedbackPopup close={setFeedbackPopup} />}

        {/* Version Navigation - Left Side */}
        {totalVersions > 1 && (
          <View style={styles.versionNavigation}>
            <TouchableOpacity
              style={styles.versionArrow}
              onPress={handlePreviousVersion}
              disabled={isPrevDisabled}
            >
              <ChevronDown
                style={{ transform: [{ rotate: '90deg' }] }}
                size={23}
                strokeWidth={1}
                color={isPrevDisabled ? "#D1D5DB" : "#1F2937"}
              />
            </TouchableOpacity>
            <Text style={styles.versionText}>
              {currentVersion}/{totalVersions}
            </Text>
            <TouchableOpacity
              style={styles.versionArrow}
              onPress={handleNextVersion}
              disabled={isNextDisabled}
            >
              <ChevronDown
                style={{ transform: [{ rotate: '-90deg' }] }}
                size={23}
                strokeWidth={1}
                color={isNextDisabled ? "#D1D5DB" : "#1F2937"}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Quick Actions - Left Side after version navigation */}
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
          <TouchableOpacity onPress={() => {
            dispatch(setCurrentAIMessageIndexForRegeneration(messageIndex));
            setChangeResponsePopup(true);
          }}>
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
  badgesContainer: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 12,
  },
  badge: {
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#D3DAE5",
  },
  badgeText: {
    fontSize: moderateScale(11),
    color: "#6B7280",
    fontFamily: "Mukta-Medium",
  },
  actionsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 12,
  },
  versionNavigation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginRight: 10,
  },
  versionArrow: {
    padding: 2,
  },
  versionText: {
    fontSize: moderateScale(12),
    fontWeight: "500",
    color: "#1F2937",
    fontFamily: "Mukta-Medium",
  },
});

export default AIMessageBox;
