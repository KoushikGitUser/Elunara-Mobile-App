import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

const BooksIcons = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox='0 0 17 17'
      fill="none"
    >
      <Path
        fill="#92470A"
        d="M14 3h-4a2.5 2.5 0 0 0-2 1 2.5 2.5 0 0 0-2-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4a1.5 1.5 0 0 1 1.5 1.5.5.5 0 0 0 1 0A1.5 1.5 0 0 1 10 13h4a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-8 9H2V4h4a1.5 1.5 0 0 1 1.5 1.5v7A2.488 2.488 0 0 0 6 12Zm8 0h-4c-.541 0-1.068.175-1.5.5v-7A1.5 1.5 0 0 1 10 4h4v8Z"
      />
    </Svg>
  );
};

export default BooksIcons;
