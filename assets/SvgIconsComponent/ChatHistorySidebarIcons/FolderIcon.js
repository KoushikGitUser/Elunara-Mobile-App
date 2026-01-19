import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const FolderIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox='0 0 20 20'
    fill="none"
  >
    <Path
      fill="#888"
      d="M16.875 5.625h-6.666L8.04 4a1.26 1.26 0 0 0-.75-.25H3.125A1.25 1.25 0 0 0 1.875 5v10.625a1.25 1.25 0 0 0 1.25 1.25h13.82a1.182 1.182 0 0 0 1.18-1.18v-8.82a1.25 1.25 0 0 0-1.25-1.25Zm0 10H3.125V5h4.166L9.46 6.625c.216.162.48.25.75.25h6.666v8.75Z"
    />
  </Svg>
  )
}

export default FolderIcon