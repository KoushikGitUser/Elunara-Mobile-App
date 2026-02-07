import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { scaleFont, verticalScale } from "../../utils/responsive";
import { Minus, Plus, Search } from "lucide-react-native";
import { faqData } from "../../data/datas";
import BigSearchIcon from "../../../assets/SvgIconsComponent/ProfilePageOptionsIcons/BigSearchIcon";
import GradientText from "../../components/common/GradientText";

const HelpCenterSearch = () => {
  const inputRef = useRef();

  const [search, setSearch] = useState("");
  const [startedSearching, setStartedSearching] = useState(false);
  const [questionMatches, setQuestionMatches] = useState([]);
  const [answerMatches, setAnswerMatches] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [expandedSearchIndex, setExpandedSearchIndex] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 200);
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    setExpandedIndex(null); // Reset expanded state on search
    setExpandedSearchIndex(null); // Reset search expanded state
    if (text == "") {
      setQuestionMatches([]);
      setAnswerMatches([]);
      setStartedSearching(false);
    } else {
      setStartedSearching(true);
      const searchTerm = text.toLowerCase();

      // Filter questions where keyword is in the questionTitle
      const questionsFound = faqData.filter((item) =>
        item.questionTitle.toLowerCase().includes(searchTerm)
      );

      // Filter answers where keyword is in the answer (but NOT already in questionTitle)
      const answersFound = faqData.filter(
        (item) =>
          item.answer.toLowerCase().includes(searchTerm) &&
          !item.questionTitle.toLowerCase().includes(searchTerm)
      );

      setQuestionMatches(questionsFound);
      setAnswerMatches(answersFound);
    }
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const toggleSearchExpand = (index) => {
    setExpandedSearchIndex(expandedSearchIndex === index ? null : index);
  };

  const noResults = search.length > 0 && questionMatches.length === 0 && answerMatches.length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.searchInputMain}>
        <Search
          size={25}
          strokeWidth={1.25}
          color="#B5BECE"
          style={styles.searchIcon}
        />
        <TextInput
          ref={inputRef}
          placeholder=""
          value={search}
          onChangeText={handleSearch}
          placeholderTextColor="#B5BECE"
          style={styles.searchInput}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* All FAQ questions (when not searching) */}
        {!startedSearching && (
          <View style={styles.faqContainer}>
            {faqData.map((item, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.faqItem,
                    isExpanded && styles.faqItemExpanded,
                  ]}
                  onPress={() => toggleExpand(index)}
                  activeOpacity={0.7}
                >
                  <View style={styles.faqContent}>
                    <Text
                      style={[
                        styles.faqQuestion,
                        isExpanded && styles.faqQuestionExpanded,
                      ]}
                    >
                      {item.questionTitle}
                    </Text>
                    {isExpanded && (
                      <Text style={styles.faqAnswer}>{item.answer}</Text>
                    )}
                  </View>
                  <View style={styles.iconContainer}>
                    {isExpanded ? (
                      <Minus size={19} color="#1f2937" strokeWidth={2.5} />
                    ) : (
                      <Plus size={19} color="#1f2937" strokeWidth={2.5} />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Question matches - touchable to expand */}
        {startedSearching && questionMatches.length > 0 && (
          <View>
            <Text style={styles.sectionLabel}>Questions</Text>
            {questionMatches.map((item, index) => {
              const isExpanded = expandedSearchIndex === index;
              return (
                <TouchableOpacity
                  key={`q-${index}`}
                  style={[
                    styles.faqItem,
                    isExpanded && styles.faqItemExpanded,
                  ]}
                  onPress={() => toggleSearchExpand(index)}
                  activeOpacity={0.7}
                >
                  <View style={styles.faqContent}>
                    <Text
                      style={[
                        styles.faqQuestion,
                        isExpanded && styles.faqQuestionExpanded,
                      ]}
                    >
                      {item.questionTitle}
                    </Text>
                    {isExpanded && (
                      <Text style={styles.faqAnswer}>{item.answer}</Text>
                    )}
                  </View>
                  <View style={styles.iconContainer}>
                    {isExpanded ? (
                      <Minus size={19} color="#1f2937" strokeWidth={2.5} />
                    ) : (
                      <Plus size={19} color="#1f2937" strokeWidth={2.5} />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Answer matches - shown as expanded cards */}
        {startedSearching && answerMatches.length > 0 && (
          <View>
            <Text style={styles.sectionLabel}>Related Answers</Text>
            {answerMatches.map((item, index) => (
              <View key={`a-${index}`} style={styles.answerCard}>
                <Text style={styles.answerCardQuestion}>{item.questionTitle}</Text>
                <Text style={styles.answerCardText}>{item.answer}</Text>
              </View>
            ))}
          </View>
        )}

        {noResults && (
          <View style={styles.noResultMain}>
            <BigSearchIcon />
            <GradientText
              marginBottom={0}
              marginTop={15}
              children="No Results found"
              fullWidth={false}
              widthNumber={0.55}
              fontSize={scaleFont(25)}
            />
            <Text style={{fontSize:scaleFont(13),textAlign:"center",width:"75%",color:"#757575"}}>
                We couldn't find any matches for your search. Try different keywords or check your spelling to find what you're looking for.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
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
    outlineColor: "black",
    outlineWidth: 1,
  },
  topicMain: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  noResultMain: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    marginTop: 70,
  },
  sectionLabel: {
    fontSize: scaleFont(13),
    color: "#757575",
    fontWeight: "500",
    fontFamily: "Mukta-Medium",
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 20,
  },
  questionText: {
    fontSize: scaleFont(15),
    color: "#1f2937",
    fontFamily: "Mukta-Regular",
    flex: 1,
  },
  answerCard: {
    backgroundColor: "#EBF1FB",
    borderWidth: 1,
    borderRadius: 24,
    borderColor: "#D3DAE5",
    marginHorizontal: 20,
    marginVertical: 8,
    paddingHorizontal: 17,
    paddingVertical: 17,
  },
  answerCardQuestion: {
    fontSize: scaleFont(16),
    fontWeight: "500",
    fontFamily: "Mukta-Bold",
    color: "#1f2937",
    lineHeight: 26,
    marginBottom: 10,
  },
  answerCardText: {
    fontSize: scaleFont(14),
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
    color: "#4b5563",
    lineHeight: 28,
  },
  faqContainer: {
    marginTop: 20,
  },
  faqItem: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  faqItemExpanded: {
    backgroundColor: "#EBF1FB",
    borderWidth: 1,
    borderRadius: 24,
    borderColor: "#D3DAE5",
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 17,
    paddingVertical: 17,
  },
  faqContent: {
    flex: 1,
    paddingRight: 16,
  },
  faqQuestion: {
    fontSize: scaleFont(16),
    fontWeight: "500",
    fontFamily: "Mukta-Bold",
    color: "#1f2937",
    lineHeight: 26,
  },
  faqQuestionExpanded: {
    marginBottom: 10,
  },
  faqAnswer: {
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
});

export default HelpCenterSearch;
