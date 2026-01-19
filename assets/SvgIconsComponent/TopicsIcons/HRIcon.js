import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const HRIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox='0 0 17 17'
    fill="#3f2700ff"
  >
    <Path
      fill="#FF9D00"
      d="M10.5 3.5A.5.5 0 0 1 11 3h1V2a.5.5 0 0 1 1 0v1h1a.5.5 0 1 1 0 1h-1v1a.5.5 0 0 1-1 0V4h-1a.5.5 0 0 1-.5-.5Zm3.91 3.418A6.495 6.495 0 1 1 9.082 1.59a.5.5 0 0 1-.165.986A5.504 5.504 0 0 0 2.5 8a5.476 5.476 0 0 0 1.39 3.65 4.98 4.98 0 0 1 2.254-1.796 3 3 0 1 1 3.712 0 4.98 4.98 0 0 1 2.254 1.797 5.476 5.476 0 0 0 1.314-4.568.5.5 0 1 1 .986-.165ZM8 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 4a5.474 5.474 0 0 0 3.37-1.156 4 4 0 0 0-6.74 0A5.474 5.474 0 0 0 8 13.5Z"
    />
  </Svg>
  )
}

export default HRIcon