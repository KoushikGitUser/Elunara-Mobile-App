// responsive.js
import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ✅ You can adjust this base design width/height according to your design file
const BASE_WIDTH = 390;   // e.g., iPhone 14 width
const BASE_HEIGHT = 844;  // e.g., iPhone 14 height

// Scale based on width
export const scale = (size) => (SCREEN_WIDTH / BASE_WIDTH) * size;

// Scale based on height
export const verticalScale = (size) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

// Moderate scaling (useful for fonts, paddings, etc.)
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// Font scaling (with rounding)
export const scaleFont = (size) =>
  Math.round(PixelRatio.roundToNearestPixel(moderateScale(size)));

// Optional: Detect small vs. large devices
export const isSmallDevice = SCREEN_WIDTH < 360;
export const isTablet = SCREEN_WIDTH >= 768;
