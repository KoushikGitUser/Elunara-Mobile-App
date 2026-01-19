import * as React from "react";
import Svg, { Path } from "react-native-svg";

const BriefCaseIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    viewBox="0 0 17 17"
    {...props}
  >
    <Path
      fill="#888"
      d="M15 2.5h-3.125v-.625A1.875 1.875 0 0 0 10 0H6.25a1.875 1.875 0 0 0-1.875 1.875V2.5H1.25A1.25 1.25 0 0 0 0 3.75v10A1.25 1.25 0 0 0 1.25 15H15a1.25 1.25 0 0 0 1.25-1.25v-10A1.25 1.25 0 0 0 15 2.5Zm-9.375-.625a.625.625 0 0 1 .625-.625H10a.625.625 0 0 1 .625.625V2.5h-5v-.625ZM15 3.75V7A14.38 14.38 0 0 1 1.25 7v-3.25H15Zm0 10H1.25V8.41A15.64 15.64 0 0 0 15 8.408v5.341ZM6.25 6.875a.625.625 0 0 1 .625-.625h2.5a.625.625 0 0 1 0 1.25h-2.5a.625.625 0 0 1-.625-.625Z"
    />
  </Svg>
);

export default BriefCaseIcon;
