import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import React, { useMemo, useEffect } from "react";
import { createStyles } from "../ChatScreenCompo.styles";
import { useSelector, useDispatch } from "react-redux";
import chakraLogo from "../../../assets/images/Knowledge Chakra 2.png";
import GradientText from "../../common/GradientText";
import { moderateScale, scaleFont, verticalScale } from "../../../utils/responsive";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";
import { setToggleTopicsPopup, setToggleSubTopics } from "../../../redux/slices/toggleSlice";
import { setCurrentSelectedTopic, setSelectedSubjectID } from "../../../redux/slices/globalDataSlice";

const CurriculumContentWrapper = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const dispatch = useDispatch();
  const { settingsStates } = useSelector((state) => state.API);
  const subjects = settingsStates.curriculumSubjects;
  const isLoading = settingsStates.fetchingCurriculumSubjects;
  const courseName = settingsStates.allPersonalisationsSettings?.academicCareer?.degree_program?.name;

  // Fetch curriculum subjects on mount
  useEffect(() => {
    dispatch(commonFunctionForAPICalls({
      method: "GET",
      url: "/curriculum/subjects",
      name: "getCurriculumSubjects",
    }));
  }, []);

  const handleSubjectPress = (subject) => {
    const subjectId = parseInt(subject?.id, 10);
    dispatch(setSelectedSubjectID(subject?.id));
    dispatch(commonFunctionForAPICalls({
      method: "GET",
      url: `/curriculum/topics?subject_id=${subjectId}`,
      name: "getCurriculumTopics",
    }));
    dispatch(setToggleTopicsPopup(true));
    dispatch(setCurrentSelectedTopic(subject?.name));
    dispatch(setToggleSubTopics(true));
  };

  return (
    <View style={styles.chatMiddleSectionWrapper}>
      {/* Chakra logo */}
      <Image
        source={chakraLogo}
        style={{
          height: 115,
          width: 80,
          position: "absolute",
          right: -20,
          top: 120,
          zIndex: 1,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-end",
          paddingTop: 100,
        }}
        style={{ flex: 1, width: "100%", zIndex: 2 }}
      >
        {/* Curriculum Header */}
        <View style={{ width: "100%", marginBottom: 15 }}>
          <GradientText
            children="Curriculum Subjects"
            fullWidth={false}
            fontSize={24}
            measureWidth={true}
          />
          <GradientText
            children="& Topics as per AICTE"
            fullWidth={false}
            fontSize={24}
            measureWidth={true}
          />
          {courseName && (
            <Text
              style={{
                fontSize: scaleFont(16),
                color: "#1F2937",
                fontFamily: "Mukta-Bold",
                marginTop: 4,
              }}
            >
              {courseName}
            </Text>
          )}
          <Text
            style={{
              fontSize: scaleFont(15),
              color: "#9C9C9C",
              fontFamily: "Mukta-Regular",
              marginTop: 4,
            }}
          >
            Explore your course subjects and dive into specific topics tailored to your degree program.
          </Text>
        </View>

        {/* Subjects Grid */}
        {isLoading ? (
          <View style={{ paddingVertical: 40, alignItems: "center" }}>
            <ActivityIndicator size="large" color="#406DD8" />
          </View>
        ) : (
          <View style={styles.topicsMainWrapper}>
            <View style={styles.grid}>
              {subjects.map((subject, index) => (
                <TouchableOpacity
                  key={subject.id || index}
                  onPress={() => handleSubjectPress(subject)}
                  style={cardStyles.topicsMain}
                >
                  <View style={cardStyles.contentWrapper}>
                    <View style={cardStyles.imageandIcon}>
                      {subject.icon ? (
                        <Image
                          source={{ uri: subject.icon }}
                          style={{ width: 26, height: 26, resizeMode: "contain", marginBottom: 7 }}
                        />
                      ) : null}
                    </View>
                    <Text
                      style={[cardStyles.topicTitle, { fontFamily: "Mukta-Bold" }]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {subject.name}
                    </Text>
                    <Text
                      style={[cardStyles.topicDesc, { fontFamily: "Mukta-Regular" }]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {subject.description}
                    </Text>
                  </View>
                  {subject.topics_count > 0 && (
                    <View style={cardStyles.belowTopics}>
                      <Text style={[cardStyles.popularTopics, { fontFamily: "Mukta-Regular" }]}>
                        {subject.topics_count} Topics
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  topicsMain: {
    width: "48%",
    minHeight: verticalScale(110),
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 20,
    backgroundColor: "white",
  },
  contentWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flex: 1,
  },
  imageandIcon: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  topicIcon: {
    height: 26,
    width: 26,
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 7,
  },
  topicTitle: {
    fontSize: moderateScale(14),
    fontWeight: "600",
  },
  topicDesc: {
    fontSize: moderateScale(12),
    fontWeight: "400",
    color: "#757575",
    lineHeight: 15,
  },
  belowTopics: {
    backgroundColor: "#F2F7FF",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  popularTopics: {
    fontSize: scaleFont(12),
    color: "#757575",
  },
});

export default CurriculumContentWrapper;
