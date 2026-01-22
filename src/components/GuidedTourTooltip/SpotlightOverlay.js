import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import React from "react";
import Svg, { Defs, Rect, Mask, Path } from "react-native-svg";
import { BlurView } from "@react-native-community/blur";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const SpotlightOverlay = ({
  targetRect,
  borderColor = "#FFFFFF",
  borderRadius = 12,
  borderWidth = 2,
  children,
}) => {
  // If no target rect, just show dark overlay without cutout
  if (!targetRect) {
    console.log("SpotlightOverlay: No target rect provided");
    return (
      <View style={styles.container}>
        <View style={styles.overlayBackground} />
        {children}
      </View>
    );
  }

  const { x, y, width, height } = targetRect;
  console.log("🎨 SpotlightOverlay: Rendering with rect:", { x, y, width, height });
  console.log("   Border will be at:", {
    x: x - borderWidth,
    y: y - borderWidth,
    width: width + borderWidth * 2,
    height: height + borderWidth * 2
  });

  // Create rounded rectangle path for the cutout
  const createRoundedRectPath = (x, y, width, height, radius) => {
    // Clamp radius to half the smaller dimension
    const r = Math.min(radius, width / 2, height / 2);

    return `
      M ${x + r} ${y}
      L ${x + width - r} ${y}
      Q ${x + width} ${y} ${x + width} ${y + r}
      L ${x + width} ${y + height - r}
      Q ${x + width} ${y + height} ${x + width - r} ${y + height}
      L ${x + r} ${y + height}
      Q ${x} ${y + height} ${x} ${y + height - r}
      L ${x} ${y + r}
      Q ${x} ${y} ${x + r} ${y}
      Z
    `;
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      {/* SVG overlay with rounded cutout - NO BlurView */}
      <Svg
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        style={styles.svgContainer}
        pointerEvents="none"
      >
        <Defs>
          <Mask id="spotlight-mask">
            {/* White background (visible/darkened area) */}
            <Rect
              x="0"
              y="0"
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              fill="white"
            />
            {/* Black rounded rectangle (cutout - clear area) */}
            <Path
              d={createRoundedRectPath(x, y, width, height, borderRadius)}
              fill="black"
            />
          </Mask>
        </Defs>

        {/* Semi-transparent dark overlay with mask applied */}
        <Rect
          x="0"
          y="0"
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          fill="rgba(0, 0, 0, 0.6)"
          mask="url(#spotlight-mask)"
        />
      </Svg>

      {/* Spotlight border using SVG Rect for guaranteed visibility */}
      <Svg
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        style={{ position: 'absolute', zIndex: 10, pointerEvents: 'none' }}
      >
        <Rect
          x={x - borderWidth}
          y={y - borderWidth}
          width={width + borderWidth * 2}
          height={height + borderWidth * 2}
          rx={borderRadius}
          ry={borderRadius}
          fill="none"
          stroke={borderColor}
          strokeWidth={borderWidth}
        />
      </Svg>

      {/* Children (tooltip content) */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 9999,
  },
  svgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
  overlayBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});

export default SpotlightOverlay;
