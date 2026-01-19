import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toolsArrayOptions,
  LLMOptionsAvailable,
  responseStyles,
  setLanguages,
  citationStyles,
} from "../../data/datas";
import { ChevronRight } from "lucide-react-native";
import { moderateScale } from "../../utils/responsive";
import {
  setToggleToolsPopup,
  setToggleToolsPopupStates,
} from "../../redux/slices/toggleSlice";

const ToolsComponentCard = () => {
  const dispatch = useDispatch();
  const { roomsStates } = useSelector((state) => state.API);

  const getToolSelection = (tool, index) => {
    const { currentRoom } = roomsStates;

    if (!currentRoom) return tool.selection;

    switch (index) {
      case 0: // LLM
        if (currentRoom.llm_id) {
          const llm = LLMOptionsAvailable.find(
            (item) => item.id == currentRoom.llm_id,
          );
          return llm ? llm.title : tool.selection;
        } else if (currentRoom.llm?.id) {
          const llm = LLMOptionsAvailable.find(
            (item) => item.id == currentRoom.llm.id,
          );
          return llm ? llm.title : tool.selection;
        }
        break;
      case 1: // Response Style
        if (
          currentRoom.response_style_id !== null &&
          currentRoom.response_style_id !== undefined
        ) {
          // Backend 1-based, Local 0-based
          const style = responseStyles.find(
            (item) => item.id == currentRoom.response_style_id - 1,
          );
          return style ? style.title : tool.selection;
        } else if (currentRoom.response_style?.id) {
          const style = responseStyles.find(
            (item) => item.id == currentRoom.response_style.id - 1,
          );
          return style ? style.title : tool.selection;
        }
        break;
      case 2: // Response Language
        if (
          currentRoom.response_language_id !== null &&
          currentRoom.response_language_id !== undefined
        ) {
          const lang = setLanguages.find(
            (item) => item.id == currentRoom.response_language_id - 1,
          );
          return lang ? lang.lang?.split("—")[0].trim() : tool.selection;
        } else if (currentRoom.response_language?.id) {
          const lang = setLanguages.find(
            (item) => item.id == currentRoom.response_language.id - 1,
          );
          return lang ? lang.lang?.split("—")[0].trim() : tool.selection;
        }
        break;
      case 3: // Citation Format
        if (
          currentRoom.citation_format_id !== null &&
          currentRoom.citation_format_id !== undefined
        ) {
          const citation = citationStyles.find(
            (item) => item.id == currentRoom.citation_format_id - 1,
          );
          return citation ? citation.style : tool.selection;
        } else if (currentRoom.citation_format?.id) {
          const citation = citationStyles.find(
            (item) => item.id == currentRoom.citation_format.id - 1,
          );
          return citation ? citation.style : tool.selection;
        }
        break;
    }
    return tool.selection;
  };

  return (
    <View>
      {toolsArrayOptions?.map((tools, toolIndex) => {
        return (
          <TouchableOpacity
            key={toolIndex}
            onPress={() => {
              dispatch(setToggleToolsPopupStates(toolIndex + 1));
              dispatch(setToggleToolsPopup(true));
            }}
            style={styles.optionsMain}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 15,
              }}
            >
              {tools.icon}

              <Text style={{ fontSize: moderateScale(14) }}>
                {tools.title}{" "}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 15,
              }}
            >
              <View style={styles.selectedOption}>
                <Text style={{ fontSize: moderateScale(11) }}>
                  {getToolSelection(tools, toolIndex)}{" "}
                </Text>
              </View>
              <ChevronRight size={30} strokeWidth={1.5} />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainOptionsContainer: {
    width: "100%",
    paddingVertical: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  optionsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  selectedOption: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
});

export default ToolsComponentCard;
