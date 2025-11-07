import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const ArchiveIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox='0 0 19 19'
    fill="none"
  >
    <Path
      fill="#081A35"
      d="m13.947 4.276-1-2A.5.5 0 0 0 12.5 2h-9a.5.5 0 0 0-.447.276l-1 2A.505.505 0 0 0 2 4.5V13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V4.5a.505.505 0 0 0-.053-.224ZM3.81 3h8.382l.5 1H3.31l.5-1ZM13 13H3V5h10v8Zm-2.646-3.854a.502.502 0 0 1 0 .708l-2 2a.502.502 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 10.293V6.5a.5.5 0 1 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708 0Z"
    />
  </Svg>
  )
}

export default ArchiveIcon