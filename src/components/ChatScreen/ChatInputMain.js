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
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  LibraryBig,
  Mic,
  Paperclip,
  Send,
  TouchpadOff,
} from "lucide-react-native";
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
} from "../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";
import AddItemsToInputPopup from "../Modals/ChatScreen/AddItemsToInputPopup";
import topicsIcon from "../../assets/images/TopicsIcon.png";
import toolsIcon from "../../assets/images/toolsIcon.png";
import clipIcon from "../../assets/images/clip.png";
import mic from "../../assets/images/mic.png";
import send from "../../assets/images/sendIcon.png";
import {
  setUserMessagePrompt,
  removeSelectedFile,
  setChatInputContentLinesNumber,
  setChatMessagesArray,
  setSelecetdFiles,
  setCurrentSelectedTopic,
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

  const sendMessageDirectly = () => {
    const chatUuid = chatsStates.allChatsDatas.createdChatDetails?.id;
    if (!chatUuid) {
      Alert.alert("Error", "No active chat found");
      return;
    }

    const payload = {
      method: "POST",
      url: `/chats/${chatUuid}/messages`,
      data: {
        content: globalDataStates.userMessagePrompt,
        content_type: "text",
        attachment_ids: [],
      },
      name: "sendPromptAndGetMessageFromAI",
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  const createChatWithAIFunction = () => {
    const data = {
      title: "New Chat",
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
      url: "/chats",
      data,
      name: "createChatWithAI",
    };
    dispatch(commonFunctionForAPICalls(payload));
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
          ...updatedMessages,
          {
            role: "ai",
            message: aiMessageContent,
            uuid: latestAiMessageData?.uuid || null,
            is_saved_to_notes: latestAiMessageData?.is_saved_to_notes || false,
          },
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

        <TextInput
          value={globalDataStates.userMessagePrompt}
          onChangeText={(text) => dispatch(setUserMessagePrompt(text))}
          placeholder="Ask anything"
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
          editable={!isWaitingForResponse}
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
            <TouchableOpacity
              onPress={() =>
                dispatch(setToggleUnlockPersonalisationLimitPopup(true))
              }
            >
              <MicIcon />
            </TouchableOpacity>
            {(globalDataStates.userMessagePrompt !== "" ||
              globalDataStates.selectedFiles.length > 0) && (
              <TouchableOpacity
                onPress={() => {
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
