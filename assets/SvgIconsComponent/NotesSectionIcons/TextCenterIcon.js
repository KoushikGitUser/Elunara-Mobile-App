import * as React from "react";
import Svg, { Path } from "react-native-svg";

const TextCenterIcon = (props) => (
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
      d="M3 6a.75.75 0 0 1 .75-.75h16.5a.75.75 0 1 1 0 1.5H3.75A.75.75 0 0 1 3 6Zm3 3a.75.75 0 0 0 0 1.5h12A.75.75 0 1 0 18 9H6Zm14.25 3.75H3.75a.75.75 0 1 0 0 1.5h16.5a.75.75 0 1 0 0-1.5ZM18 16.5H6A.75.75 0 1 0 6 18h12a.75.75 0 1 0 0-1.5Z"
    />
  </Svg>
);

export default TextCenterIcon;
