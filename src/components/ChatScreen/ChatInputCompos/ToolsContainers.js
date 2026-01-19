import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import {
  ChevronRight,
  CircleUserRound,
  GitFork,
  GraduationCap,
  Languages,
} from "lucide-react-native";
import { moderateScale } from "../../../utils/responsive";
import { useSelector, useDispatch } from "react-redux";
import {
  setToggleToolsPopup,
  setToggleToolsPopupStates,
} from "../../../redux/slices/toggleSlice";
import {
  toolsArrayOptions,
  LLMOptionsAvailable,
  responseStyles,
  setLanguages,
  citationStyles,
} from "../../../data/datas";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";

const ToolsContainers = () => {
  const dispatch = useDispatch();
  const { roomsStates } = useSelector((state) => state.API);

  useEffect(() => {
    const responseStylesPayload = {
      method: "GET",
      url: "/master/response-styles",
      name: "fetchResponseStylesAvailable",
    };
    dispatch(commonFunctionForAPICalls(responseStylesPayload));

    const citationFormatsPayload = {
      method: "GET",
      url: "/master/citation-formats",
      name: "fetchCitationFormatsAvailable",
    };
    dispatch(commonFunctionForAPICalls(citationFormatsPayload));
  }, []);

  const getToolSelection = (tool, index) => {
    const { tempRoomSettings } = roomsStates;
    if (!tempRoomSettings) return tool.selection;

    switch (index) {
      case 0: // LLM
        if (tempRoomSettings.llm_id) {
          const llm = LLMOptionsAvailable.find(
            (item) => item.id == tempRoomSettings.llm_id,
          );
          return llm ? llm.title : tool.selection;
        } else if (roomsStates.currentRoom?.llm_id) {
          const llm = LLMOptionsAvailable.find(
            (item) => item.id == roomsStates.currentRoom.llm_id,
          );
          return llm ? llm.title : tool.selection;
        } else if (roomsStates.currentRoom?.llm?.id) {
          const llm = LLMOptionsAvailable.find(
            (item) => item.id == roomsStates.currentRoom.llm.id,
          );
          return llm ? llm.title : tool.selection;
        }
        break;
      case 1: // Response Style
        if (
          tempRoomSettings.response_style_id !== null &&
          tempRoomSettings.response_style_id !== undefined
        ) {
          const style = responseStyles.find(
            (item) => item.id == tempRoomSettings.response_style_id - 1,
          );
          return style ? style.title : tool.selection;
        } else if (roomsStates.currentRoom?.response_style_id) {
          const style = responseStyles.find(
            (item) => item.id == roomsStates.currentRoom.response_style_id - 1,
          );
          return style ? style.title : tool.selection;
        } else if (roomsStates.currentRoom?.response_style?.id) {
          const style = responseStyles.find(
            (item) => item.id == roomsStates.currentRoom.response_style.id - 1,
          );
          return style ? style.title : tool.selection;
        }
        break;
      case 2: // Response Language
        if (
          tempRoomSettings.response_language_id !== null &&
          tempRoomSettings.response_language_id !== undefined
        ) {
          const lang = setLanguages.find(
            (item) => item.id == tempRoomSettings.response_language_id - 1,
          );
          return lang ? lang.lang?.split("—")[0].trim() : tool.selection;
        } else if (roomsStates.currentRoom?.response_language_id) {
          const lang = setLanguages.find(
            (item) =>
              item.id == roomsStates.currentRoom.response_language_id - 1,
          );
          return lang ? lang.lang?.split("—")[0].trim() : tool.selection;
        } else if (roomsStates.currentRoom?.response_language?.id) {
          const lang = setLanguages.find(
            (item) =>
              item.id == roomsStates.currentRoom.response_language.id - 1,
          );
          return lang ? lang.lang?.split("—")[0].trim() : tool.selection;
        }
        break;
      case 3: // Citation Format
        if (
          tempRoomSettings.citation_format_id !== null &&
          tempRoomSettings.citation_format_id !== undefined
        ) {
          const citation = citationStyles.find(
            (item) => item.id == tempRoomSettings.citation_format_id - 1,
          );
          return citation ? citation.style : tool.selection;
        } else if (roomsStates.currentRoom?.citation_format_id) {
          const citation = citationStyles.find(
            (item) => item.id == roomsStates.currentRoom.citation_format_id - 1,
          );
          return citation ? citation.style : tool.selection;
        } else if (roomsStates.currentRoom?.citation_format?.id) {
          const citation = citationStyles.find(
            (item) => item.id == roomsStates.currentRoom.citation_format.id - 1,
          );
          return citation ? citation.style : tool.selection;
        }
        break;
    }
    return tool.selection;
  };
  return (
    <View style={{ width: "100%" }}>
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

              <Text
                style={{
                  fontSize: moderateScale(16),
                  fontFamily: "Mukta-Regular",
                }}
              >
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
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontFamily: "Mukta-Regular",
                  }}
                >
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

export default ToolsContainers;
