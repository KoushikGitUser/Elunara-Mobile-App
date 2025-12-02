import * as React from "react";
import Svg, { Path } from "react-native-svg";

const BookmarkFilledIcon = ({ size = 20 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        fill="#081A35"
        d="M12.938 2.25H5.061a1.125 1.125 0 0 0-1.125 1.125V15.75a.562.562 0 0 0 .861.477L9 13.6l4.203 2.627a.563.563 0 0 0 .86-.477V3.375a1.125 1.125 0 0 0-1.126-1.125Z"
      />
    </Svg>
  );
};

export default BookmarkFilledIcon;
