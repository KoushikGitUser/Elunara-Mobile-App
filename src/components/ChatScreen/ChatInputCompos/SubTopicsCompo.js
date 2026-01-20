import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { subTopics } from "../../../data/datas";
import { scaleFont } from "../../../utils/responsive";
import SubTopicsCard from "./SubTopicsCard";
import { ArrowLeft, Mic, Search } from "lucide-react-native";
import {
  setToggleSubTopics,
  setToggleTopicsPopup,
  setToggleIsChattingWithAI,
  setToggleIsWaitingForResponse,
} from "../../../redux/slices/toggleSlice";
import {
  setChatMessagesArray,
  setUserMessagePrompt,
  setSelecetdFiles,
  setChatInputContentLinesNumber,
} from "../../../redux/slices/globalDataSlice";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";
import SendIcon from "../../../../assets/SvgIconsComponent/ChatInputIcons/SendIcon";
import { useFonts } from "expo-font";
import authLoader from "../../../assets/images/authLoader.gif";
const screenHeight = Dimensions.get("window").height;
const SubTopicsCompo = () => {
  const { toggleStates, chatCustomisationStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);
  const { chatsStates } = useSelector((state) => state.API);
  const isTopicsLoading = chatsStates.loaderStates.isTopicsOfSelectedSubjectsFetched === "pending";
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [belowSearchText, setBelowSearchText] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [expandTextInput, setExpandTextInput] = useState(false);
  const [filteredTopics, setFilteredTopics] = useState([]);

  // Filter topics based on search text
  useEffect(() => {
    const allTopics = chatsStates.allChatsDatas.allTopicsOfSelectedSubjects || [];
    if (searchText.trim() === "") {
      setFilteredTopics(allTopics);
    } else {
      const filtered = allTopics.filter((topic) =>
        topic.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredTopics(filtered);
    }
  }, [searchText, chatsStates.allChatsDatas.allTopicsOfSelectedSubjects]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const sendMessageDirectly = () => {
    const chatUuid = chatsStates.allChatsDatas.createdChatDetails?.id;
    if (!chatUuid) {
      return;
    }

    const payload = {
      method: "POST",
      url: `/chats/${chatUuid}/messages`,
      data: {
        content: belowSearchText,
        content_type: "text",
        attachment_ids: [],
      },
      name: "sendPromptAndGetMessageFromAI",
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  const createChatWithAIFunction = () => {
    const data = {
      title: belowSearchText,
      subject_id: globalDataStates.selectedSubjectID,
      topic_id: globalDataStates.selectedTopicsID,
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

  const handleSendButton = () => {
    if (belowSearchText.trim() === "") {
      return;
    }

    // Add user message to chat array
    dispatch(
      setChatMessagesArray([
        ...globalDataStates.chatMessagesArray,
        {
          role: "user",
          message: belowSearchText,
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

    // Common cleanup and state updates
    setBelowSearchText("");
    dispatch(setUserMessagePrompt(""));
    dispatch(setSelecetdFiles([]));
    dispatch(setChatInputContentLinesNumber(1));
    dispatch(setToggleIsWaitingForResponse(true));
    dispatch(setToggleTopicsPopup(false));
  };

  return (
    <View style={styles.content}>
      <View style={styles.closeModalMain}>
        <ArrowLeft
          onPress={() => dispatch(setToggleSubTopics(false))}
          size={30}
          strokeWidth={2}
        />
        <AntDesign
          onPress={() => dispatch(setToggleTopicsPopup(false))}
          name="close"
          size={24}
          color="black"
        />
      </View>
      {/* Title */}
      <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>
        {globalDataStates.currentSelectedTopic}{" "}
      </Text>
      {/* Description */}
      <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
        Popular Topics
      </Text>
      <View style={styles.input}>
        <Search color="#B5BECE" strokeWidth={1.5} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#B5BECE"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
          }}
          keyboardType="text"
          returnKeyType="done"
          style={{ fontFamily: "Mukta-Regular", fontSize: 17 }}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.optionsContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {isTopicsLoading ? (
          <View style={styles.loaderContainer}>
            <Image source={authLoader} style={styles.loader} />
          </View>
        ) : (
          <View style={styles.grid}>
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topics, topicIndex) => {
                return <SubTopicsCard key={topicIndex} item={topics} />;
              })
            ) : (
              <View style={styles.noResultsContainer}>
                <Text style={[styles.noResultsText, { fontFamily: "Mukta-Regular" }]}>
                  No topics found matching "{searchText}"
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={[styles.keyboardAvoidingView, { bottom: keyboardHeight }]}
      >
        <View style={styles.container}>
          <View style={styles.contents}>
            <View
              style={[
                styles.inputContainer,
                {
                  height: expandTextInput ? 110 : "50",
                  flexDirection: expandTextInput ? "column" : "row",
                  paddingTop: expandTextInput ? 0 : 10,
                  paddingBottom: 10,
                },
              ]}
            >
              <TextInput
                style={[
                  styles.belowInput,
                  {
                    alignSelf: expandTextInput ? "flex-start" : "center",
                    fontFamily: "Mukta-Regular",
                  },
                ]}
                onFocus={() => setExpandTextInput(true)}
                onBlur={() => setExpandTextInput(false)}
                placeholder="Can't find a topic? Just type it,I've got you"
                placeholderTextColor="#B5BECE"
                value={belowSearchText}
                onChangeText={setBelowSearchText}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: expandTextInput ? "flex-end" : "center",
                  gap: 0,
                  alignSelf: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.micButton,
                    { alignSelf: expandTextInput ? "flex-end" : "center" },
                  ]}
                  activeOpacity={0.7}
                >
                  <Mic size={25} color="#1A1A1A" strokeWidth={1.5} />
                </TouchableOpacity>
                {belowSearchText !== "" && (
                  <TouchableOpacity
                    style={[
                      styles.micButton,
                      { alignSelf: expandTextInput ? "flex-end" : "center" },
                    ]}
                    activeOpacity={0.7}
                    onPress={handleSendButton}
                  >
                    <SendIcon />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#ABB8CC",
    borderRadius: 15,
    paddingHorizontal: 16,
    fontSize: scaleFont(10),
    color: "#1F2937",
    letterSpacing: 0.2,
    marginBottom: 30,
  },
  androidBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.18)",
  },
  optionsContainer: {
    maxHeight: screenHeight * 0.45,
    flexDirection: "column",
  },
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  verifiedIcon: {
    height: 55,
    width: 50,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  iconContainer: {
    marginBottom: 24,
  },
  closeModalMain: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: scaleFont(25),
    fontWeight: "600",
    color: "#1F2937",
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(14),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    letterSpacing: 0.2,
  },
  mainOptionsContainer: {
    width: "100%",
    paddingVertical: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  optionsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(11),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 64,
  },
  grid: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  keyboardAvoidingView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
  },
  contents: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F8F9FA",
    borderRadius: 19,
    paddingHorizontal: 16,
    paddingTop: 0,
    borderWidth: 1,
    borderColor: "#ABB8CC",
    marginBottom: 12,
    backgroundColor: "white",
  },
  belowInput: {
    flex: 1,
    fontSize: scaleFont(13),
    color: "#1A1A1A",
    paddingVertical: 0,
    backgroundColor: "white",
  },
  micButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  indicator: {
    width: 134,
    height: 5,
    backgroundColor: "#1A1A1A",
    borderRadius: 100,
    alignSelf: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  loader: {
    width: 100,
    height: 100,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  noResultsText: {
    fontSize: scaleFont(14),
    color: "#6B7280",
    textAlign: "center",
  },
});

export default SubTopicsCompo;
