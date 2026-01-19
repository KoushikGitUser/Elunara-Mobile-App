import * as React from "react";
import Svg, { Path } from "react-native-svg";

const TextUnderlineIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="#081A35"
      d="M18.75 21a.75.75 0 0 1-.75.75H6a.75.75 0 1 1 0-1.5h12a.75.75 0 0 1 .75.75ZM12 18.75a6.006 6.006 0 0 0 6-6v-7.5a.75.75 0 1 0-1.5 0v7.5a4.5 4.5 0 1 1-9 0v-7.5a.75.75 0 0 0-1.5 0v7.5a6.006 6.006 0 0 0 6 6Z"
    />
  </Svg>
);

export default TextUnderlineIcon;
