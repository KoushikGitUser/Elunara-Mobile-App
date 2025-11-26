import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const RenameIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    viewBox='0 0 15 15'
    fill="none"
  >
    <Path
      fill="#081A35"
      d="m14.207 4.586-2.793-2.793a1 1 0 0 0-1.414 0L2.293 9.5a.992.992 0 0 0-.293.707V13a1 1 0 0 0 1 1h2.793a.992.992 0 0 0 .707-.293L14.207 6a1 1 0 0 0 0-1.414Zm-8.414 8.415H3v-2.794l5.5-5.5L11.293 7.5l-5.5 5.5ZM12 6.793 9.207 4l1.5-1.5L13.5 5.293l-1.5 1.5Z"
    />
  </Svg>
  )
}

export default RenameIcon