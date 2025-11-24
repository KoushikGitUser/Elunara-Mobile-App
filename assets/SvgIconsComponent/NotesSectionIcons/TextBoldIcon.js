import * as React from "react";
import Svg, { Path } from "react-native-svg";

const TextBoldIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="#081A35"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M7 12h6.667a3.333 3.333 0 0 0 0-6.666H7v6.667Zm0 0h7.5a3.333 3.333 0 1 1 0 6.667H7v-6.666Z"
    />
  </Svg>
);

export default TextBoldIcon;
