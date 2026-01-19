import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const BusinessIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox='0 0 17 17'
      fill="none"
  >
    <Path
      fill="#D51EAD"
      d="M14.5 13a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V3a.5.5 0 1 1 1 0v5.898l3.17-2.773a.5.5 0 0 1 .63-.024l3.676 2.757 3.695-3.233a.5.5 0 1 1 .658.75l-4 3.5a.5.5 0 0 1-.629.024L6.024 7.143 2.5 10.227V12.5H14a.5.5 0 0 1 .5.5Z"
    />
  </Svg>
  )
}

export default BusinessIcon