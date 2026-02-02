import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  Platform,
  ScrollView,
  Alert,
  PermissionsAndroid,
  ActivityIndicator,
} from "react-native";
import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./ChatHistorySidebar/chatSidebarStyles.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleAddItemsToInputPopup,
  setToggleIsChattingWithAI,
  setToggleIsWaitingForResponse,
  setToggleKeyboardVisibilityOnChatScreen,
  setToggleSubTopics,
  setToggleToolsPopup,
  setToggleTopicsPopup,
  setToggleUnlockPersonalisationLimitPopup,
  setIsEditingUserMessage,
} from "../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls, resetAIResponseRegenerated } from "../../redux/slices/apiCommonSlice";
import AddItemsToInputPopup from "../Modals/ChatScreen/AddItemsToInputPopup";
import {
  setUserMessagePrompt,
  removeSelectedFile,
  setChatInputContentLinesNumber,
  setChatMessagesArray,
  setSelecetdFiles,
  setCurrentSelectedTopic,
  setMessageIDsArray,
  setEditingMessageData,
  removeUploadedAttachmentId,
  clearUploadedAttachmentIds,
} from "../../redux/slices/globalDataSlice";
import ImageFile from "./ChatInputCompos/SelectedFilesCompo/ImageFile";
import PdfFile from "./ChatInputCompos/SelectedFilesCompo/PdfFile";
import DocumentFile, { SUPPORTED_DOCUMENT_TYPES } from "./ChatInputCompos/SelectedFilesCompo/DocumentFile";
import ClipIcon from "../../../assets/SvgIconsComponent/ChatInputIcons/ClipIcon";
import TopicsBooksIcon from "../../../assets/SvgIconsComponent/ChatInputIcons/TopicsBooksIcon";
import ToolsIcon from "../../../assets/SvgIconsComponent/ChatInputIcons/ToolsIcon";
import MicIcon from "../../../assets/SvgIconsComponent/ChatInputIcons/MicIcon";
import SendIcon from "../../../assets/SvgIconsComponent/ChatInputIcons/SendIcon";
import UnlockMaxUploadLimitPopup from "../Monetisation/UnlockMaxUploadLimitPopup";

