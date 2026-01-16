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
import { useFonts } from "expo-font";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";

const SubTopicsCard = ({ item }) => {
  const dispatch = useDispatch();
  const { globalDataStates } = useSelector((state) => state.Global);

  const createChatWithAIFunction = () => {
    Alert.alert("SubTopicsCard", "Creating chat with subject_id: " + globalDataStates.selectedSubjectID + ", topic_id: " + item?.id);
    const data = {
      title:item.name,
      subject_id:globalDataStates.selectedSubjectID,
      topic_id:item?.id,
    }
    const payload = {
      method: "POST",
      url: "/chats",
      data,
      name: "createChatWithAI",
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        Alert.alert("Click", "SubTopicsCard clicked!");
        createChatWithAIFunction();
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
        dispatch(setUserMessagePrompt(""));
        dispatch(setSelecetdFiles([]));
        dispatch(setChatInputContentLinesNumber(1));
        dispatch(setToggleIsChattingWithAI(true));
        dispatch(setToggleIsWaitingForResponse(true));
        dispatch(setToggleTopicsPopup(false));
      }}
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
