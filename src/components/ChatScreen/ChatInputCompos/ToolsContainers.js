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
import { useDispatch } from "react-redux";
import {
  setToggleToolsPopup,
  setToggleToolsPopupStates,
} from "../../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";
import { toolsArrayOptions } from "../../../data/datas";

const ToolsContainers = () => {
  const dispatch = useDispatch();

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

              <Text style={{ fontSize: moderateScale(16),fontFamily:"Mukta-Regular" }}>
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
                <Text style={{ fontSize: moderateScale(12),fontFamily:"Mukta-Regular" }}>
                  {tools.selection}{" "}
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
