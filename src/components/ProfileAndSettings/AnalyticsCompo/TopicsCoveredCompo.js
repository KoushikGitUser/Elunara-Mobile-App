import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { topicsCoveredAnalytics } from "../../../data/datas";
import TopicsCoveredItem from "./TopicsCoveredItem";
import { useNavigation } from "@react-navigation/native";
import { scaleFont } from "../../../utils/responsive";
import TopicsCoveredBooksIcon from "../../../../assets/SvgIconsComponent/AnalyticsIcons/TopicsCoveredBooksIcon";

const TopicsCoveredCompo = ({ isFilled }) => {
  const handleCoursePress = (courseTitle) => {
    console.log(`Pressed: ${courseTitle}`);
    // Add navigation or action here
  };

  const navigation = useNavigation();

  return (
    <View style={{width:"100%",marginBottom:30}}>
      {isFilled ? (
        <View style={styles.container}>
          <View style={styles.card}>
            {topicsCoveredAnalytics.map((course, index) => (
              <TopicsCoveredItem
                key={index}
                title={course.title}
                completed={course.completed}
                total={course.total}
                isComplete={course.isComplete}
                onPress={() => handleCoursePress(course.title)}
              />
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.cardEmpty}>
          <TopicsCoveredBooksIcon/>
          <Text style={styles.cardTitle}>Ready to get started?</Text>
          <Text style={styles.cardDescription}>
           Start your first topic and watch this space fill with your accomplishments.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("settingsInnerPages", { page: 9 });
              dispatch(setSettingsInnerPageHeaderTitle("Contact Us"));
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Start A Chat</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 0,
    justifyContent: "center",
  },
  progressBarContainer: {
    width: 140,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 10,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    marginVertical: 8,
    padding: 20,
    paddingVertical:10,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    marginTop:15
  },
  cardEmpty:{
    backgroundColor: "#ffffff",
    borderRadius: 24,
    marginVertical: 8,
    padding: 20,
    paddingVertical:20,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    marginTop:15
  },
  cardTitle: {
    fontSize: scaleFont(20),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#1f2937",
    lineHeight: 36,
    marginBottom: 16,
    marginTop:10
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
  },
});

export default TopicsCoveredCompo;
