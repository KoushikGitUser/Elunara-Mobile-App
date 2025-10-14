import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { scaleFont, verticalScale } from "../../../utils/responsive";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SignInSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const slides = [
    {
      heading: "Learning,\nReimagined.\nEthically.",
      description:
        "Designed to combine transparency, privacy, and empathy to support your learning journey.",
    },
    {
      heading: "Smarter Answers,\nSharper Goals",
      description:
        "Tap into multiple powerful AI models for nuanced answers, create dynamic learning goals. Always in your control.",
    },
    {
      heading: "Your Learning\nUniverse,Lynk-ed.",
      description:
        "Save insights from Lynk AI chat, write rich notes, and organize everything in one seamless space.",
    },
  ];

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.contentContainer}>
              {/* Gradient Heading */}
              <View style={styles.headingContainer}>

                  <Text style={styles.heading}>{slide.heading}</Text>

              </View>

              {/* Description */}
              <Text style={styles.description}>{slide.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {slides.map((_, dotIndex) => (
          <View
            key={dotIndex}
            style={[
              styles.dot,
              dotIndex === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    flexDirection:"column",
    justifyContent:"flex-end",
    marginBottom:15
  },
  contentContainer: {
    flexDirection:"column",
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    marginTop:40,
    paddingVertical:10,
  },
  headingContainer: {
    marginBottom: 10,
  },
  gradientWrapper: {
    alignSelf: "flex-start",
  },
  heading: {
    fontSize: scaleFont(40),
    fontWeight: "600",
    lineHeight: verticalScale(45),
    color: "#3B5B7F",
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(20),
    color: "#8A8A8A",
    lineHeight: 30,
    fontWeight: "400",
    maxWidth: SCREEN_WIDTH,
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom:10
  },
  dot: {
    height: 5,
    borderRadius: 4,
    marginRight: 10,
  },
  activeDot: {
    width: 40,
    backgroundColor: "#081A35",
  },
  inactiveDot: {
    width: 40,
    backgroundColor: "#e7e7e7ff",
  },
  decorativePattern: {
    position: "absolute",
    top: 40,
    right: 20,
    width: 150,
    height: 150,
    opacity: 0.05,
  },
  patternCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 20,
    borderColor: "#3B5B7F",
  },
});

export default SignInSlider;
