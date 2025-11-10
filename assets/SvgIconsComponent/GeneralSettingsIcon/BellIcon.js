import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const BellIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox='0 0 18 18'
    fill="none"
  >
    <Path
      fill="#888"
      d="M13.125 17.5a.625.625 0 0 1-.625.625h-5a.625.625 0 1 1 0-1.25h5a.625.625 0 0 1 .625.625Zm4.207-2.5a1.235 1.235 0 0 1-1.082.625H3.75a1.25 1.25 0 0 1-1.078-1.88c.433-.747 1.078-2.86 1.078-5.62a6.25 6.25 0 0 1 12.5 0c0 2.76.645 4.873 1.079 5.62A1.241 1.241 0 0 1 17.33 15h.001Zm-1.082-.625c-.604-1.037-1.25-3.434-1.25-6.25a5 5 0 0 0-10 0c0 2.817-.647 5.214-1.25 6.25h12.5Z"
    />
  </Svg>
  )
}

export default BellIcon
