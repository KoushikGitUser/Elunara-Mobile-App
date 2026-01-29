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
} from "../../redux/slices/globalDataSlice";
import ImageFile from "./ChatInputCompos/SelectedFilesCompo/ImageFile";
import PdfFile from "./ChatInputCompos/SelectedFilesCompo/PdfFile";
import ClipIcon from "../../../assets/SvgIconsComponent/ChatInputIcons/ClipIcon";
import TopicsBooksIcon from "../../../assets/SvgIconsComponent/ChatInputIcons/TopicsBooksIcon";
import ToolsIcon from "../../../assets/SvgIconsComponent/ChatInputIcons/ToolsIcon";
import MicIcon from "../../../assets/SvgIconsComponent/ChatInputIcons/MicIcon";
import SendIcon from "../../../assets/SvgIconsComponent/ChatInputIcons/SendIcon";
import UnlockMaxUploadLimitPopup from "../Monetisation/UnlockMaxUploadLimitPopup";

const ChatInputMain = forwardRef((props, ref) => {
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

    const data = {
      content: globalDataStates.userMessagePrompt,
      content_type: "text",
      attachment_ids: [],
    };

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
    dispatch(commonFunctionForAPICalls(payload));
  };

  const createChatWithAIFunction = () => {
    const payload = {
      method: "POST",
      url: "/chats",
      data: {
        name: "Chatting with AI",
      },
      name: "createChatWithAI",
    };
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
      attachment_ids: [],
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
    console.log("🔍 useEffect triggered! isMessagesFetched:", isMessagesFetched, "aiMessageContent:", aiMessageContent ? "EXISTS" : "NULL");

    if (isMessagesFetched === true && aiMessageContent) {
      console.log("✨ CONDITION MET! Processing AI response...");
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
      console.log("🚀 Adding AI message to array:", newAIMessage);
      console.log("📊 Current chatMessagesArray:", globalDataStates.chatMessagesArray);
      console.log("📏 Array length before:", globalDataStates.chatMessagesArray.length);

      dispatch(
        setChatMessagesArray([
          ...globalDataStates.chatMessagesArray,
          newAIMessage,
        ])
      );

      console.log("✅ Dispatched setChatMessagesArray with", globalDataStates.chatMessagesArray.length + 1, "messages");
      dispatch(setToggleIsWaitingForResponse(false));
    }
    // Handle error case
    if (isMessagesFetched === false && toggleStates.toggleIsWaitingForResponse) {
      console.log("❌ Message fetch failed, clearing loader");
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
        {globalDataStates.selectedFiles?.length > 0 && (
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
                      onRemove={() => dispatch(removeSelectedFile(fileIndex))}
                    />
                  );
                } else if (files.mimeType == "application/pdf") {
                  return (
                    <PdfFile
                      key={fileIndex}
                      onRemove={() => dispatch(removeSelectedFile(fileIndex))}
                      file={files}
                    />
                  );
                } else {
                  Alert.alert(
                    "Invalid File Type",
                    "Selected file type is not supported"
                  );
                }
              })}
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
            <View
              style={[
                styles.parentContainer,
                {
                  backgroundColor: toggleStates.toggleAddItemsToInputPopup
                    ? "#EEF4FF"
                    : "",
                  padding: 4,
                  borderRadius: 8,
                  borderRadius: 8,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => dispatch(setToggleAddItemsToInputPopup(true))}
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

                  // Add user message to chat array
                  dispatch(
                    setChatMessagesArray([
                      ...globalDataStates.chatMessagesArray,
                      {
                        role: "user",
                        message: globalDataStates.userMessagePrompt,
                        file: globalDataStates.selectedFiles
                          ? globalDataStates.selectedFiles[0]
                          : null,
                      },
                    ])
                  );

                  // Check if already chatting with AI
                  if (toggleStates.toggleIsChattingWithAI) {
                    // Direct message send flow - chat already exists
                    sendMessageDirectly();
                  } else {
                    // Initial flow - create new chat
                    createChatWithAIFunction();
                    dispatch(setToggleIsChattingWithAI(true));
                  }

                  // Common cleanup
                  dispatch(setUserMessagePrompt(""));
                  dispatch(setSelecetdFiles([]));
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
