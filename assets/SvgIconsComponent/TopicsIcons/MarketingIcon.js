import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const MarketingIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox='0 0 17 17'
    fill="none"
  >
    <Path
      fill="#7D1DE4"
      d="M14.5 13a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V3a.5.5 0 1 1 1 0v6.793l3.146-3.147a.5.5 0 0 1 .708 0L8 8.293 11.293 5H10a.5.5 0 1 1 0-1h2.5a.5.5 0 0 1 .5.5V7a.5.5 0 0 1-1 0V5.707L8.354 9.354a.5.5 0 0 1-.708 0L6 7.707l-3.5 3.5V12.5H14a.5.5 0 0 1 .5.5Z"
    />
  </Svg>
  )
}

export default MarketingIcon