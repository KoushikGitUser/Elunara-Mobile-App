import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const InfoIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    viewBox='0 0 18 18'
    fill="none"
  >
    <Path
      fill="#888"
      d="M10 1.875A8.125 8.125 0 1 0 18.125 10 8.133 8.133 0 0 0 10 1.875Zm0 15A6.875 6.875 0 1 1 16.875 10 6.883 6.883 0 0 1 10 16.875Zm1.25-3.125a.624.624 0 0 1-.625.625 1.25 1.25 0 0 1-1.25-1.25V10a.625.625 0 0 1 0-1.25 1.25 1.25 0 0 1 1.25 1.25v3.125a.624.624 0 0 1 .625.625Zm-2.5-7.188a.938.938 0 1 1 1.875 0 .938.938 0 0 1-1.875 0Z"
    />
  </Svg>
  )
}

export default InfoIcon
