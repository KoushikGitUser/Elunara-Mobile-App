import * as React from "react";
import Svg, { Path } from "react-native-svg";

const TextEndIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    viewBox="0 0 22 22"
    {...props}
  >
    <Path
      fill="#081A35"
      d="M3 6a.75.75 0 0 1 .75-.75h16.5a.75.75 0 1 1 0 1.5H3.75A.75.75 0 0 1 3 6Zm17.25 3h-12a.75.75 0 0 0 0 1.5h12a.75.75 0 1 0 0-1.5Zm0 3.75H3.75a.75.75 0 1 0 0 1.5h16.5a.75.75 0 1 0 0-1.5Zm0 3.75h-12a.75.75 0 1 0 0 1.5h12a.75.75 0 1 0 0-1.5Z"
    />
  </Svg>
);

export default TextEndIcon;
