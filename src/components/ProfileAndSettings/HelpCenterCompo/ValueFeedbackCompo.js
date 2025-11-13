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
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "@react-native-community/blur";
import { scaleFont } from "../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import ToolsContainers from "../../ChatScreen/ChatInputCompos/ToolsContainers";
import { feedbackOptions } from "../../../data/datas";

const screenHeight = Dimensions.get("window").height
const ValueFeedbackCompo = ({ popupState, setPopupState }) => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedStyle, setSelectedStyle] = useState(null);

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
                      style={[styles.card]}
                      onPress={() => setSelectedStyle(optionIndex)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.contentMain}>
                        <View style={styles.iconContainer}>{options.icon}</View>
                        <View style={styles.textContainer}>
                          <Text
                            style={[
                              styles.optionTitle,
                              { fontSize: scaleFont(16), fontWeight: 600 },
                            ]}
                          >
                            {options.title}
                          </Text>
                          <Text
                            style={[
                              styles.optionDescription,
                              {
                                fontSize: scaleFont(12),
                                fontWeight: 400,
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
                      <View style={[styles.inputLarge,{marginBottom:optionIndex == 2?20:0}]}>
                        <TextInput
                          style={styles.inputText}
                          placeholder="Share your dream career, ambitions, 
                          or anything else you'd like us to know about you..."
                          placeholderTextColor="#9CA3AF"
                          returnKeyType="done"
                        />
                      </View>
                    )}
                  </React.Fragment>
                );
              })}
            </ScrollView>
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
  mainOptionsContainer: {
    width: "100%",
    paddingVertical: 20,
    flexDirection: "column",
    maxHeight:screenHeight*0.5
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
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(11),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 20,
    borderRadius: 18,
    backgroundColor: "white",
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
    fontSize: scaleFont(10),
    color: "#1F2937",
    letterSpacing: 0.2,
  },
});

export default ValueFeedbackCompo;
