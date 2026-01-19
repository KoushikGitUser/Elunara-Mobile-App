import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const FolderPlusIcon = () => {
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
      d="M8 7.5a.5.5 0 0 1 .5.5v1h1a.5.5 0 1 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 1 1 0-1h1V8a.5.5 0 0 1 .5-.5Zm6.5-2v7a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3.333c.216 0 .427.07.6.2l1.734 1.3H13.5a1 1 0 0 1 1 1ZM2.5 6h3.333l1.334-1-1.334-1H2.5v2Zm11-.5H8.167L6.433 6.8c-.173.13-.384.2-.6.2H2.5v5.5h11v-7Z"
    />
  </Svg>
  )
}

export default FolderPlusIcon