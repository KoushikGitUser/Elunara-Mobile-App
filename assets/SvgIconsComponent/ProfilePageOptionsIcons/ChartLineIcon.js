import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const ChartLineIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    viewBox='0 0 18 18'
    fill="none"
  >
    <Path
      fill="#888"
      d="M18.125 16.25a.625.625 0 0 1-.625.625h-15a.625.625 0 0 1-.625-.625V3.75a.625.625 0 0 1 1.25 0v7.373l3.963-3.467a.625.625 0 0 1 .787-.03l4.595 3.447 4.618-4.042a.624.624 0 1 1 .824.938l-5 4.375a.624.624 0 0 1-.787.03L7.53 8.928l-4.405 3.855v2.841H17.5a.624.624 0 0 1 .625.625Z"
    />
  </Svg>
  )
}

export default ChartLineIcon