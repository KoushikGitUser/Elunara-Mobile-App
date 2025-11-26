import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const NotesIcon = () => {
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
      d="M11.5 2h-7a1 1 0 0 0-1 1v11a.5.5 0 0 0 .765.424L8 12.089l3.736 2.335A.5.5 0 0 0 12.5 14V3a1 1 0 0 0-1-1Zm0 11.098-3.236-2.022a.5.5 0 0 0-.53 0L4.5 13.098V3h7v10.098Z"
    />
  </Svg>
  )
}

export default NotesIcon