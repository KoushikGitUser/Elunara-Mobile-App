import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  moderateScale,
  scaleFont,
  verticalScale,
} from "../../../../../utils/responsive";
import { ArrowLeft } from "lucide-react-native";
import DropDowns from "../DropDowns";
import { LLMOptionsAvailable } from "../../../../../data/datas";
import { useDispatch } from "react-redux";
import { setToggleToolsPopupStates } from "../../../../../redux/slices/toggleSlice";

const screenHeight = Dimensions.get("window").height;

const LLMState = () => {

    const [selectedCountsArray,setSelectedCountsArray] = useState([]);
    const dispatch = useDispatch();

  return (
    <View style={styles.modalSheet}>
      {/* Content */}
      <View style={styles.content}>
        <View style={styles.closeModalMain}>
          <ArrowLeft onPress={()=>dispatch(setToggleToolsPopupStates(0))} size={30} strokeWidth={2} />
          <AntDesign
            onPress={() => dispatch(setToggleTopicsPopup(false))}
            name="close"
            size={24}
            color="black"
          />
        </View>
        {/* Title */}
        <Text style={styles.title}>Choose LLM</Text>

        {/* Description */}
        <Text style={styles.description}>
          Receive responses in your preferred LLMs! Pick up to 3 now to easily
          toggle between them
        </Text>

        <ScrollView style={{maxHeight:screenHeight*0.6}}>
        <View style={styles.noteSection}>
          <Text style={{ fontSize: moderateScale(12), fontWeight: 400 }}>
            <Text style={{ fontSize: moderateScale(12), fontWeight: 600 }}>
              Note:
            </Text>
            {" "}After selection, you can also integrate your own LLM account for
            added flexibility
          </Text>
        </View>

        <Text
          style={{
            fontSize: moderateScale(10),
            color: "#5E5E5E",
            marginTop: 40,
          }}
        >
          LLM 1
        </Text>
        <DropDowns selectedCounts={selectedCountsArray} setSelectedCounts={setSelectedCountsArray} selectOptionsArray={LLMOptionsAvailable} />
        <Text
          style={{
            fontSize: moderateScale(10),
            color: "#5E5E5E",
            marginTop: 40,
          }}
        >
          LLM 2
        </Text>
        <DropDowns selectedCounts={selectedCountsArray} setSelectedCounts={setSelectedCountsArray} selectOptionsArray={LLMOptionsAvailable} />
        <Text
          style={{
            fontSize: moderateScale(10),
            color: "#5E5E5E",
            marginTop: 40,
          }}
        >
          LLM 3
        </Text>
        <DropDowns selectedCounts={selectedCountsArray} setSelectedCounts={setSelectedCountsArray} selectOptionsArray={LLMOptionsAvailable} />

        {/* Button */}
        <TouchableOpacity
          style={[styles.button,{backgroundColor:selectedCountsArray?.length >= 3?"#081A35":"#CDD5DC"}]}
          onPress={() => dispatch(setToggleTopicsPopup(false))}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Save LLM Preferences</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: moderateScale(11), fontWeight: 600,textDecorationLine:"underline",textAlign:"center" }}>
            <Text style={{ fontSize: moderateScale(11), fontWeight: 400,paddingRight:5,textDecorationLine:"none" }}>
              More LLMS? Update your list in {" "}
            </Text>
            Settings
          </Text>
          </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
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
  },
  title: {
    fontSize: scaleFont(23),
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(12),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    letterSpacing: 0.2,
  },
  noteSection: {
    width: "100%",
    minHeight: verticalScale(70),
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 16,
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(11),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});

export default LLMState;
