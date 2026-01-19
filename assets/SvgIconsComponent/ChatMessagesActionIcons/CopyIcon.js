import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const CopyIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    viewBox='0 0 19 19'
    fill="none"
  >
    <Path
      fill="#081A35"
      d="M12.938 4.5H2.812a.563.563 0 0 0-.562.563v10.125a.562.562 0 0 0 .563.562h10.124a.562.562 0 0 0 .563-.563V5.063a.563.563 0 0 0-.563-.563Zm-.563 10.125h-9v-9h9v9ZM15.75 2.812v10.126a.562.562 0 1 1-1.125 0V3.374H5.062a.563.563 0 1 1 0-1.125h10.125a.562.562 0 0 1 .563.563Z"
    />
  </Svg>
  )
}

export default CopyIcon