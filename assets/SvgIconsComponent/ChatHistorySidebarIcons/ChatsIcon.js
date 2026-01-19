import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const ChatsIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    viewBox='0 0 19 19'
    fill="none"
  >
    <Path
      fill="#888"
      d="M13.248 5.672A6.25 6.25 0 0 0 1.25 8.126v5.156a1.094 1.094 0 0 0 1.094 1.094H6.77a6.262 6.262 0 0 0 5.729 3.75h5.156a1.094 1.094 0 0 0 1.094-1.094v-5.156a6.25 6.25 0 0 0-5.502-6.204ZM2.5 8.126a5 5 0 1 1 5 5h-5v-5Zm15 8.75h-5a5.01 5.01 0 0 1-4.35-2.534 6.246 6.246 0 0 0 5.498-7.333 5 5 0 0 1 3.852 4.867v5Z"
    />
  </Svg>
  )
}

export default ChatsIcon