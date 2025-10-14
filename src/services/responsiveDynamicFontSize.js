import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Based on iPhone 14 width (you can choose another base device)
const baseWidth = 390;

export function scaleFont(size) {
  const finalSize = (size * SCREEN_HEIGHT)/100
  return finalSize;
}
