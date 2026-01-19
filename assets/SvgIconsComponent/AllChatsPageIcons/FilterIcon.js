import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const FilterIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    viewBox='0 0 22 22'
    fill="none"
  >
    <Path
      fill="#081A35"
      d="M18.75 12a.75.75 0 0 1-.75.75H6a.75.75 0 1 1 0-1.5h12a.75.75 0 0 1 .75.75Zm3-5.25H2.25a.75.75 0 0 0 0 1.5h19.5a.75.75 0 1 0 0-1.5Zm-7.5 9h-4.5a.75.75 0 1 0 0 1.5h4.5a.75.75 0 1 0 0-1.5Z"
    />
  </Svg>
  )
}

export default FilterIcon