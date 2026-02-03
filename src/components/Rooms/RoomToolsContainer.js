import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { ChevronRight } from "lucide-react-native";
import { moderateScale } from "../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleRoomToolsPopup,
  setToggleRoomToolsPopupStates,
} from "../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";
import LLMIcon from "../../../assets/SvgIconsComponent/ToolsOptionsIcons/LLMIcon";
import ResStyleIcon from "../../../assets/SvgIconsComponent/ToolsOptionsIcons/ResStyleIcon";
import ResLangIcon from "../../../assets/SvgIconsComponent/ToolsOptionsIcons/ResLangIcon";
import CitationIcon from "../../../assets/SvgIconsComponent/ToolsOptionsIcons/CitationIcon";

const roomToolsArrayOptions = [
  {
    icon: <LLMIcon color="#888888" />,
    title: "LLM",
    selection: "Auto",
  },
  {
    icon: <ResStyleIcon color="#888888" />,
    title: "Response Style",
    selection: "Auto",
  },
  {
    icon: <ResLangIcon color="#888888" />,
    title: "Response Language",
    selection: "English",
  },
  {
    icon: <CitationIcon color="#888888" />,
    title: "Citation Format",
    selection: "Harvard",
  },
];

const RoomToolsContainer = () => {
  const dispatch = useDispatch();
  const { roomCustomisationStates } = useSelector((state) => state.Toggle);

  useEffect(() => {
    // Fetch response styles
    const responseStylesPayload = {
      method: "GET",
      url: "/master/response-styles",
      name: "fetchResponseStylesAvailable",
    };
    dispatch(commonFunctionForAPICalls(responseStylesPayload));

    // Fetch citation formats
    const citationFormatsPayload = {
      method: "GET",
      url: "/master/citation-formats",
      name: "fetchCitationFormatsAvailable",
    };
    dispatch(commonFunctionForAPICalls(citationFormatsPayload));
  }, []);

  // Get the selected value based on tool index
  const getSelectedValue = (toolIndex) => {
    switch (toolIndex) {
      case 0: // LLM Preference
        return roomCustomisationStates?.selectedRoomLLM?.name || "Auto";
      case 1: // Response Style
        return roomCustomisationStates?.selectedRoomResponseStyle?.name || "Auto";
      case 2: // Response Language
        return roomCustomisationStates?.selectedRoomLanguage?.name || "English";
      case 3: // Citation Format
        return roomCustomisationStates?.selectedRoomCitationFormat?.name || "Harvard";
      default:
        return "";
    }
  };

  return (
    <View>
      {roomToolsArrayOptions?.map((tools, toolIndex) => {
        return (
          <TouchableOpacity
            key={toolIndex}
            onPress={() => {
              dispatch(setToggleRoomToolsPopupStates(toolIndex + 1));
              dispatch(setToggleRoomToolsPopup(true));
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
              <Text style={{ fontSize: moderateScale(16), fontFamily: "Mukta-Regular" }}>
                {tools.title}
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
                <Text style={{ fontSize: moderateScale(12), fontFamily: "Mukta-Regular" }}>
                  {getSelectedValue(toolIndex)}
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

export default RoomToolsContainer;
