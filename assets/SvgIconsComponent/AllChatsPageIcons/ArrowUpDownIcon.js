import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const ArrowUpDownIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    viewBox='0 0 20 20'
    fill="none"
  >
    <Path
      fill="#081A35"
      d="M11.03 15.97a.75.75 0 0 1 0 1.061l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.061l1.72 1.72V4.5a.75.75 0 0 1 1.5 0v13.19l1.72-1.72a.748.748 0 0 1 1.06 0Zm9-9-3-3a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 1.06 1.061l1.72-1.72V19.5a.75.75 0 1 0 1.5 0V6.31l1.72 1.72a.75.75 0 0 0 1.06-1.061Z"
    />
  </Svg>
  )
}

export default ArrowUpDownIcon