const ChatInputMain = forwardRef(({ roomId, ...props }, ref) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates, chatCustomisationStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);
  const { chatsStates } = useSelector((state) => state.API);
  const isMessagesFetched = chatsStates.loaderStates.isMessagesFetched;
  const aiMessageContent = chatsStates.allChatsDatas.aiMessageContent;
  const isWaitingForResponse = toggleStates.toggleIsWaitingForResponse;
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const LINE_HEIGHT = 20;
  const PADDING_VERTICAL = 16; // 8 top + 8 bottom
  const MIN_HEIGHT = LINE_HEIGHT + PADDING_VERTICAL; // ~36px for 1 line
  const MAX_HEIGHT = LINE_HEIGHT * 5 + PADDING_VERTICAL; // ~76px for 3 lines
  const [inputHeight, setInputHeight] = useState(MIN_HEIGHT);
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");

  // Refs for guided tour measurement
  const inputSectionRef = useRef(null);
  const toolsIconRef = useRef(null);

  // Expose measurement methods via ref
  useImperativeHandle(ref, () => ({
    measureInputSection: () => {
      return new Promise((resolve) => {
        if (inputSectionRef.current) {
          inputSectionRef.current.measureInWindow((x, y, width, height) => {
            resolve({ x, y, width, height });
          });
        } else {
          resolve(null);
        }
      });
    },
    measureToolsIcon: () => {
      return new Promise((resolve) => {
        if (toolsIconRef.current) {
          toolsIconRef.current.measureInWindow((x, y, width, height) => {
            resolve({ x, y, width, height });
          });
        } else {
          resolve(null);
        }
      });
    },
  }));

  // Initialize line count on mount
  useEffect(() => {
    dispatch(setChatInputContentLinesNumber(1));
  }, []);


  // Handle file removal with API delete
  const handleRemoveFile = async (fileIndex) => {
    const file = globalDataStates.selectedFiles[fileIndex];
    const attachmentId = file?.attachmentId;

    // Remove from local state first
    dispatch(removeSelectedFile(fileIndex));

    // Delete from API if attachment ID exists
    if (attachmentId) {
      dispatch(removeUploadedAttachmentId(attachmentId));

      const deletePayload = {
        method: "DELETE",
        url: `/attachments/${attachmentId}`,
        name: "delete-attachment",
      };
      dispatch(commonFunctionForAPICalls(deletePayload));
    }
  };

  // Handle mic button press
  const handleMicPress = () => {
Alert.alert("Feature not available","Currently this feature is not implemented")
  };

  const sendMessageDirectly = () => {
    const chatUuid = chatsStates.allChatsDatas.createdChatDetails?.id;
    if (!chatUuid) {
      Alert.alert("Error", "No active chat found");
      return;
    }

    console.log("═══════════════════════════════════════════════════════");
    console.log("📨 SEND MESSAGE DIRECTLY - START");
    console.log("📨 Chat UUID:", chatUuid);
    console.log("📨 uploadedAttachmentIds from Redux:", JSON.stringify(globalDataStates.uploadedAttachmentIds));
    console.log("📨 uploadedAttachmentIds length:", globalDataStates.uploadedAttachmentIds?.length);
    console.log("📨 uploadedAttachmentIds type:", typeof globalDataStates.uploadedAttachmentIds);
    console.log("📨 selectedFiles from Redux:", JSON.stringify(globalDataStates.selectedFiles?.map(f => ({ name: f.name, attachmentId: f.attachmentId }))));

    const attachmentIdsToSend = globalDataStates.uploadedAttachmentIds || [];
    console.log("📨 attachmentIdsToSend:", JSON.stringify(attachmentIdsToSend));

    const data = {
      content: globalDataStates.userMessagePrompt,
      content_type: "text",
      attachment_ids: attachmentIdsToSend,
    };

    console.log("📨 SEND: Message payload data:", JSON.stringify(data, null, 2));

    // Add LLM ID if not null
    if (chatCustomisationStates?.selectedLLM?.id !== null) {
      data.llm_id = typeof chatCustomisationStates.selectedLLM.id === 'number'
        ? chatCustomisationStates.selectedLLM.id
        : parseInt(chatCustomisationStates.selectedLLM.id);
    }

    // Add Response Style ID if not null
    if (chatCustomisationStates?.selectedResponseStyle?.id !== null) {
      data.response_style_id = typeof chatCustomisationStates.selectedResponseStyle.id === 'number'
        ? chatCustomisationStates.selectedResponseStyle.id
        : parseInt(chatCustomisationStates.selectedResponseStyle.id);
    }

    // Add Language ID if not null
    if (chatCustomisationStates?.selectedLanguage?.id !== null) {
      data.language_id = typeof chatCustomisationStates.selectedLanguage.id === 'number'
        ? chatCustomisationStates.selectedLanguage.id
        : parseInt(chatCustomisationStates.selectedLanguage.id);
    }

    // Add Citation Format ID if not null
    if (chatCustomisationStates?.selectedCitationFormat?.id !== null) {
      data.citation_format_id = typeof chatCustomisationStates.selectedCitationFormat.id === 'number'
        ? chatCustomisationStates.selectedCitationFormat.id
        : parseInt(chatCustomisationStates.selectedCitationFormat.id);
    }
 
    const payload = {
      method: "POST",
      url: `/chats/${chatUuid}/messages`,
      data,
      name: "sendPromptAndGetMessageFromAI",
    };
    console.log("📨 SEND: Full API payload:", JSON.stringify(payload, null, 2));
    console.log("📨 SEND: data.attachment_ids specifically:", JSON.stringify(data.attachment_ids));
    console.log("═══════════════════════════════════════════════════════");
    dispatch(commonFunctionForAPICalls(payload));
  };

  const createChatWithAIFunction = () => {
    const data = {
      name: "Chat with Elunara",
    };

    // Add room_id if creating chat from within a room
    if (roomId) {
      data.room_id = roomId;
    }

    console.log("═══════════════════════════════════════════════════════");
    console.log("🟢 CREATE CHAT WITH AI - START");
    console.log("🟢 roomId prop:", roomId);
    console.log("🟢 data.room_id:", data.room_id);
    console.log("🟢 Full data payload:", JSON.stringify(data, null, 2));

    const payload = {
      method: "POST",
      url: "/chats",
      data,
      name: "createChatWithAI",
    };
    console.log("🟢 Full API payload:", JSON.stringify(payload, null, 2));
    console.log("═══════════════════════════════════════════════════════");
    dispatch(commonFunctionForAPICalls(payload));
  };

  const handleEditingModeSend = () => {
    const editingMessageData = globalDataStates.editingMessageData;
    if (!editingMessageData) return;

    const editingIndex = editingMessageData.messageIndex;
    const updatedMessage = globalDataStates.userMessagePrompt;

    // Get user message ID for the message being edited
    const userMessageId = globalDataStates.messageIDsArray[editingIndex];

    if (!userMessageId) {
      Alert.alert("Error", "Message ID not found");
      return;
    }

    // Get chat UUID for sending message
    const chatUuid = chatsStates.allChatsDatas.createdChatDetails?.id;
    if (!chatUuid) {
      Alert.alert("Error", "No active chat found");
      return;
    }

    // Keep array intact - just add edited message as new user message at the end
    const updatedChatMessagesArray = [
      ...globalDataStates.chatMessagesArray,
      {
        role: "user",
        message: updatedMessage,
        attachments: globalDataStates.selectedFiles?.length > 0
          ? [...globalDataStates.selectedFiles]
          : [],
      }
    ];

    // Update chat messages array
    dispatch(setChatMessagesArray(updatedChatMessagesArray));

    // Call update message API to update the original message
    const updatePayload = {
      method: "PUT",
      url: `/messages/${userMessageId}`,
      data: {
        content: updatedMessage,
      },
      name: "updateUserMessageForRegeneration",
    };

    // Call send message API (not regenerate) with the chat UUID
    const sendMessageData = {
      content: updatedMessage,
      content_type: "text",
      attachment_ids: globalDataStates.uploadedAttachmentIds || [],
    };

    // Add LLM ID if not null
    if (chatCustomisationStates?.selectedLLM?.id !== null) {
      sendMessageData.llm_id = typeof chatCustomisationStates.selectedLLM.id === 'number'
        ? chatCustomisationStates.selectedLLM.id
        : parseInt(chatCustomisationStates.selectedLLM.id);
    }

    // Add Response Style ID if not null
    if (chatCustomisationStates?.selectedResponseStyle?.id !== null) {
      sendMessageData.response_style_id = typeof chatCustomisationStates.selectedResponseStyle.id === 'number'
        ? chatCustomisationStates.selectedResponseStyle.id
        : parseInt(chatCustomisationStates.selectedResponseStyle.id);
    }

    // Add Language ID if not null
    if (chatCustomisationStates?.selectedLanguage?.id !== null) {
      sendMessageData.language_id = typeof chatCustomisationStates.selectedLanguage.id === 'number'
        ? chatCustomisationStates.selectedLanguage.id
        : parseInt(chatCustomisationStates.selectedLanguage.id);
    }

    // Add Citation Format ID if not null
    if (chatCustomisationStates?.selectedCitationFormat?.id !== null) {
      sendMessageData.citation_format_id = typeof chatCustomisationStates.selectedCitationFormat.id === 'number'
        ? chatCustomisationStates.selectedCitationFormat.id
        : parseInt(chatCustomisationStates.selectedCitationFormat.id);
    }

    const sendMessagePayload = {
      method: "POST",
      url: `/chats/${chatUuid}/messages`,
      data: sendMessageData,
      name: "sendPromptAndGetMessageFromAI",
    };

    // Dispatch both API calls
    dispatch(commonFunctionForAPICalls(updatePayload));
    dispatch(commonFunctionForAPICalls(sendMessagePayload));

    // Set waiting state
    dispatch(setToggleIsWaitingForResponse(true));

    // Clear input and reset editing state
    dispatch(setUserMessagePrompt(""));
    dispatch(setSelecetdFiles([]));
    dispatch(clearUploadedAttachmentIds());
    dispatch(setChatInputContentLinesNumber(1));
    dispatch(setIsEditingUserMessage(false));
    dispatch(setEditingMessageData(null));
  };

  const handleContentSizeChange = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;

    // Calculate number of lines
    const numberOfLines = Math.max(
      1,
      Math.ceil((contentHeight - PADDING_VERTICAL) / LINE_HEIGHT)
    );
    dispatch(setChatInputContentLinesNumber(numberOfLines));

    if (contentHeight < MIN_HEIGHT) {
      setInputHeight(MIN_HEIGHT);
    } else if (contentHeight > MAX_HEIGHT) {
      setInputHeight(MAX_HEIGHT);
    } else {
      setInputHeight(contentHeight);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        dispatch(setToggleKeyboardVisibilityOnChatScreen(true));
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
        dispatch(setToggleKeyboardVisibilityOnChatScreen(false));
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Get latest message data from API response
  const latestUserMessageData = chatsStates.allChatsDatas.latestUserMessageData;
  const latestAiMessageData = chatsStates.allChatsDatas.latestAiMessageData;

  // Real API flow - when AI message is fetched, add it to chat messages array with uuid
  useEffect(() => {
    if (isMessagesFetched === true && aiMessageContent) {
      console.log("Full AI Response:", JSON.stringify(chatsStates.allChatsDatas.chatMessages));
      console.log("Current messageIDsArray:", globalDataStates.messageIDsArray);

      const responseData = chatsStates.allChatsDatas.chatMessages;
      const userMessageId = responseData?.user_message?.id;
      const aiMessageId = responseData?.assistant_message?.id;

      // Update message IDs array
      if (userMessageId && aiMessageId) {
        dispatch(setMessageIDsArray([...globalDataStates.messageIDsArray, userMessageId, aiMessageId]));
      }

      const newAIMessage = {
        role: "ai",
        message: aiMessageContent,
        uuid: aiMessageId || null,
        is_saved_to_notes: false,
        suggestions: latestAiMessageData?.suggestions || [],
        sources: latestAiMessageData?.sources || [],
        generation: latestAiMessageData?.generation || null,
        version: 1,
        total_versions: 1,
        versions: [{
          content: aiMessageContent,
          uuid: aiMessageId || null,
          version: 1,
          total_versions: 1,
        }],
        currentVersionIndex: 0,
      };

      // Update the last user message with uuid if available
      let updatedMessages = [...globalDataStates.chatMessagesArray];

      // Find and update the last user message with uuid
      if (latestUserMessageData && updatedMessages.length > 0) {
        const lastIndex = updatedMessages.length - 1;
        if (updatedMessages[lastIndex].role === "user") {
          updatedMessages[lastIndex] = {
            ...updatedMessages[lastIndex],
            uuid: latestUserMessageData.uuid,
            is_saved_to_notes: latestUserMessageData.is_saved_to_notes,
          };
        }
      }

      // Add AI message with uuid
      dispatch(
        setChatMessagesArray([
          ...globalDataStates.chatMessagesArray,
          newAIMessage,
        ])
      );
      dispatch(setToggleIsWaitingForResponse(false));
    }
    // Handle error case
    if (isMessagesFetched === false && toggleStates.toggleIsWaitingForResponse) {
      dispatch(setToggleIsWaitingForResponse(false));
    }
  }, [isMessagesFetched, aiMessageContent, latestUserMessageData, latestAiMessageData]);

  // Reset input height when text is cleared
  useEffect(() => {
    if (globalDataStates.userMessagePrompt === "") {
      setInputHeight(MIN_HEIGHT);
      dispatch(setChatInputContentLinesNumber(1));
    }
  }, [globalDataStates.userMessagePrompt]);

  // Pre-fill input when editing mode is active
  useEffect(() => {
    if (toggleStates.isEditingUserMessage && globalDataStates.editingMessageData) {
      dispatch(setUserMessagePrompt(globalDataStates.editingMessageData.message));
    }
  }, [toggleStates.isEditingUserMessage, globalDataStates.editingMessageData]);

  // Handle regenerated AI response
  useEffect(() => {
    const isAIResponseRegenerated = chatsStates.loaderStates.isAIResponseRegenerated;

    if (isAIResponseRegenerated === true && aiMessageContent) {
      console.log("Full Regenerated AI Response:", JSON.stringify(chatsStates.allChatsDatas.regeneratedResponse));
      console.log("Current messageIDsArray:", globalDataStates.messageIDsArray);

      const regeneratedMessage = chatsStates.allChatsDatas.regeneratedResponse;
      const aiMessageIndex = globalDataStates.currentAIMessageIndexForRegeneration;

      if (aiMessageIndex !== null && aiMessageIndex >= 0) {
        // Create a new array with updated message
        const updatedChatMessagesArray = globalDataStates.chatMessagesArray.map((msg, index) => {
          if (index === aiMessageIndex) {
            // Get existing versions or initialize with current message
            const existingVersions = msg.versions || [{
              content: msg.message,
              uuid: msg.uuid,
              version: 1,
              total_versions: 1,
            }];

            // Add the new regenerated version
            const newVersion = {
              content: regeneratedMessage?.content || aiMessageContent,
              uuid: regeneratedMessage?.id || null,
              version: existingVersions.length + 1,
              total_versions: existingVersions.length + 1,
            };

            const updatedVersions = [...existingVersions, newVersion];
            const actualTotalVersions = updatedVersions.length;

            // Return new message object with updated version - show the LATEST regenerated version
            return {
              ...msg,
              message: newVersion.content,
              uuid: newVersion.uuid,
              version: actualTotalVersions, // Current version number
              total_versions: actualTotalVersions, // Total versions available
              generation: regeneratedMessage?.generation || msg.generation, // Store generation data for badges
              versions: updatedVersions,
              currentVersionIndex: updatedVersions.length - 1,
            };
          }
          return msg;
        });

        // Update the chat messages array
        dispatch(setChatMessagesArray(updatedChatMessagesArray));

        // Add the new AI message ID to messageIDsArray
        if (regeneratedMessage?.id) {
          dispatch(setMessageIDsArray([...globalDataStates.messageIDsArray, regeneratedMessage.id]));
        }
      }

      dispatch(setToggleIsWaitingForResponse(false));
      // Reset the regenerate state so it can be triggered again
      dispatch(resetAIResponseRegenerated());
    }

    // Handle error case
    if (isAIResponseRegenerated === false) {
      dispatch(setToggleIsWaitingForResponse(false));
      // Reset the regenerate state
      dispatch(resetAIResponseRegenerated());
    }
  }, [chatsStates.loaderStates.isAIResponseRegenerated, aiMessageContent]);

  return (
    <View
      style={[
        styles.chatInputMainWrapper,
        {
          marginBottom: keyboardHeight,
        },
      ]}
      pointerEvents={isWaitingForResponse ? "none" : "auto"}
    >
      <View
        ref={inputSectionRef}
        style={[
          styles.chatInputMain,
          {
            paddingTop: globalDataStates.selectedFiles.length > 0 ? 0 : 10,
            opacity: isWaitingForResponse ? 0.5 : 1,
          },
        ]}
      >
        {(globalDataStates.selectedFiles?.length > 0 || globalDataStates.isUploadingAttachment) && (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{ width: "100%" }}
          >
            <View
              style={[
                styles.filesContainerMain,
                {
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 25,
                  paddingRight: 30,
                },
              ]}
            >
              {globalDataStates.selectedFiles?.map((files, fileIndex) => {
                if (
                  ["image/png", "image/jpeg", "image/jpg"].includes(
                    files.mimeType
                  )
                ) {
                  return (
                    <ImageFile
                      key={fileIndex}
                      file={files}
                      onRemove={() => handleRemoveFile(fileIndex)}
                    />
                  );
                } else if (files.mimeType === "application/pdf") {
                  return (
                    <PdfFile
                      key={fileIndex}
                      onRemove={() => handleRemoveFile(fileIndex)}
                      file={files}
                    />
                  );
                } else if (
                  SUPPORTED_DOCUMENT_TYPES.includes(files.mimeType) ||
                  ["docx", "doc", "xlsx", "xls", "csv", "pptx", "ppt", "txt", "md", "json", "yaml", "yml", "html", "htm", "log"].includes(
                    files.name?.split(".").pop()?.toLowerCase()
                  )
                ) {
                  return (
                    <DocumentFile
                      key={fileIndex}
                      file={files}
                      onRemove={() => handleRemoveFile(fileIndex)}
                    />
                  );
                }
                return null;
              })}
              {/* Uploading loader */}
              {globalDataStates.isUploadingAttachment && (
                <View style={{
                  width: 100,
                  height: 65,
                  backgroundColor: "#EBF1FB",
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "#ABB8CC",
                  borderStyle: "dashed",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  <ActivityIndicator size="small" color="#1F2937" />
                  <Text style={{ fontSize: 11, color: "#6B7280", marginTop: 4, fontFamily: "Mukta-Regular" }}>Uploading...</Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}

        {isRecording && (
          <View style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: '#FEE2E2',
            borderRadius: 10,
            marginBottom: 5,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
            <View style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: '#EF4444',
            }} />
            <Text style={{
              fontFamily: 'Mukta-Regular',
              fontSize: 14,
              color: '#DC2626',
            }}>
              Listening...
            </Text>
          </View>
        )}

        <TextInput
          value={globalDataStates.userMessagePrompt}
          onChangeText={(text) => dispatch(setUserMessagePrompt(text))}
          placeholder={isRecording ? "Speak now..." : "Ask anything"}
          placeholderTextColor="grey"
          style={[
            styles.textInput,
            { height: inputHeight, fontFamily: "Mukta-Regular", fontSize: 16 },
          ]}
          multiline
          textAlignVertical="top"
          onContentSizeChange={handleContentSizeChange}
          scrollEnabled={inputHeight >= MAX_HEIGHT}
          returnKeyType="default"
          editable={!isWaitingForResponse && !isRecording}
        />
        <View style={styles.inputActionIconsMainWrapper}>
          <View style={styles.inputLeftActionIcons}>
            <View style={styles.parentContainer}>
              <TouchableOpacity
                onPress={() => dispatch(setToggleAddItemsToInputPopup(true))}
                style={{
                  backgroundColor: toggleStates.toggleAddItemsToInputPopup
                    ? "#EEF4FF"
                    : "transparent",
                  padding: 4,
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                <ClipIcon />
              </TouchableOpacity>
              {toggleStates.toggleAddItemsToInputPopup && (
                <AddItemsToInputPopup />
              )}
              {toggleStates.toggleUnlockMaxUploadLimitPopup && (
                <UnlockMaxUploadLimitPopup />
              )}
            </View>

            <TouchableOpacity
              onPress={() => {
                dispatch(setToggleTopicsPopup(true));
                dispatch(setToggleSubTopics(false));
                dispatch(setCurrentSelectedTopic(null));
              }}
            >
              <TopicsBooksIcon />
            </TouchableOpacity>

            <TouchableOpacity
              ref={toolsIconRef}
              style={
                toggleStates.toggleChatScreenGuideStart &&
                globalDataStates.guidedTourStepsCount == 1
                  ? styles.toolsIconButtonGuide
                  : styles.toolsIconButton
              }
              // style={{marginLeft:10,borderWidth:1,padding:6,borderColor:"#BFD6FE",borderRadius:10,elevation:10,backgroundColor:"white",shadowColor:"#426eb9ff"}}
              onPress={() => dispatch(setToggleToolsPopup(true))}
            >
              <ToolsIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.inputRightActionIcons}>
            {/* <TouchableOpacity
              onPress={handleMicPress}
              style={[
                isRecording && {
                  backgroundColor: '#EF4444',
                  borderRadius: 25,
                  padding: 8,
                }
              ]}
            >
              <MicIcon color={isRecording ? 'white' : undefined} />
            </TouchableOpacity> */}
            {globalDataStates.userMessagePrompt !== "" && (
              <TouchableOpacity
                onPress={() => {
                  // Check if in editing mode
                  if (toggleStates.isEditingUserMessage) {
                    handleEditingModeSend();
                    return;
                  }

                  console.log("═══════════════════════════════════════════════════════");
                  console.log("🔵 SEND BUTTON PRESSED!");
                  console.log("🔵 uploadedAttachmentIds:", JSON.stringify(globalDataStates.uploadedAttachmentIds));
                  console.log("🔵 uploadedAttachmentIds length:", globalDataStates.uploadedAttachmentIds?.length);
                  console.log("🔵 selectedFiles:", JSON.stringify(globalDataStates.selectedFiles?.map(f => ({ name: f.name, attachmentId: f.attachmentId }))));
                  console.log("🔵 isChattingWithAI:", toggleStates.toggleIsChattingWithAI);
                  console.log("═══════════════════════════════════════════════════════");

                  // Add user message to chat array with attachments
                  dispatch(
                    setChatMessagesArray([
                      ...globalDataStates.chatMessagesArray,
                      {
                        role: "user",
                        message: globalDataStates.userMessagePrompt,
                        attachments: globalDataStates.selectedFiles?.length > 0
                          ? [...globalDataStates.selectedFiles]
                          : [],
                      },
                    ])
                  );

                  // Check if already chatting with AI
                  if (toggleStates.toggleIsChattingWithAI) {
                    // Direct message send flow - chat already exists
                    sendMessageDirectly();
                    // Clear attachments only for direct send (ChatScreen handles new chat cleanup)
                    dispatch(setSelecetdFiles([]));
                    dispatch(clearUploadedAttachmentIds());
                  } else {
                    // Initial flow - create new chat
                    // DON'T clear attachments here - ChatScreen useEffect needs them
                    createChatWithAIFunction();
                    dispatch(setToggleIsChattingWithAI(true));
                  }

                  // Common cleanup (except attachments for new chat flow)
                  dispatch(setUserMessagePrompt(""));
                  dispatch(setChatInputContentLinesNumber(1));
                  dispatch(setToggleIsWaitingForResponse(true));
                }}
              >
                <SendIcon />
              </TouchableOpacity>
            )}
            {toggleStates.toggleIsWaitingForResponse && (
              <TouchableOpacity style={styles.gettingResponseIndicator}>
                <View style={styles.innerDotGettingresponse}></View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
});

export default ChatInputMain;
