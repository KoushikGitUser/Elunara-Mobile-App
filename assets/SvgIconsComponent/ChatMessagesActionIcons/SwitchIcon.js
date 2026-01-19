import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const SwitchIcon = () => {
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
      d="M1.688 9A5.068 5.068 0 0 1 6.75 3.938h7.643l-.728-.727a.563.563 0 1 1 .796-.796l1.687 1.687a.562.562 0 0 1 0 .796l-1.687 1.688a.563.563 0 1 1-.796-.796l.728-.727H6.75A3.942 3.942 0 0 0 2.813 9a.562.562 0 1 1-1.125 0Zm14.062-.562a.563.563 0 0 0-.562.562 3.942 3.942 0 0 1-3.938 3.938H3.608l.728-.727a.563.563 0 0 0-.796-.796l-1.688 1.687a.563.563 0 0 0 0 .796l1.688 1.688a.564.564 0 0 0 .918-.614.564.564 0 0 0-.122-.182l-.728-.727h7.642A5.068 5.068 0 0 0 16.313 9a.562.562 0 0 0-.563-.562Z"
    />
  </Svg>
  )
}

export default SwitchIcon