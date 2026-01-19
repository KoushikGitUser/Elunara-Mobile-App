import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ZoomIcon = ({ size = 20 }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <Path
        fill="#406DD8"
        d="M15.736 4.563a.5.5 0 0 0-.514.024L13 6.066V4.5a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9.937l2.223 1.482a.5.5 0 0 0 .277.081.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.264-.438ZM12 11.5H2v-7h10v7Zm3-1.434-2-1.334V7.268l2-1.33v4.128Z"
      />
    </Svg>
  );
};

export default ZoomIcon;
