import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const PinIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox='0 0 15 15'
    fill="none"

  >
    <Path
      fill="#888888"
      d="m14.708 5.085-3.793-3.792a1 1 0 0 0-1.415 0L6.148 4.655c-.666-.208-2.187-.46-3.775.822a1 1 0 0 0-.08 1.486l3.02 3.019-2.667 2.664a.5.5 0 1 0 .708.708l2.664-2.667 3.018 3.019a1 1 0 0 0 .708.294h.07a.995.995 0 0 0 .728-.396c1.228-1.631 1.11-2.957.825-3.75L14.707 6.5a1 1 0 0 0 0-1.415ZM14 5.793l-3.58 3.591a.5.5 0 0 0-.092.576c.591 1.184-.113 2.412-.584 3.04L3 6.254c.755-.609 1.478-.77 2.03-.77.35-.004.699.064 1.02.202a.5.5 0 0 0 .579-.094L10.208 2 14 5.792v.001Z"
    />
  </Svg>
  )
}

export default PinIcon