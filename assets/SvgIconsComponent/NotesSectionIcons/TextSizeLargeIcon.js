import * as React from "react";
import Svg, { Text } from "react-native-svg";

const TextSizeLargeIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Text
      x="12"
      y="18"
      fontSize="20"
      fontWeight="500"
      fill="#081A35"
      textAnchor="middle"
    >
      A
    </Text>
  </Svg>
);

export default TextSizeLargeIcon;
