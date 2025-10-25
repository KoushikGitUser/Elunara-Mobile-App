import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { ChevronRight, CircleUserRound, GitFork, GraduationCap, Languages } from "lucide-react-native";
import { moderateScale } from "../../../utils/responsive";
import { useDispatch } from "react-redux";
import { setToggleToolsPopupStates } from "../../../redux/slices/toggleSlice";

const ToolsContainers = () => {
    const dispatch = useDispatch();
  return (
    <View>
      <TouchableOpacity onPress={()=>dispatch(setToggleToolsPopupStates(1))} style={styles.optionsMain}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 15,
          }}
        >
          <GitFork color="#888888" strokeWidth={1.25} />
          <Text style={{fontSize:moderateScale(14)}}>LLM</Text>
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
            <Text style={{fontSize:moderateScale(11)}}>Auto</Text>
          </View>
          <ChevronRight size={30} strokeWidth={1.5} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>dispatch(setToggleToolsPopupStates(2))} style={styles.optionsMain}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 15,
          }}
        >
          <CircleUserRound color="#888888" strokeWidth={1.25} />
          <Text style={{fontSize:moderateScale(14)}}>Response Style</Text>
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
            <Text style={{fontSize:moderateScale(11)}}>Auto</Text>
          </View>
          <ChevronRight size={30} strokeWidth={1.5} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>dispatch(setToggleToolsPopupStates(3))} style={styles.optionsMain}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 15,
          }}
        >
          <Languages color="#888888" strokeWidth={1.25} />
          <Text style={{fontSize:moderateScale(14)}}>Response Language</Text>
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
            <Text style={{fontSize:moderateScale(11)}}>English</Text>
          </View>
          <ChevronRight size={30} strokeWidth={1.5} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>dispatch(setToggleToolsPopupStates(4))} style={styles.optionsMain}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 15,
          }}
        >
          <GraduationCap color="#888888" strokeWidth={1.25} />
          <Text style={{fontSize:moderateScale(14)}}>Citation Format</Text>
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
            <Text style={{fontSize:moderateScale(11)}}>Havard</Text>
          </View>
          <ChevronRight size={30} strokeWidth={1.5} />
        </View>
      </TouchableOpacity>
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
    paddingVertical:15
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
