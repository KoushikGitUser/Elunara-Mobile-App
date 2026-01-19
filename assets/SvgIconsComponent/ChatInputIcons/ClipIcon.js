import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const ClipIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox='0 0 25 25'
    fill="none"
  >
    <Path
      fill="#343330"
      d="M22.777 13.537a.66.66 0 0 1 0 .928L13.8 23.434a5.907 5.907 0 0 1-8.351-8.355L16.307 4.063a4.157 4.157 0 0 1 5.881 5.875L11.33 20.95a2.407 2.407 0 1 1-3.407-3.4l9.108-9.261a.656.656 0 1 1 .937.92l-9.11 9.266a1.093 1.093 0 1 0 1.544 1.55L21.256 9.014a2.844 2.844 0 1 0-4.018-4.025L6.38 16a4.594 4.594 0 1 0 6.494 6.501l8.975-8.969a.657.657 0 0 1 .929.005Z"
    />
  </Svg>
  )
}

export default ClipIcon