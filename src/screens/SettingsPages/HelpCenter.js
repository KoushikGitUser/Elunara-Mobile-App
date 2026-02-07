import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { scaleFont, verticalScale } from "../../utils/responsive";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  Search,
} from "lucide-react-native";
import { faqData } from "../../data/datas";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setSettingsInnerPageHeaderTitle } from "../../redux/slices/globalDataSlice";
import ValueFeedbackCompo from "../../components/ProfileAndSettings/HelpCenterCompo/ValueFeedbackCompo";
import GuidedTourStartPopup from "../../components/ProfileAndSettings/HelpCenterCompo/GuidedTourStartPopup";
import DemoPopup from "../../components/ProfileAndSettings/HelpCenterCompo/DemoPopup";

const HelpCenter = ({ handleScroll }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [moreAccordions, setMoreAccordions] = useState(false);
  const [toggleFeedbackPopup,setToggleFeedbackPopup] = useState(false);
  const [toggleGuideTourStartPopup,setToggleGuideTourStartPopup] = useState(false);
  const [toggleDemoPopup, setToggleDemoPopup] = useState(false);
  const navigation = useNavigation();
  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };


  const handleFeedbackPress = () => {
    setToggleFeedbackPopup(true)
  };
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ValueFeedbackCompo popupState={toggleFeedbackPopup} setPopupState={setToggleFeedbackPopup} />
      <GuidedTourStartPopup popupState={toggleGuideTourStartPopup} setPopupState={setToggleGuideTourStartPopup} />
      <DemoPopup popupState={toggleDemoPopup} setPopupState={setToggleDemoPopup} />
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
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          <Text style={styles.mainTitle}>How can we help you?</Text>
          <Text style={styles.introText}>
            Need something cleared up? Here are our most frequently asked
            questions.
          </Text>
        </View>

        <View style={styles.searchInputMain}>
          <Search
            size={25}
            strokeWidth={1.25}
            color="#B5BECE"
            style={styles.searchIcon}
          />
          <TextInput
            onFocus={() => {
              navigation.navigate("settingsInnerPages", { page: 9 });
              dispatch(setSettingsInnerPageHeaderTitle("Search"));
            }}
            placeholder="Search"
            placeholderTextColor="#B5BECE"
            style={styles.searchInput}
          />
        </View>

        {/* Cookies section */}

        <View style={styles.accordionContainer}>
          {faqData.map((item, index) => {
            if (!moreAccordions && index <= 5) {
              return (
                <View key={index} style={styles.accordionItem}>
                  <TouchableOpacity
                    style={[
                      styles.accordionHeader,
                      expandedIndex === index && styles.accordionHeaderExpanded,
                    ]}
                    onPress={() => toggleAccordion(index)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.headerContent}>
                      <Text
                        style={[
                          styles.questionTitle,
                          expandedIndex === index &&
                            styles.questionTitleExpanded,
                        ]}
                      >
                        {item.questionTitle}
                      </Text>
                      {expandedIndex === index && (
                        <Text style={styles.answerText}>{item.answer}</Text>
                      )}
                    </View>
                    <View style={styles.iconContainer}>
                      {expandedIndex === index ? (
                        <Minus size={19} color="#1f2937" strokeWidth={2.5} />
                      ) : (
                        <Plus size={19} color="#1f2937" strokeWidth={2.5} />
                      )}
                    </View>
                  </TouchableOpacity>
                  {index == 5 && !moreAccordions && (
                    <View style={styles.moreIcon}>
                      <ChevronDown
                        onPress={() => setMoreAccordions(true)}
                        size={35}
                        strokeWidth={1.25}
                      />
                    </View>
                  )}
                </View>
              );
            } else if (moreAccordions) {
              return (
                <View key={index} style={styles.accordionItem}>
                  <TouchableOpacity
                    style={[
                      styles.accordionHeader,
                      expandedIndex === index && styles.accordionHeaderExpanded,
                    ]}
                    onPress={() => toggleAccordion(index)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.headerContent}>
                      <Text
                        style={[
                          styles.questionTitle,
                          expandedIndex === index &&
                            styles.questionTitleExpanded,
                        ]}
                      >
                        {item.questionTitle}
                      </Text>
                      {expandedIndex === index && (
                        <Text style={styles.answerText}>{item.answer}</Text>
                      )}
                    </View>
                    <View style={styles.iconContainer}>
                      {expandedIndex === index ? (
                        <Minus size={19} color="#1f2937" strokeWidth={2.5} />
                      ) : (
                        <Plus size={19} color="#1f2937" strokeWidth={2.5} />
                      )}
                    </View>
                  </TouchableOpacity>
                  {index === faqData.length - 1 && moreAccordions && (
                    <View style={styles.moreIcon}>
                      <ChevronUp
                        onPress={() => setMoreAccordions(false)}
                        size={35}
                        strokeWidth={1.25}
                      />
                    </View>
                  )}
                </View>
              );
            }
          })}
        </View>

        {/* <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Explore Elunara with Our Guided Walkthrough
          </Text>
          <Text style={styles.cardDescription}>
            Get familiar with Elunara's key features through an interactive
            replay of the app. Perfect for first-time users or anyone needing a
            refresher.
          </Text>
          <TouchableOpacity
          onPress={()=>setToggleGuideTourStartPopup(true)}
            style={styles.button}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Start Walkthrough</Text>
          </TouchableOpacity>
        </View> */}

        {/* Demo Button */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}> Explore Elunara with Our Guided Walkthrough</Text>
          <Text style={styles.cardDescription}>
             Get familiar with Elunara's key features through an interactive
            replay of the app. Perfect for first-time users or anyone needing a
            refresher.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setToggleDemoPopup(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Start Walkthrough</Text>
          </TouchableOpacity>
        </View>

        {/* Card 2 - We Value Your Feedback */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>We Value Your Feedback</Text>
          <Text style={styles.cardDescription}>
            Help us improve Elunara by sharing your thoughts, suggestions, or
            reporting any issues. Your input shapes the future of your AI
            learning companion.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleFeedbackPress}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Send Feedback</Text>
          </TouchableOpacity>
        </View>

        {/* Card 3 - Still have questions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Still have questions?</Text>
          <Text style={styles.cardDescription}>
            Can't find what you're looking for? Reach out to our support team
            for personalized assistance anytime.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("settingsInnerPages", { page: 8 });
              dispatch(setSettingsInnerPageHeaderTitle("Contact Us"));
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Get in Touch</Text>
          </TouchableOpacity>
        </View>
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
  sectionTitle: {
    fontSize: scaleFont(18),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  moreIcon: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  bodyText: {
    fontSize: 15,
    fontFamily: "Mukta-Regular",
    color: "#666666",
    lineHeight: 24,
    marginBottom: 16,
  },
  bulletPoint: {
    flexDirection: "row",
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 15,
    fontFamily: "Mukta-Regular",
    color: "#666666",
    marginRight: 12,
    marginTop: 2,
  },
  bulletContent: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bulletTextBold: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    fontFamily: "Mukta-Medium",
    color: "#1A1A1A",
    lineHeight: 24,
  },
  bulletText: {
    fontSize: 15,
    color: "#666666",
    lineHeight: 24,
    fontWeight: 400,
    fontFamily: "Mukta-Regular",
    flex: 1,
  },
  bulletTextSimple: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#666666",
    lineHeight: 24,
    flex: 1,
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  emailIcon: {
    fontSize: 16,
    fontFamily: "Mukta-Regular",
    marginRight: 8,
    color: "#666666",
  },
  emailText: {
    fontSize: 15,
    color: "#1A1A1A",
    fontWeight: "500",
    fontFamily: "Mukta-Medium",
  },
  bottomSpacer: {
    height: 20,
  },
  searchInputMain: {
    width: "100%",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 15,
  },
  searchIcon: {
    position: "absolute",
    left: 30,
  },
  searchInput: {
    width: "100%",
    height: verticalScale(55),
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#ABB8CC",
    paddingLeft: 40,
  },
  accordionContainer: {
    padding: 0,
    marginTop: 30,
  },
  accordionItem: {
    marginBottom: 0,
  },
  accordionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  accordionHeaderExpanded: {
    backgroundColor: "#EBF1FB",
    borderWidth: 1,
    borderRadius: 24,
    borderColor: "#D3DAE5",
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 17,
    paddingVertical: 17,
  },
  headerContent: {
    flex: 1,
    paddingRight: 16,
  },
  questionTitle: {
    fontSize: scaleFont(16),
    fontWeight: "500",
    fontFamily: "Mukta-Bold",
    color: "#1f2937",
    lineHeight: 26,
  },
  questionTitleExpanded: {
    marginBottom: 10,
  },
  answerText: {
    fontSize: scaleFont(14),
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
    color: "#4b5563",
    lineHeight: 28,
  },
  iconContainer: {
    width: 23,
    height: 23,
    borderRadius: 22,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#1f2937",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D3DAE5",
  },
  cardTitle: {
    fontSize: scaleFont(18),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#1f2937",
    lineHeight: 36,
    marginBottom: 16,
  },
  cardDescription: {
    fontSize: scaleFont(14),
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
    color: "#6b7280",
    lineHeight: 26,
    marginBottom: 28,
  },
  button: {
    backgroundColor: "#ffffff",
    borderRadius: 48,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderWidth: 1.5,
    borderColor: "#1f2937",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#1f2937",
    letterSpacing: 0.2,
  },
});

export default HelpCenter;
