import {
  View,
  Text,
  Platform,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { scaleFont } from "../../../utils/responsive";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { ChevronRight } from "lucide-react-native";
import { guidedTourOptions } from "../../../data/datas";
import DemoPreviewScreen from "./DemoPreviewScreen";

const screenHeight = Dimensions.get("window").height;

const DemoPopup = ({ popupState, setPopupState }) => {
  const [showDemoPreview, setShowDemoPreview] = useState(false);
  const [selectedDemoType, setSelectedDemoType] = useState("navigation");

  const handleDemoOptionPress = (optionIndex) => {
    // Map option index to demo type
    const demoTypes = ["navigation", "chatFunctions", "learningLabs"];
    setSelectedDemoType(demoTypes[optionIndex]);
    setShowDemoPreview(true);
  };

  const handleCloseDemoPreview = () => {
    setShowDemoPreview(false);
  };

  return (
    <>
      <DemoPreviewScreen
        visible={showDemoPreview}
        onClose={handleCloseDemoPreview}
        demoType={selectedDemoType}
      />
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
            <Text style={styles.title}>Welcome to Elunara!</Text>

            {/* Description */}
            <Text style={styles.description}>
             Get the most out of your AI learning companion. Choose a
              walkthrough below to master navigation, harness chat tools, or
              organize work with Rooms.
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
              {guidedTourOptions?.map((options, optionIndex) => {
                return (
                  <React.Fragment key={optionIndex}>
                    <TouchableOpacity
                      style={[styles.card]}
                      onPress={() => {
                        // Show the demo preview screen for this tour type
                        handleDemoOptionPress(optionIndex);
                      }}
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

                      <ChevronRight size={30} strokeWidth={1.25} />
                    </TouchableOpacity>
                  </React.Fragment>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
    </>
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
    paddingBottom: 20,
    flexDirection: "column",
    maxHeight: screenHeight * 0.5,
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
});

export default DemoPopup;
