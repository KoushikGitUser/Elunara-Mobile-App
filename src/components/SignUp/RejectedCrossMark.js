import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const RejectedCrossMark = ({ size = 105, color = '#e74c3c' }) => {
  const circleAnim = useRef(new Animated.Value(0)).current;
  const crossAnim1 = useRef(new Animated.Value(0)).current;
  const crossAnim2 = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const circleCircumference = 2 * Math.PI * 45;
  // Cross line length: from (35,35) to (65,65) = sqrt(30^2 + 30^2) ≈ 42.4
  const crossLength = 45;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(circleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.timing(crossAnim1, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(crossAnim2, {
          toValue: 1,
          duration: 250,
          delay: 100,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
      ]),
      // Shake animation
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 8,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -8,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const circleStrokeDashoffset = circleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [circleCircumference, 0],
  });

  const cross1StrokeDashoffset = crossAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [crossLength, 0],
  });

  const cross2StrokeDashoffset = crossAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [crossLength, 0],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }, { translateX: shakeAnim }],
        },
      ]}
    >
      <Svg width={size} height={size} viewBox="0 0 100 100">
        {/* Background circle */}
        <Circle cx="50" cy="50" r="45" fill={color} />

        {/* Animated circle stroke */}
        <G transform="translate(50, 50) rotate(-90) translate(-50, -50)">
          <AnimatedCircle
            cx="50"
            cy="50"
            r="45"
            stroke="#d51212ff"
            strokeWidth="5"
            fill="transparent"
            strokeDasharray={`${circleCircumference}`}
            strokeDashoffset={circleStrokeDashoffset}
            strokeLinecap="round"
          />
        </G>

        {/* Animated cross - first line (top-left to bottom-right) */}
        <AnimatedPath
          d="M35 35 L65 65"
          stroke="white"
          strokeWidth="4"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={crossLength}
          strokeDashoffset={cross1StrokeDashoffset}
        />

        {/* Animated cross - second line (top-right to bottom-left) */}
        <AnimatedPath
          d="M65 35 L35 65"
          stroke="white"
          strokeWidth="4"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={crossLength}
          strokeDashoffset={cross2StrokeDashoffset}
        />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RejectedCrossMark;
