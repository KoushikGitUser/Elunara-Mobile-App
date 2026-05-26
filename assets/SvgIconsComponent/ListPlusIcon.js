import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ListPlusIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    viewBox='0 0 18 18'
    fill="none"
    {...props}
  >
    <Path
      fill="#343330"
      d="M2.25 4.5a.563.563 0 0 1 .563-.563h12.374a.562.562 0 1 1 0 1.126H2.813A.563.563 0 0 1 2.25 4.5Zm.563 5.063h12.374a.562.562 0 1 0 0-1.126H2.813a.563.563 0 1 0 0 1.126Zm7.312 3.374H2.812a.563.563 0 0 0 0 1.126h7.313a.562.562 0 1 0 0-1.126Zm6.188 0h-1.125v-1.124a.562.562 0 1 0-1.126 0v1.124h-1.124a.562.562 0 1 0 0 1.126h1.124v1.124a.562.562 0 1 0 1.126 0v-1.124h1.124a.562.562 0 1 0 0-1.126Z"
    />
  </Svg>
)
export default ListPlusIcon