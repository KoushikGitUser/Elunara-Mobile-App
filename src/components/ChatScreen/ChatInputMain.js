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
import React, { useMemo, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LibraryBig, Mic, Paperclip, Send } from "lucide-react-native";
import { createStyles } from "./ChatHistorySidebar/chatSidebarStyles.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleAddItemsToInputPopup,
  setToggleIsChattingWithAI,
  setToggleIsWaitingForResponse,
  setToggleKeyboardVisibilityOnChatScreen,
  setToggleToolsPopup,
  setToggleTopicsPopup,
  setToggleUnlockPersonalisationLimitPopup,
} from "../../redux/slices/toggleSlice";
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
} from "../../redux/slices/globalDataSlice";
import ImageFile from "./ChatInputCompos/SelectedFilesCompo/ImageFile";
import PdfFile from "./ChatInputCompos/SelectedFilesCompo/PdfFile";
import { demoResponseFromAI } from "../../data/datas";
import ClipIcon from "../../../assets/SvgIconsComponent/ChatInputIcons/ClipIcon";
import TopicsBooksIcon from "../../../assets/SvgIconsComponent/ChatInputIcons/TopicsBooksIcon";
import ToolsIcon from "../../../assets/SvgIconsComponent/ChatInputIcons/ToolsIcon";
import MicIcon from "../../../assets/SvgIconsComponent/ChatInputIcons/MicIcon";
import SendIcon from "../../../assets/SvgIconsComponent/ChatInputIcons/SendIcon";
import UnlockMaxUploadLimitPopup from "../Monetisation/UnlockMaxUploadLimitPopup";

const ChatInputMain = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const LINE_HEIGHT = 20;
  const PADDING_VERTICAL = 16; // 8 top + 8 bottom
  const MIN_HEIGHT = LINE_HEIGHT + PADDING_VERTICAL; // ~36px for 1 line
  const MAX_HEIGHT = LINE_HEIGHT * 5 + PADDING_VERTICAL; // ~76px for 3 lines
  const [inputHeight, setInputHeight] = useState(MIN_HEIGHT);

  // Initialize line count on mount
  useEffect(() => {
    dispatch(setChatInputContentLinesNumber(1));
  }, []);

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

  useEffect(() => {
    setTimeout(() => {
      if (toggleStates.toggleIsWaitingForResponse) {
        dispatch(setChatMessagesArray([...globalDataStates.chatMessagesArray, {
          role: "ai",
          message: demoResponseFromAI,
        }]));
        dispatch(setToggleIsWaitingForResponse(false));
      }
    }, 5000);
  }, [toggleStates.toggleIsWaitingForResponse]);

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
    >
      <View
        style={[
          styles.chatInputMain,
          { paddingTop: globalDataStates.selectedFiles.length > 0 ? 0 : 10 },
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
          style={[styles.textInput, { height: inputHeight,fontFamily:"Mukta-Regular",fontSize:16 }]}
          multiline
          textAlignVertical="top"
          onContentSizeChange={handleContentSizeChange}
          scrollEnabled={inputHeight >= MAX_HEIGHT}
          returnKeyType="default"
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
                <ClipIcon/>
              </TouchableOpacity>
              {toggleStates.toggleAddItemsToInputPopup && (
                <AddItemsToInputPopup />
              )}
              {toggleStates.toggleUnlockMaxUploadLimitPopup && <UnlockMaxUploadLimitPopup/>}
            </View>

            <TouchableOpacity
              onPress={() => dispatch(setToggleTopicsPopup(true))}
            >
              <TopicsBooksIcon/>
            </TouchableOpacity>

            <TouchableOpacity
            style={{marginLeft:10,}}
            // style={{marginLeft:10,borderWidth:1,padding:6,borderColor:"#BFD6FE",borderRadius:10,elevation:10,backgroundColor:"white",shadowColor:"#426eb9ff"}}
              onPress={() => dispatch(setToggleToolsPopup(true))}
            >
             <ToolsIcon/>
            </TouchableOpacity>
          </View>
          <View style={styles.inputRightActionIcons}>
            <TouchableOpacity
              onPress={()=>dispatch(setToggleUnlockPersonalisationLimitPopup(true))}
            >
             <MicIcon/>
            </TouchableOpacity>
            {(globalDataStates.userMessagePrompt !== "" ||
              globalDataStates.selectedFiles.length > 0) && (
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    setChatMessagesArray([
                      ...globalDataStates.chatMessagesArray,
                      {
                        role: "user",
                        message: globalDataStates.userMessagePrompt,
                        file:globalDataStates.selectedFiles?globalDataStates.selectedFiles[0]:null,
                      },
                    ])
                  );
                  dispatch(setUserMessagePrompt(""));
                  dispatch(setSelecetdFiles([]));
                  dispatch(setChatInputContentLinesNumber(1));
                  dispatch(setToggleIsChattingWithAI(true));
                  dispatch(setToggleIsWaitingForResponse(true));
                }}
              >
                <SendIcon/>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatInputMain;
