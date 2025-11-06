import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

const ITIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox='0 0 17 17'
      fill="none"
    >
      <Path
        fill="#7B7979"
        d="M13 2.5H3A1.5 1.5 0 0 0 1.5 4v7A1.5 1.5 0 0 0 3 12.5h4.5v1H6a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H8.5v-1H13a1.5 1.5 0 0 0 1.5-1.5V4A1.5 1.5 0 0 0 13 2.5Zm-10 1h10a.5.5 0 0 1 .5.5v5h-11V4a.5.5 0 0 1 .5-.5Zm10 8H3a.5.5 0 0 1-.5-.5v-1h11v1a.5.5 0 0 1-.5.5Z"
      />
    </Svg>
  );
};

export default ITIcon;
