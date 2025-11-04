import {
  View,
  Text,
  Platform,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react-native";
import { AntDesign } from "@expo/vector-icons";
import { scaleFont, verticalScale } from "../../../../../utils/responsive";
import { useDispatch } from "react-redux";
import {
  setToggleToolsPopup,
  setToggleToolsPopupStates,
} from "../../../../../redux/slices/toggleSlice";
import { findApiKeyNotices } from "../../../../../data/datas";
import FindAPIKeyAccordian from "./FindAPIKeyAccordian";
const screenHeight = Dimensions.get("window").height;

const FindAPIKeyNoticeState = ({ close }) => {
  const dispatch = useDispatch();
  const [expandedIds, setExpandedIds] = useState([0]); // First item expanded by default

  const toggleAccordion = (id) => {
    setExpandedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((expandedId) => expandedId !== id) // Remove if already expanded
        : [...prevIds, id] // Add if not expanded
    );
  };

  return (
    <View style={styles.content}>
      <View style={styles.closeModalMain}>
        <ArrowLeft onPress={() => close(false)} size={30} strokeWidth={2} />
        <AntDesign
          onPress={() => dispatch(setToggleToolsPopup(false))}
          name="close"
          size={24}
          color="black"
        />
      </View>
      {/* Title */}
      <Text style={styles.title}>Where to find your API Key</Text>

      {/* Description */}
      <Text style={styles.description}>
        An API key is a unique code that securely links your AI account to
        Elunara. It enables personalized, private responses and helps you make
        the most of your subscription.
      </Text>

      <ScrollView style={{ maxHeight: screenHeight * 0.5 }}>
        {findApiKeyNotices?.map((item, itemIndex) => {
          return (
            <FindAPIKeyAccordian
              key={itemIndex}
              isExpanded={expandedIds.includes(item.id)}
              onToggle={() => toggleAccordion(item.id)}
              item={item}
            />
          );
        })}

        {/* Button */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: "#081A35",
            },
          ]}
          onPress={() => close(false)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Got it</Text>
        </TouchableOpacity>
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
  inputSection: {
    marginBottom: 5,
    marginTop: 25,
  },
  inputLabel: {
    fontSize: scaleFont(10),
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: scaleFont(10),
    color: "#1F2937",
    letterSpacing: 0.2,
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
  noteSection: {
    width: "100%",
    minHeight: verticalScale(70),
    borderWidth: 1,
    gap: 10,
    borderColor: "#D3DAE5",
    borderRadius: 16,
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
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

export default FindAPIKeyNoticeState;
