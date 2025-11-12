import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { scaleFont, verticalScale } from "../../../../../utils/responsive";
import { ArrowLeft } from "lucide-react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import {
  setToggleToolsPopupStates,
  setToggleTopicsPopup,
} from "../../../../../redux/slices/toggleSlice";
import { responseStyles } from "../../../../../data/datas";
import chakraLogo from "../../../../../assets/images/chakraFull.png";
const screenHeight = Dimensions.get("window").height;

const ResponseStyleState = () => {
  const dispatch = useDispatch();
  const [selectedStyle, setSelectedStyle] = useState(0);

  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <View style={styles.modalSheet}>
      {/* Content */}
      <View style={styles.content}>
        <View style={styles.closeModalMain}>
          <ArrowLeft
            onPress={() => dispatch(setToggleToolsPopupStates(0))}
            size={30}
            strokeWidth={2}
          />
          <AntDesign
            onPress={() => dispatch(setToggleTopicsPopup(false))}
            name="close"
            size={24}
            color="black"
          />
        </View>
        {/* Title */}
        <Text style={styles.title}>Response Style</Text>

        {/* Description */}
        <Text style={styles.description}>
          Set the tone of your AI companion - whether you need a mentor,
          explainer, or study buddy.
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.optionsContainer}
        >
          <View style={{ flexDirection: "column", gap: 25 }}>
            {responseStyles.map((styleOptions, optionsIndex) => {
              return (
                <React.Fragment key={optionsIndex}>
                  <TouchableOpacity  
                    style={[
                      styles.card,
                      {
                        backgroundColor:
                          selectedStyle == styleOptions.id
                            ? "#EEF4FF"
                            : "white",
                        borderColor:
                          selectedStyle == styleOptions.id
                            ? "black"
                            : "#D3DAE5",
                      },
                    ]}
                    onPress={() => setSelectedStyle(styleOptions.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.contentMain}>
                      <View style={styles.iconContainer}>
                        {styleOptions.icon}
                      </View>

                      <View style={styles.textContainer}>
                        <Text
                          style={[
                            styles.optionTitle,
                            { fontSize: scaleFont(16), fontWeight: 600 },
                          ]}
                        >
                          {styleOptions.title}
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
                          {styleOptions.description}
                        </Text>
                      </View>
                    </View>

                    <RadioButton selected={selectedStyle === styleOptions.id} />
                  </TouchableOpacity>
                  {styleOptions.id == 0 && (
                    <View style={{ width: "100%" }}>
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#757575",
                          fontSize: scaleFont(14),
                        }}
                      >
                        Or Select Manually
                      </Text>
                    </View>
                  )}
                </React.Fragment>
              );
            })}
          </View>
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
    maxHeight: screenHeight * 0.8,
  },
  iconContainer: {
    marginTop: 5,
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
  optionsContainer: {
    maxHeight: screenHeight * 0.55,
    flexDirection: "column",
  },
  card: {
    borderWidth: 1,
    borderColor: "#D3DAE5",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
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
});

export default ResponseStyleState;
