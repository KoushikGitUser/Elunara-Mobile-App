import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const LLMIcon = ({color}) => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox='0 0 20 20'
    fill="none"
  >
    <Path
      fill={color}
      d="M17.5 5a2.5 2.5 0 1 0-3.125 2.423v.703a1.25 1.25 0 0 1-1.25 1.25h-6.25a1.25 1.25 0 0 1-1.25-1.25v-.703a2.5 2.5 0 1 0-1.25 0v.703a2.5 2.5 0 0 0 2.5 2.5h2.5v1.953a2.5 2.5 0 1 0 1.25 0v-1.953h2.5a2.5 2.5 0 0 0 2.5-2.5v-.703A2.504 2.504 0 0 0 17.5 5ZM3.75 5a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Zm7.5 10a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM15 6.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
    />
  </Svg>
  )
}

export default LLMIcon