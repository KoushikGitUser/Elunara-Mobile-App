import React, { useState } from "react";
import { Text as RNText, View } from "react-native";
import Svg, { Text, Defs, LinearGradient, Stop } from "react-native-svg";
import { scaleFont } from "../../utils/responsive";
import { useFonts } from "expo-font";

const GradientText = ({
  children,
  colors = ["#1B365D", "#A5C0E7"],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  fontSize,
  fontWeight = "500",
  marginTop,
  marginBottom,
  fullWidth,
  lineHeight,
}) => {
  const [measuredWidth, setMeasuredWidth] = useState(0);

  const [fontsLoaded] = useFonts({
    "Mukta-Bold": require("../../../assets/fonts/Mukta-Bold.ttf"),
  });

  // Show nothing (or a loader) while fonts are loading
  if (!fontsLoaded) {
    return null;
  }

  // Calculate the gradient direction
  const x1 = `${start.x * 100}%`;
  const y1 = `${start.y * 100}%`;
  const x2 = `${end.x * 100}%`;
  const y2 = `${end.y * 100}%`;

  const finalFontSize = fontSize;
  const finalFontWeight = fontWeight;
  const finalHeight = lineHeight || finalFontSize * 1.5;

  const handleTextLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setMeasuredWidth(width + 4); // +4 for padding/letterSpacing buffer
  };

  return (
    <View style={{ marginTop: marginTop, marginBottom: marginBottom }}>
      {/* Hidden text for measuring */}
      <RNText
        style={{
          position: "absolute",
          opacity: 0,
          fontSize: finalFontSize,
          fontWeight: finalFontWeight,
          fontFamily: "Mukta-Bold",
          letterSpacing: 1,
        }}
        onLayout={handleTextLayout}
      >
        {children}
      </RNText>

      <Svg
        height={finalHeight}
        width={fullWidth ? "100%" : measuredWidth || finalFontSize}
        style={{ opacity: measuredWidth > 0 || fullWidth ? 1 : 0 }}
      >
        <Defs>
          <LinearGradient id="grad" x1={x1} y1={y1} x2={x2} y2={y2}>
            {colors.map((color, index) => (
              <Stop
                key={index}
                offset={index / (colors.length - 1)}
                stopColor={color}
                stopOpacity="1"
              />
            ))}
          </LinearGradient>
        </Defs>
        <Text
          style={{ fontFamily: "Mukta-Bold" }}
          fill="url(#grad)"
          fontSize={finalFontSize}
          fontWeight={finalFontWeight}
          letterSpacing={1}
          x="2"
          y={finalFontSize}
        >
          {children}
        </Text>
      </Svg>
    </View>
  );
};

export default GradientText;
