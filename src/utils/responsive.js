// responsive.js
import { Dimensions, PixelRatio, Platform } from 'react-native';

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

// Detect "Pro Max"-class iPhones. Also matches Plus models because they
// share the same logical width as Pro Max (iPhone 12-17 Plus / Pro Max =
// 428-430 pt). Regular and Pro models sit at 375-393 pt. Use this for
// large-iPhone-only visual tweaks where the standard iPhone layout looks
// sparse (e.g. enlarged decorative imagery on landing screens).
export const isProMaxIphone =
  Platform.OS === "ios" && SCREEN_WIDTH >= 428 && !isTablet;

// Detect regular / "small" iPhones — every iOS phone that is NOT a Pro Max
// or Plus. Includes iPhone SE, mini, standard, and Pro models (320-393 pt).
// Excludes Android and iPad. Use this for slight typographic bumps that
// only apply on the smaller iPhone form factor — leaving Android and iPad
// unaffected.
export const isRegularIphone =
  Platform.OS === "ios" && SCREEN_WIDTH < 428 && !isTablet;
