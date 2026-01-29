import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";
import { ArrowUpRight, File } from "lucide-react-native";
import { scaleFont } from "../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import {
  setChatInputContentLinesNumber,
  setChatMessagesArray,
  setSelecetdFiles,
  setUserMessagePrompt,
} from "../../../redux/slices/globalDataSlice";
import {
  setToggleIsChattingWithAI,
  setToggleIsWaitingForResponse,
  setToggleSubTopics,
  setToggleTopicsPopup,
} from "../../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";

const SubTopicsCard = ({ item }) => {
  const dispatch = useDispatch();
  const { globalDataStates } = useSelector((state) => state.Global);
  const { toggleStates, chatCustomisationStates } = useSelector((state) => state.Toggle);
  const { chatsStates } = useSelector((state) => state.API);

  const sendMessageDirectly = () => {
    const chatUuid = chatsStates.allChatsDatas.createdChatDetails?.id;
    if (!chatUuid) {
      return;
    }

    const data = {
      content: item.name,
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
        name: item?.name,
        subject_id: globalDataStates.selectedSubjectID,
        topic_id: item?.id,
      },
      name: "createChatWithAI",
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  const handlePress = () => {
    // Add user message to chat array
    dispatch(
      setChatMessagesArray([
        ...globalDataStates.chatMessagesArray,
        {
          role: "user",
          message: item.name,
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
    dispatch(setUserMessagePrompt(""));
    dispatch(setSelecetdFiles([]));
    dispatch(setChatInputContentLinesNumber(1));
    dispatch(setToggleIsWaitingForResponse(true));
    dispatch(setToggleTopicsPopup(false));
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.leftContent}>
          <File size={22} strokeWidth={1.5} color="#888888" />
          <Text style={[styles.cardTitle,{fontFamily:'Mukta-Regular'}]}>{item.name}</Text>
        </View>
        <ArrowUpRight strokeWidth={1.5} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 15,
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: scaleFont(14),
    fontWeight: "500",
    color: "#1A1A1A",
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
});

export default SubTopicsCard;
