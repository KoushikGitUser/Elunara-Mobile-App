import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { ArrowUpRight, File } from "lucide-react-native";
import { scaleFont } from "../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { setChatInputContentLinesNumber, setChatMessagesArray, setSelecetdFiles, setUserMessagePrompt } from "../../../redux/slices/globalDataSlice";
import { setToggleIsChattingWithAI, setToggleIsWaitingForResponse, setToggleSubTopics, setToggleTopicsPopup } from "../../../redux/slices/toggleSlice";

const SubTopicsCard = ({ item }) => {
  const dispatch = useDispatch();
  const {globalDataStates} = useSelector((state) => state.Global);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        dispatch(
          setChatMessagesArray([
            ...globalDataStates.chatMessagesArray,
            {
              role: "user",
              message: item.title,
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
        dispatch(setToggleTopicsPopup(false))
      }}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.leftContent}>
          <File size={22} strokeWidth={1.5} color="#888888" />
          <Text style={styles.cardTitle}>{item.title}</Text>
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
    marginBottom: 20,
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
    fontSize: scaleFont(12),
    fontWeight: "500",
    color: "#1A1A1A",
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
});

export default SubTopicsCard;
