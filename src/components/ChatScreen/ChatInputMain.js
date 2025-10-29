import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  Platform,
  ScrollView,
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
  setToggleKeyboardVisibilityOnChatScreen,
  setToggleToolsPopup,
  setToggleTopicsPopup,
} from "../../redux/slices/toggleSlice";
import AddItemsToInputPopup from "../Modals/ChatScreen/AddItemsToInputPopup";
import topicsIcon from "../../assets/images/TopicsIcon.png";
import toolsIcon from "../../assets/images/toolsIcon.png";
import clipIcon from "../../assets/images/clip.png";
import mic from "../../assets/images/mic.png";
import send from "../../assets/images/sendIcon.png";
import { setUserMessagePrompt } from "../../redux/slices/globalDataSlice";
import ImageFile from "./ChatInputCompos/SelectedFilesCompo/ImageFile";

const ChatInputMain = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

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

  return (
    <View
      style={[
        styles.chatInputMainWrapper,
        {
          marginBottom: keyboardHeight,
          paddingTop: globalDataStates.selectedFiles.length > 0 ? 0 : 15,
        },
      ]}
    >
      <View style={styles.chatInputMain}>
        {globalDataStates.selectedFiles?.length > 0 && (
          <ScrollView
            horizontal
            style={{width:"100%"}}
          >
            <View style={[styles.filesContainerMain,{
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 25,
            }]}>
              {globalDataStates.selectedFiles?.map((files, fileIndex) => {
                return <ImageFile key={fileIndex} file={files} />;
              })}
            </View>
          </ScrollView>
        )}

        <TextInput
          value={globalDataStates.userMessagePrompt}
          onChangeText={(text) => dispatch(setUserMessagePrompt(text))}
          placeholder="Ask anything"
          placeholderTextColor="grey"
          style={styles.textInput}
        />
        <View style={styles.inputActionIconsMainWrapper}>
          <View style={styles.inputLeftActionIcons}>
            <View
              style={[
                styles.parentContainer,
                {
                  backgroundColor: toggleStates.toggleAddItemsToInputPopup
                    ? "#EEF4FF"
                    : "transparent",
                  padding: 4,
                  borderRadius: 8,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => dispatch(setToggleAddItemsToInputPopup(true))}
              >
                <Image
                  source={clipIcon}
                  style={{ height: 27, width: 27, objectFit: "contain" }}
                />
              </TouchableOpacity>
              {toggleStates.toggleAddItemsToInputPopup && (
                <AddItemsToInputPopup />
              )}
            </View>

            <TouchableOpacity
              onPress={() => dispatch(setToggleTopicsPopup(true))}
            >
              <Image
                source={topicsIcon}
                style={{ height: 27, width: 27, objectFit: "contain" }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => dispatch(setToggleToolsPopup(true))}
            >
              <Image
                source={toolsIcon}
                style={{ height: 27, width: 27, objectFit: "contain" }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputRightActionIcons}>
            <TouchableOpacity
              onPress={() => dispatch(setToggleToolsPopup(true))}
            >
              <Image
                source={mic}
                style={{ height: 27, width: 27, objectFit: "contain" }}
              />
            </TouchableOpacity>
            {globalDataStates.userMessagePrompt !== "" && (
              <TouchableOpacity
                onPress={() => dispatch(setToggleIsChattingWithAI(true))}
              >
                <Image
                  source={send}
                  style={{ height: 41, width: 41, objectFit: "contain" }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatInputMain;
