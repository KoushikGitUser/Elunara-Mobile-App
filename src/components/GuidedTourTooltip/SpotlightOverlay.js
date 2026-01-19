import {
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import Svg, { Defs, Rect, Mask, Path } from "react-native-svg";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const SpotlightOverlay = ({
  targetRect,
  borderColor = "#FFFFFF",
  borderRadius = 12,
  borderWidth = 2,
  children,
}) => {
  // If no target rect, just show dark overlay without cutout
  if (!targetRect) {
    return (
      <View style={styles.container}>
        <View style={styles.overlayBackground} />
        {children}
      </View>
    );
  }

  const { x, y, width, height } = targetRect;

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
    <View style={styles.container}>
      {/* SVG overlay with rounded cutout */}
      <Svg
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        style={styles.svgContainer}
      >
        <Defs>
          <Mask id="spotlight-mask">
            {/* White background (visible area) */}
            <Rect
              x="0"
              y="0"
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              fill="white"
            />
            {/* Black rounded rectangle (cutout - transparent area) */}
            <Path
              d={createRoundedRectPath(x, y, width, height, borderRadius)}
              fill="black"
            />
          </Mask>
        </Defs>

        {/* Overlay with mask applied */}
        <Rect
          x="0"
          y="0"
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          fill="rgba(0, 0, 0, 0.3)"
          mask="url(#spotlight-mask)"
        />
      </Svg>

      {/* Spotlight border around the target */}
      <View
        style={[
          styles.spotlightBorder,
          {
            top: y - borderWidth,
            left: x - borderWidth,
            width: width + borderWidth * 2,
            height: height + borderWidth * 2,
            borderRadius: borderRadius,
            borderWidth: borderWidth,
            borderColor: borderColor,
          },
        ]}
      />

      {/* Children (tooltip content) */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
  svgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  overlayBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  spotlightBorder: {
    position: "absolute",
    backgroundColor: "transparent",
  },
});

export default SpotlightOverlay;
