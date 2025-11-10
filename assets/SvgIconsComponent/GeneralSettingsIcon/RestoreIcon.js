import * as React from "react";
import Svg, { Path } from "react-native-svg";

const RestoreIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox='0 0 18 18'
    fill="none"
  >
    <Path
      stroke="#717680"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M15.333 2.667v4m0 0h-4m4 0-3.086-2.906A6 6 0 1 0 13.66 10"
    />
  </Svg>
);

export default RestoreIcon;
