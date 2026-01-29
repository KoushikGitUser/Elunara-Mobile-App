import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import React from "react";
import { BlurView } from "@react-native-community/blur";
import { scaleFont } from "../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { setToggleToolsPopup, setToggleTopicsPopup } from "../../../redux/slices/toggleSlice";
import { ChevronRight, GitFork } from "lucide-react-native";
import ToolsContainers from "./ToolsContainers";
import LLMState from "./ToolsPopupStates/LLMStates/LLMState";
import ResponseStyleState from "./ToolsPopupStates/ResponseStyleState/ResponseStyleState";
import ResponseLangState from "./ToolsPopupStates/ResponseLangState/ResponseLangState";
import CitationState from "./ToolsPopupStates/CitationState/CitationState";

const ToolsOptionsPopup = () => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Modal
      visible={toggleStates.toggleToolsPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleToolsPopup(false))}
    >
      <View style={styles.container}>
        {/* Blur Background */}

        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={7}
          reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.43)"
        />
        <View style={styles.androidBlur} />
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => dispatch(setToggleToolsPopup(false))}
        />

        {/* Modal Sheet */}
        {toggleStates.toggleToolsPopupStates == 0?<View style={styles.modalSheet}>
          {/* Content */}
          <View style={styles.content}>
            <View style={styles.closeModalMain}>
              <AntDesign
                onPress={() => dispatch(setToggleToolsPopup(false))}
                name="close"
                size={24}
                color="black"
              />
            </View>
            {/* Title */}
            <Text style={[styles.title,{fontFamily:"Mukta-Bold"}]}>Choose Tools</Text>

            {/* Description */}
            <Text style={[styles.description,{fontFamily:"Mukta-Regular"}]}>
              Customise how Elunara responds - choose your model, tone,
              language, and citations
            </Text>
            <View style={styles.mainOptionsContainer}>
            <ToolsContainers/>
            </View>
          </View>
        </View>:toggleStates.toggleToolsPopupStates == 1?<LLMState/>: toggleStates.toggleToolsPopupStates == 2?<ResponseStyleState/> :toggleStates.toggleToolsPopupStates == 3?<ResponseLangState/> :<CitationState/>}

      </View>
    </Modal>
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
  androidBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.18)",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
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
    justifyContent: "flex-end",
  },
  title: {
    fontSize: scaleFont(26),
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 10,
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
    gap: 15,
  },
  optionsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical:20
  },
  selectedOption: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 5,
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
});

export default ToolsOptionsPopup;
