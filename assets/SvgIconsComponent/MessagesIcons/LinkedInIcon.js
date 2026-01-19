import * as React from "react";
import Svg, { Path } from "react-native-svg";

const LinkedInIcon = ({ size = 20 }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <Path
        fill="#0077B5"
        d="M13.5 1.5h-11a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-11a1 1 0 0 0-1-1Zm0 12h-11v-11h11v11ZM6 7v4a.5.5 0 0 1-1 0V7a.5.5 0 1 1 1 0Zm5.5 1.75V11a.5.5 0 0 1-1 0V8.75a1.25 1.25 0 0 0-2.5 0V11a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .987-.111A2.25 2.25 0 0 1 11.5 8.75Zm-5.25-3.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
      />
    </Svg>
  );
};

export default LinkedInIcon;
