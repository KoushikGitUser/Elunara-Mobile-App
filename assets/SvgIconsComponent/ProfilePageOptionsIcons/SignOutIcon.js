import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const SignOutIcon = () => {
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
      d="M8.75 16.875a.625.625 0 0 1-.625.625H3.75a1.25 1.25 0 0 1-1.25-1.25V3.75A1.25 1.25 0 0 1 3.75 2.5h4.375a.625.625 0 0 1 0 1.25H3.75v12.5h4.375a.625.625 0 0 1 .625.625Zm8.567-7.317-3.125-3.125a.625.625 0 0 0-.884.884l2.058 2.058H8.125a.625.625 0 0 0 0 1.25h7.241l-2.058 2.058a.625.625 0 0 0 .884.884l3.125-3.125a.625.625 0 0 0 0-.884Z"
    />
  </Svg>
  )
}

export default SignOutIcon
