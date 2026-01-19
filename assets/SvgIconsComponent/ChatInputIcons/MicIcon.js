import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const MicIcon = () => {
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
      d="M14 19.031A5.038 5.038 0 0 0 19.031 14V7A5.031 5.031 0 1 0 8.97 7v7A5.038 5.038 0 0 0 14 19.031ZM10.281 7a3.719 3.719 0 0 1 7.438 0v7a3.719 3.719 0 1 1-7.438 0V7Zm4.375 15.504v2.871a.656.656 0 1 1-1.312 0v-2.871A8.541 8.541 0 0 1 5.469 14a.656.656 0 1 1 1.312 0 7.219 7.219 0 0 0 14.438 0 .656.656 0 1 1 1.312 0 8.54 8.54 0 0 1-7.875 8.504Z"
    />
  </Svg>
  )
}

export default MicIcon