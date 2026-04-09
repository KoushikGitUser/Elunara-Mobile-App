import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { scaleFont } from "../../utils/responsive";
import { appColors } from "../../themes/appColors";
import { termsOfUseData } from "../../data/PrivacyAndTermsData";

const renderFormattedContent = (content) => {
  const lines = content.split("\n");
  const firstNonEmptyIndex = lines.findIndex((l) => l.trim() !== "");

  return lines.map((line, i) => {
    const trimmed = line.trim();

    if (trimmed === "") {
      return <View key={i} style={styles.lineSpacer} />;
    }

    const looksLikeSentence = /[.;!?]$/.test(trimmed);

    if (/^[A-Z][A-Z\s]+[–-]\s+[A-Z]/.test(trimmed)) {
      return <Text key={i} style={styles.docTitle}>{trimmed}</Text>;
    }

    // Title Case doc title (first non-empty line, short, no punctuation)
    if (
      i === firstNonEmptyIndex &&
      !looksLikeSentence &&
      trimmed.split(/\s+/).length <= 8 &&
      /^[A-Z]/.test(trimmed)
    ) {
      return <Text key={i} style={styles.docTitle}>{trimmed}</Text>;
    }

    if (/^Last Updated:/i.test(trimmed)) {
      return <Text key={i} style={styles.metaText}>{trimmed}</Text>;
    }

    if (/^\d+\.\d+\.?\s+\S/.test(trimmed) && !looksLikeSentence) {
      return <Text key={i} style={styles.subHeading}>{trimmed}</Text>;
    }

    if (/^\d+\.\s+[A-Z]/.test(trimmed) && !looksLikeSentence) {
      return <Text key={i} style={styles.mainHeading}>{trimmed}</Text>;
    }

    if (/^[A-Z][A-Z\s&]{2,}$/.test(trimmed)) {
      return <Text key={i} style={styles.mainHeading}>{trimmed}</Text>;
    }

    if (/^[a-z]\)\s+[A-Z]/.test(trimmed) && !looksLikeSentence) {
      return <Text key={i} style={styles.subHeading}>{trimmed}</Text>;
    }

    return <Text key={i} style={styles.accordionContentText}>{trimmed}</Text>;
  });
};

const AccordionItem = ({ index, title, content, isOpen, onToggle }) => {
  return (
    <Animated.View
      layout={LinearTransition.duration(250)}
      style={styles.accordionWrapper}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onToggle}
        style={styles.accordionHeader}
      >
        <View style={styles.numberBadge}>
          <Text style={styles.numberBadgeText}>{index + 1}</Text>
        </View>
        <Text style={styles.accordionTitle} numberOfLines={2}>
          {title}
        </Text>
        {isOpen ? (
          <ChevronUp size={32} color={appColors.navyBlueShade} strokeWidth={1} />
        ) : (
          <ChevronDown size={32} color={appColors.navyBlueShade} strokeWidth={1} />
        )}
      </TouchableOpacity>
      {isOpen && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(150)}
          style={styles.accordionContent}
        >
          {renderFormattedContent(content)}
        </Animated.View>
      )}
    </Animated.View>
  );
};

const TermsOfUse = ({ handleScroll }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        onScroll={handleScroll}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            backgroundColor: "#F3F3F3",
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          <Text style={styles.headerLabel}>Updated: 24 July 2025</Text>
          <Text style={styles.mainTitle}>Terms of use</Text>
          <Text style={styles.introText}>
            By using our app and services, you agree to the following Terms of
            Use. Please read them carefully.
          </Text>
        </View>

        {/* Accordions */}
        <View style={styles.accordionList}>
          {termsOfUseData.map((item, index) => (
            <AccordionItem
              key={index}
              index={index}
              title={item.title}
              content={item.content}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  headerLabel: {
    fontSize: 13,
    color: "#666666",
    marginBottom: 8,
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
  },
  mainTitle: {
    fontSize: scaleFont(24),
    fontFamily: "Mukta-Bold",
    color: "#1A1A1A",
    marginBottom: 12,
    lineHeight: 36,
  },
  introText: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#666666",
    lineHeight: 24,
  },
  accordionList: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 14,
  },
  accordionWrapper: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    overflow: "hidden",
  },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 18,
    gap: 12,
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: appColors.navyBlueShade,
    alignItems: "center",
    justifyContent: "center",
  },
  numberBadgeText: {
    color: "#FFFFFF",
    fontSize: scaleFont(13),
    fontFamily: "Mukta-Bold",
    fontWeight: "600",
  },
  accordionTitle: {
    flex: 1,
    fontSize: scaleFont(15),
    fontFamily: "Mukta-Bold",
    fontWeight: "600",
    color: "#1A1A1A",
  },
  accordionContent: {
    paddingHorizontal: 14,
    paddingTop: 4,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#F1F1F1",
    marginTop: 4,
  },
  accordionContentText: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#5E5E5E",
    lineHeight: 22,
  },
  docTitle: {
    fontSize: scaleFont(18),
    fontFamily: "Mukta-Bold",
    fontWeight: "700",
    color: "#1A1A1A",
    marginTop: 4,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  metaText: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    color: "#888888",
    fontStyle: "italic",
    marginBottom: 6,
  },
  mainHeading: {
    fontSize: scaleFont(16),
    fontFamily: "Mukta-Bold",
    fontWeight: "700",
    color: "#1A1A1A",
    marginTop: 14,
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  subHeading: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Bold",
    fontWeight: "600",
    color: "#1A1A1A",
    marginTop: 8,
    marginBottom: 2,
  },
  lineSpacer: {
    height: 8,
  },
  bottomSpacer: {
    height: 20,
  },
});

export default TermsOfUse;
