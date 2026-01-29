import React, { useEffect } from "react";
import Svg, { Text, Defs, LinearGradient, Stop } from "react-native-svg";
import { useFonts } from "expo-font";

const AuthGradientText = ({
  children,
  colors = ["#1B365D", "#A5C0E7"],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  fontSize = 32,
  fontWeight = "700",
  marginTop = 0,
  marginBottom = 0,
  style,
  fullWidth = false,
  widthMultiplier = 0.65,
  textAlign = "center",
}) => {
  const [fontsLoaded] = useFonts({
    "Mukta-Bold": require("../../../assets/fonts/Mukta-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Font loaded successfully   
    }
  }, [fontsLoaded]);

  // Return null while fonts are loading
  if (!fontsLoaded) {
    return null;
  }

  // Calculate the gradient direction
  const x1 = `${start.x * 100}%`;
  const y1 = `${start.y * 100}%`;
  const x2 = `${end.x * 100}%`;
  const y2 = `${end.y * 100}%`;

  // Estimate width based on text length and font size
  const estimatedWidth = children.toString().length * fontSize * widthMultiplier;

  // Calculate x position for text alignment
  // Add small offset for left-aligned text to prevent clipping
  let xPosition = 2;
  if (textAlign === "center") {
    xPosition = "50%";
  } else if (textAlign === "right") {
    xPosition = "100%";
  }

  return (
    <Svg
      style={{
        marginTop: marginTop,
        marginBottom: marginBottom,
        fontFamily: "Mukta-Bold",
        ...style,
      }}
      height={fontSize * 1.5}
      width={fullWidth ? "100%" : estimatedWidth}
    >
      <Defs>
        <LinearGradient id="authGrad" x1={x1} y1={y1} x2={x2} y2={y2}>
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
        fill="url(#authGrad)"
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily="Mukta-Bold"
        letterSpacing={1.2}
        x={xPosition}
        y={fontSize}
        textAnchor={textAlign === "center" ? "middle" : textAlign === "right" ? "end" : "start"}
      >
        {children}
      </Text>
    </Svg>
  );
};

export default AuthGradientText;
