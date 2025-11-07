import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const ShareIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    viewBox='0 0 19 19'
    fill="none"
  >
    <Path
      fill="#081A35"
      d="m16.148 7.71-3.375 3.376a.563.563 0 0 1-.796-.796l2.415-2.415h-2.79a6.187 6.187 0 0 0-5.993 4.64.563.563 0 0 1-1.09-.28 7.308 7.308 0 0 1 7.083-5.485h2.792l-2.417-2.414a.564.564 0 0 1 .796-.796l3.375 3.375a.562.562 0 0 1 0 .796ZM13.5 14.626H2.812V6.188a.562.562 0 1 0-1.124 0v8.437a1.125 1.125 0 0 0 1.125 1.125H13.5a.562.562 0 1 0 0-1.125Z"
    />
  </Svg>
  )
}

export default ShareIcon