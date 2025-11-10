import React from 'react';
import Svg, { Text, Defs, LinearGradient, Stop } from 'react-native-svg';
import { scaleFont } from '../../utils/responsive';

const GradientText = ({
  children,
  colors = ['#1B365D', '#A5C0E7'],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  fontSize ,
  fontWeight = '600',
  marginTop,
  marginBottom,
  style,
  fullWidth,
  widthNumber
}) => {
  // Calculate the gradient direction
  const x1 = `${start.x * 100}%`;
  const y1 = `${start.y * 100}%`;
  const x2 = `${end.x * 100}%`;
  const y2 = `${end.y * 100}%`;

  // Extract style properties
  const flatStyle = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style || {};

  const finalFontSize =  fontSize;
  const finalFontWeight =  fontWeight;

  // Estimate width based on text length and font size
  const estimatedWidth = children.toString().length * finalFontSize * widthNumber;

  return (
    <Svg style={{marginTop:marginTop,marginBottom:marginBottom,}} height={finalFontSize * 1.5} width={fullWidth?"100%":estimatedWidth}>
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
        fill="url(#grad)"
        fontSize={finalFontSize}
        fontWeight={finalFontWeight}
        letterSpacing={1}
        x="0"
        y={finalFontSize}
      >
        {children}
      </Text>
    </Svg>
  );
};

export default GradientText;
