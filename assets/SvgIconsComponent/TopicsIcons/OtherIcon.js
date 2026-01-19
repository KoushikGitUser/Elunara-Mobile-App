import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const OtherIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox='0 0 17 17'
      fill="none"
  >
    <Path
      fill="#92470A"
      d="m14.478 12.159-2.074-9.863a1 1 0 0 0-1.188-.774l-2.925.629a1.005 1.005 0 0 0-.77 1.187l2.075 9.863a1 1 0 0 0 1.188.776l2.925-.629a1.005 1.005 0 0 0 .77-1.19ZM8.5 3.134v-.006l2.925-.625.208.992-2.925.63-.208-.991ZM8.914 5.1l2.926-.628.209.993-2.924.63-.211-.995Zm.415 1.973 2.926-.629.831 3.953-2.926.628-.831-3.952ZM13.5 12.37l-2.925.625-.208-.992 2.925-.63.208.991v.006Zm-7-10.372h-3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Zm-3 1h3v1h-3V3Zm0 2h3v6h-3V5Zm3 8h-3v-1h3v1Z"
    />
  </Svg>
  )
}

export default OtherIcon