import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const ChatIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox='0 0 16 16'
    fill="none"
  >
    <Path
      fill="#888"
      d="M8.25 1.5A6.257 6.257 0 0 0 2 7.75v5.27a.98.98 0 0 0 .98.98h5.27a6.25 6.25 0 0 0 0-12.5Zm0 11.5H3V7.75A5.25 5.25 0 1 1 8.25 13Z"
    />
  </Svg>
  )
}

export default ChatIcon