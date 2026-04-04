import React from "react";
import { View } from "react-native";
import Svg, { Text, TSpan, Defs, LinearGradient, Stop } from "react-native-svg";
import { useFonts } from "expo-font";

const SimpleGradientText = ({
  children,
  gradientText, // Text to show with gradient
  solidText, // Text to show in solid black
  colors = ["#1B365D", "#A5C0E7"],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  fontSize,
  fontWeight = "500",
  marginTop,
  marginBottom,
  lineHeight,
}) => {
  const [fontsLoaded] = useFonts({
    "Mukta-Bold": require("../../../assets/fonts/Mukta-Bold.ttf"),
  });

  // Show nothing while fonts are loading
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

  // Use either the new props or fallback to children for backward compatibility
  const textToDisplay = gradientText || children;
  const hasSolidText = solidText && solidText.trim() !== "";

  // Combine both texts to measure total width
  const fullText = hasSolidText ? `${textToDisplay}${solidText}` : textToDisplay;
  const totalWidth = finalFontSize * fullText.length * 0.6;

  return (
    <View style={{ marginTop: marginTop, marginBottom: marginBottom }}>
      <Svg height={finalHeight} width={totalWidth}>
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
        {/* Combined Text with TSpan for different colors */}
        <Text
          style={{ fontFamily: "Mukta-Bold" }}
          fontSize={finalFontSize}
          fontWeight={finalFontWeight}
          letterSpacing={0}
          x="0"
          y={finalFontSize}
        >
          <TSpan fill="url(#grad)">{textToDisplay}</TSpan>
          {hasSolidText && <TSpan fill="#1F2937" dx="5">{solidText}</TSpan>}
        </Text>
      </Svg>
    </View>
  );
};

export default SimpleGradientText;
