import Svg, { G, Rect, Path, Defs } from "react-native-svg"
import React from 'react'

const SendIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={42}
    height={42}
    viewBox='0 0 34 34'
    fill="none"
  >
    <G filter="url(#a)">
      <Rect width={32} height={32} x={1.777} y={0.889} fill="#081A35" rx={16} />
      <Rect
        width={31.111}
        height={31.111}
        x={2.222}
        y={1.333}
        stroke="#252B37"
        strokeWidth={0.889}
        rx={15.556}
      />
      <Path
        fill="#FDFDFD"
        d="M24.674 9.991a1.112 1.112 0 0 0-1.088-.283h-.01l-13.33 4.044a1.111 1.111 0 0 0-.172 2.07l5.897 2.872 2.868 5.894a1.101 1.101 0 0 0 1.099.63 1.104 1.104 0 0 0 .972-.8l4.042-13.329v-.01a1.111 1.111 0 0 0-.278-1.088Zm-4.826 14.11-.003.009v-.005l-2.782-5.715 3.333-3.334a.555.555 0 0 0-.785-.785l-3.334 3.333-5.717-2.781h-.005.01l13.323-4.046-4.04 13.323Z"
      />
    </G>
    <Defs></Defs>
  </Svg>
  )
}

export default SendIcon