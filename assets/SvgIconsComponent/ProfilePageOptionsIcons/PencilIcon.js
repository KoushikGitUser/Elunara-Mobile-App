import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const PencilIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox='0 0 18 18'
    fill="none"
  >
    <Path
      fill="#081A35"
      d="m17.76 5.732-3.492-3.49a1.25 1.25 0 0 0-1.768 0l-9.634 9.633a1.24 1.24 0 0 0-.366.883v3.492a1.25 1.25 0 0 0 1.25 1.25h13.125a.625.625 0 1 0 0-1.25H9.009l8.75-8.75a1.25 1.25 0 0 0 0-1.768ZM7.24 16.25H3.75v-3.492l6.875-6.875 3.491 3.492-6.875 6.875ZM15 8.49 11.51 5l1.874-1.875 3.491 3.491L15 8.491Z"
    />
  </Svg>
  )
}

export default PencilIcon