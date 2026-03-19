import { View, Text, ScrollView, Image } from "react-native";
import React, { useMemo } from "react";
import { createStyles } from "../ChatScreenCompo.styles";
import { useSelector } from "react-redux";
import chakraLogo from "../../../assets/images/Knowledge Chakra 2.png";
import GradientText from "../../common/GradientText";
import { scaleFont } from "../../../utils/responsive";

const CurriculumContentWrapper = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const { toggleStates } = useSelector((state) => state.Toggle);

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
        {/* Curriculum Header - replaces GreetingsHeader */}
        <View style={{ width: "100%", marginBottom: 15 }}>
          <GradientText
            children="Curriculum Subjects & Topics"
            fullWidth={false}
            fontSize={24}
            measureWidth={true}
          />
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

        {/* Placeholder for curriculum topics - will be populated later */}
        <View style={{ flex: 1, width: "100%" }}>
        </View>
      </ScrollView>
    </View>
  );
};

export default CurriculumContentWrapper;
