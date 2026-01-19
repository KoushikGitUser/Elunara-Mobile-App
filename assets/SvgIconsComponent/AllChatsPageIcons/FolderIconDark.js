import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const FolderIconDark = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    viewBox='0 0 18 18'
    fill="none"
  >
    <Path
      fill="#081A35"
      d="M13.5 4.5H8.167L6.433 3.2c-.173-.13-.384-.2-.6-.2H2.5a1 1 0 0 0-1 1v8.5a1 1 0 0 0 1 1h11.056a.945.945 0 0 0 .944-.944V5.5a1 1 0 0 0-1-1Zm0 8h-11V4h3.333l1.734 1.3c.173.13.384.2.6.2H13.5v7Z"
    />
  </Svg>
  )
}

export default FolderIconDark