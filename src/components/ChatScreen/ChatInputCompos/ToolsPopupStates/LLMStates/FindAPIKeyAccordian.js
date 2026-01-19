import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { scaleFont, verticalScale } from "../../../../../utils/responsive";
import { ChevronDown, ChevronUp } from "lucide-react-native";

const FindAPIKeyAccordian = ({ item, onToggle, isExpanded }) => {
  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Image style={{ height: 23, width: 23 }} source={item?.icon} />
          <Text style={[styles.accordionTitle,{fontFamily:"Mukta-Bold"}]}>{item.title}</Text>
        </View>
        {isExpanded?<ChevronUp size={30} strokeWidth={1.5} />:<ChevronDown size={30} strokeWidth={1.5} />}
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.accordionBody}>
          <Text style={[styles.subtitle,{fontFamily:"Mukta-Bold"}]}>{item.subtitle}</Text>
          {item.steps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <Text style={[styles.stepNumber,{fontFamily:"Mukta-Bold"}]}>{index + 1}.</Text>
              <Text style={[styles.stepText,{fontFamily:"Mukta-Regular"}]}>{step}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  accordionList: {
    gap: 16,
  },
  accordionContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 30,
    overflow: "hidden",
    width: "100%",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    width: "100%",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap:15
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  // Icon specific styles
  openaiIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  openaiInner: {
    width: 16,
    height: 16,
    borderRadius: 3,
    backgroundColor: "#FFF",
  },
  geminiIcon: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  geminiText: {
    fontSize: 20,
    color: "#4285F4",
  },
  mistralIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#F2542D",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  mistralText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "700",
  },
  anthropicIcon: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  anthropicText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  chevron: {
    fontSize: 20,
    color: "#666",
  },
  accordionBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop:30
  },
  subtitle: {
    fontSize: 16,
    color: "#000",
    marginBottom: 16,
    fontWeight: "500",
  },
  stepContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  stepNumber: {
    fontSize: 15,
    color: "#000",
    marginRight: 8,
    fontWeight: "500",
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    lineHeight: 22,
  },
  footer: {
    padding: 24,
    paddingBottom: 32,
  },
  button: {
    backgroundColor: "#0A1F44",
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "600",
  },
});

export default FindAPIKeyAccordian;
