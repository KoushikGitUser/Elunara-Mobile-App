import * as React from "react";
import Svg, { Path } from "react-native-svg";

const TextItalicIcon = (props) => (
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
      d="M18.75 5.25A.75.75 0 0 1 18 6h-3.21l-4 12h2.71a.75.75 0 1 1 0 1.5H6A.75.75 0 1 1 6 18h3.21l4-12H10.5a.75.75 0 1 1 0-1.5H18a.75.75 0 0 1 .75.75Z"
    />
  </Svg>
);

export default TextItalicIcon;
