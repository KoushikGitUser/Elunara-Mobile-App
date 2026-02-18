import * as React from "react"
import Svg, { Path } from "react-native-svg"
const LockIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox='0 0 20 20'
    fill="none"
    {...props}
  >
    <Path
      fill="#081A35"
      d="M13 5h-2V3.5a3 3 0 0 0-6 0V5H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1ZM6 3.5a2 2 0 1 1 4 0V5H6V3.5Zm7 9.5H3V6h10v7ZM8.75 9.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </Svg>
)
export default LockIcon