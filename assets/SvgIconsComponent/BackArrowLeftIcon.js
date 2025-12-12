import * as React from "react";
import Svg, { Path } from "react-native-svg";

const BackArrowLeftIcon = (props) => (
  <Svg width={30} height={30} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill="#081A35"
      d="M21 12a.75.75 0 0 1-.75.75H5.56l5.47 5.47a.75.75 0 1 1-1.06 1.06l-6.75-6.75a.75.75 0 0 1 0-1.06l6.75-6.75a.75.75 0 1 1 1.06 1.06l-5.47 5.47h14.69A.75.75 0 0 1 21 12Z"
    />
  </Svg>
)

export default BackArrowLeftIcon;
