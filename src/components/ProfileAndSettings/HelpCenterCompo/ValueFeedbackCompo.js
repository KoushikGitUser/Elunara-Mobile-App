import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Platform,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BlurView } from "@react-native-community/blur";
import { scaleFont } from "../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import ToolsContainers from "../../ChatScreen/ChatInputCompos/ToolsContainers";
import { feedbackOptions } from "../../../data/datas";
import { triggerToast } from "../../../services/toast";

const screenHeight = Dimensions.get("window").height;
const ValueFeedbackCompo = ({ popupState, setPopupState }) => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height); // <-- set height
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <Modal
      visible={popupState}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setPopupState(false)}
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
          onPress={() => setPopupState(false)}
        />

        {/* Modal Sheet */}
        <View style={styles.modalSheet}>
          {/* Content */}
          <View style={styles.content}>
            <View style={styles.closeModalMain}>
              <AntDesign
                onPress={() => setPopupState(false)}
                name="close"
                size={24}
                color="black"
              />
            </View>
            {/* Title */}
            <Text style={styles.title}>We Value Your Feedback</Text>

            {/* Description */}
            <Text style={styles.description}>
              Your thoughts help us make Vedlynk better! Please select one of
              the options below:
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: "space-between",
                alignItems: "center",
                gap: 15,
              }}
              style={styles.mainOptionsContainer}
            >
              {feedbackOptions?.map((options, optionIndex) => {
                return (
                  <React.Fragment key={optionIndex}>
                    <TouchableOpacity
                      style={[styles.card,]}
                      onPress={() => setSelectedStyle(optionIndex)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.contentMain}>
                        <View style={styles.iconContainer}>{options.icon}</View>
                        <View style={styles.textContainer}>
                          <Text
                            style={[
                              styles.optionTitle,
                              {
                                fontSize: scaleFont(16),
                                fontWeight: 600,
                                fontFamily: "Mukta-Bold",
                              },
                            ]}
                          >
                            {options.title}
                          </Text>
                          <Text
                            style={[
                              styles.optionDescription,
                              {
                                fontSize: scaleFont(14),
                                fontWeight: 400,
                                fontFamily: "Mukta-Regular",
                                color: "#8F8F8F",
                              },
                            ]}
                          >
                            {options.desc}
                          </Text>
                        </View>
                      </View>

                      <RadioButton selected={selectedStyle === optionIndex} />
                    </TouchableOpacity>
                    {selectedStyle == optionIndex && (
                      <View
                        style={[
                          styles.inputLarge,
                          { marginBottom: optionIndex == 2 ? 20 : 0 },
                        ]}
                      >
                        <TextInput
                          style={styles.inputText}
                          placeholder="Share your dream career, ambitions, 
                          or anything else you'd like us to know about you..."
                          placeholderTextColor="#9CA3AF"
                          returnKeyType="done"
                        />
                      </View>
                      
                    )}
                    {optionIndex == 2 && <View style={{height:20}} />}
                  </React.Fragment>
                );
              })}
              {keyboardVisible && <View style={{ height: screenHeight }} />}
            </ScrollView>
            <View style={styles.btnsMain}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  triggerToast("Submitted","Your Feedback submitted successfully","success",3000)
                  setPopupState(false)
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Send Feedback</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    backgroundColor: "#FAFAFA",
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
    fontSize: scaleFont(23),
    fontFamily: "Mukta-Bold",
    color: "#1F2937",
    marginBottom: 10,
  },
  description: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    lineHeight: 24,
    color: "#6B7280",
  },
  mainOptionsContainer: {
    width: "100%",
    paddingVertical: 20,
    paddingBottom:50,
    flexDirection: "column",
    maxHeight: screenHeight * 0.5,
  },
  optionsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
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
    btnsMain: {
    paddingTop:20
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontWeight: "500",
    fontFamily: "Mukta-Bold",
    letterSpacing: 0.3,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: "#FAFAFA",
  },
  contentMain: {
    flexDirection: "row",
    gap: 10,
    width: "85%",
    alignItems: "flex-start",
  },
  textContainer: {
    flexDirection: "column",
    gap: 5,
  },
  radioOuter: {
    width: 23,
    height: 23,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#D3DAE5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  radioInner: {
    width: "80%",
    height: "80%",
    borderRadius: 50,
    backgroundColor: "#000000ff",
  },
  inputLarge: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#1F2937",
    letterSpacing: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    height: 130,
  },
  inputText: {
    backgroundColor: "#FFFFFF",
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    color: "#1F2937",
  },
});

export default ValueFeedbackCompo;
