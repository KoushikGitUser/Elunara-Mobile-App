import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const TrashIcon = () => {
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
      d="M13.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3A1.5 1.5 0 0 0 5 2.5V3H2.5a.5.5 0 1 0 0 1H3v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4h.5a.5.5 0 0 0 0-1ZM6 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V3H6v-.5ZM12 13H4V4h8v9ZM7 6.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 1 1 1 0Zm3 0v4a.5.5 0 0 1-1 0v-4a.5.5 0 1 1 1 0Z"
    />
  </Svg>
  )
}

export default TrashIcon