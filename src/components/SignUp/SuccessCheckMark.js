import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const SuccessCheckMark = ({ size = 105, color = '#c0e9cfff' }) => {
  const circleAnim = useRef(new Animated.Value(0)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  const circleCircumference = 2 * Math.PI * 45;
  // Calculate actual path length: M30 50 -> L40 60 (14.14) + L40 60 -> L70 35 (39.05) ≈ 54
  const checkLength = 60;

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
      Animated.timing(checkAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const circleStrokeDashoffset = circleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [circleCircumference, 0],
  });

  const checkStrokeDashoffset = checkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [checkLength, 0],
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}> 
      <Svg width={size} height={size} viewBox="0 0 100 100">
        {/* Background circle */}
        <Circle cx="50" cy="50" r="45" fill={`${color}`} />

        {/* Animated circle stroke - using G for transform */}
        <G transform="translate(50, 50) rotate(-90) translate(-50, -50)">
          <AnimatedCircle
            cx="50"
            cy="50"
            r="45"
            stroke="#CDD5DC"
            strokeWidth="5"
            fill="transparent"
            strokeDasharray={`${circleCircumference}`}
            strokeDashoffset={circleStrokeDashoffset}
            strokeLinecap="round"
          />
        </G>

        {/* Animated checkmark */}
        <AnimatedPath
          d="M30 50 L40 60 L70 35"
          stroke="white"
          strokeWidth="4"
          fill="transparent"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={checkLength}
          strokeDashoffset={checkStrokeDashoffset}
        />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9a5555ff',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 24,
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffffff',
    marginTop: 8,
  },
});

export default SuccessCheckMark;
