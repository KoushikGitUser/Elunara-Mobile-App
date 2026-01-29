import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { ArrowLeft, ArrowRightLeft, ChevronRight } from "lucide-react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import {
  setToggleToolsPopup,
  setToggleToolsPopupStates,
} from "../../../../../redux/slices/toggleSlice";
import {
  moderateScale,
  scaleFont,
  verticalScale,
} from "../../../../../utils/responsive";
import { savedLLMOptions } from "../../../../../data/datas";

const screenHeight = Dimensions.get("window").height;

const LLMSavedState = ({ setToggleIntegrateAi }) => {
  const [selectedStyle, setSelectedStyle] = useState(0);

  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );
  const dispatch = useDispatch();

  return (
    <View style={styles.content}>
      <View style={styles.closeModalMain}>
        <ArrowLeft
          onPress={() => dispatch(setToggleToolsPopupStates(0))}
          size={30}
          strokeWidth={2}
        />
        <AntDesign
          onPress={() => dispatch(setToggleToolsPopup(false))}
          name="close"
          size={24}
          color="black"
        />
      </View>
      {/* Title */}
      <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>
        Choose LLM
      </Text>

      {/* Description */}
      <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
        Select the AI model for your responses - choose based on speed or depth.
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ maxHeight: screenHeight * 0.55 }}
      >
        <View style={styles.optionsMain}>
          {savedLLMOptions?.map((option, optionsIndex) => {
            return (
              <React.Fragment key={optionsIndex}>
                <TouchableOpacity
                  style={[
                    styles.card,
                    {
                      backgroundColor:
                        selectedStyle == optionsIndex ? "#EEF4FF" : "white",
                      borderColor:
                        selectedStyle == optionsIndex ? "black" : "#D3DAE5",
                    },
                  ]}
                  onPress={() => setSelectedStyle(optionsIndex)}
                  activeOpacity={0.7}
                >
                  <View style={styles.contentMain}>
                    <View style={styles.iconContainer}>
                      <Image
                        source={option.icon}
                        style={{ height: 23, width: 23 }}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text
                        style={[
                          styles.optionTitle,
                          {
                            fontSize: scaleFont(18),
                            fontWeight: 600,
                            fontFamily: "Mukta-Bold",
                          },
                        ]}
                      >
                        {option.title}
                      </Text>
                      <Text
                        style={[
                          styles.optionDescription,
                          {
                            fontSize: scaleFont(14),
                            fontWeight: 400,
                            color: "#8F8F8F",
                            fontFamily: "Mukta-Regular",
                          },
                        ]}
                      >
                        {option.desc}
                      </Text>
                      {optionsIndex !== 0 && (
                        <View style={styles.buttonContainer}>
                          <Text
                            style={{
                              fontSize: scaleFont(12.5),
                              fontWeight: 400,
                              color: "#8F8F8F",
                              fontFamily: "Mukta-Regular",
                            }}
                          >
                            {option.buttonText}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <RadioButton selected={selectedStyle === optionsIndex} />
                </TouchableOpacity>
                {optionsIndex == 0 && (
                  <View style={{ width: "100%" }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#757575",
                        fontSize: scaleFont(15),
                        fontFamily: "Mukta-Regular",
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

        {/* <TouchableOpacity
          onPress={() => setToggleIntegrateAi(true)}
          style={[
            styles.card,
            {
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 15,
              marginTop: 25,
              marginBottom: 25,
              backgroundColor: "#F3F3F3",
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 15,
              }}
            >
              <ArrowRightLeft strokeWidth={1.25} />
              <Text
                style={{
                  fontSize: moderateScale(15),
                  fontWeight: 600,
                  fontFamily: "Mukta-Bold",
                }}
              >
                Integrate Your AI account
              </Text>
            </View>
            <ChevronRight size={30} strokeWidth={1.25} />
          </View>
          <Text
            style={{
              fontSize: scaleFont(13),
              color: "#757575",
              fontFamily: "Mukta-Regular",
            }}
          >
            Link your account to tailor responses and enjoy the benefits of your
            subscription.
          </Text>
        </TouchableOpacity> */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(13),
              fontWeight: 400,
              textAlign: "center",
              fontFamily: "Mukta-Regular",
            }}
          >
            More LLMS? Update your list in{" "}
          </Text>
          <Pressable
            style={{ borderBottomWidth: 2 }}
            onPress={() => {
              dispatch(setToggleToolsPopup(false));
              navigation.navigate("settingsInnerPages", { page: 0 });
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(13),
                lineHeight: 15,
                fontWeight: "600",
                textAlign: "center",
                fontFamily: "Mukta-Bold",
              }}
            >
              Settings
            </Text>
          </Pressable>
        </View>
      </ScrollView>
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
    marginTop: 5,
  },
  closeModalMain: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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
  optionsMain: {
    flexDirection: "column",
    gap: 25,
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "#F3F3F3",
    width: "auto",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
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
    alignItems: "flex-start",
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

export default LLMSavedState;
