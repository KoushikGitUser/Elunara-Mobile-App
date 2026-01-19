import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const ConversationalIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    viewBox='0 0 19 19'
    fill="none"
  >
    <Path
      fill="#888"
      d="M10.938 10a.937.937 0 1 1-1.875 0 .937.937 0 0 1 1.874 0Zm-4.376-.938a.938.938 0 1 0 0 1.875.938.938 0 0 0 0-1.875Zm6.875 0a.937.937 0 1 0 0 1.875.937.937 0 0 0 0-1.875Zm4.688.938a8.125 8.125 0 0 1-11.944 7.173l-2.66.887a1.25 1.25 0 0 1-1.581-1.581l.887-2.66a8.125 8.125 0 1 1 15.298-3.82Zm-1.25 0a6.875 6.875 0 1 0-12.827 3.442.625.625 0 0 1 .051.51l-.974 2.923 2.922-.975a.612.612 0 0 1 .51.052A6.875 6.875 0 0 0 16.875 10Z"
    />
  </Svg>
  )
}

export default ConversationalIcon