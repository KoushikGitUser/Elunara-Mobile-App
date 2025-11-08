import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const PrivacyIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    viewBox='0 0 19 19'
    fill="none"
  >
    <Path
      fill="#888"
      d="M16.25 3.125H3.75a1.25 1.25 0 0 0-1.25 1.25v4.592c0 7.001 5.923 9.324 7.11 9.718.253.086.527.086.78 0 1.188-.394 7.11-2.717 7.11-9.718V4.375a1.25 1.25 0 0 0-1.25-1.25Zm0 5.843c0 6.127-5.184 8.173-6.25 8.53-1.057-.353-6.25-2.398-6.25-8.53V4.375h12.5v4.593Zm-9.817 2.1a.625.625 0 0 1 .884-.885l1.433 1.433 3.933-3.933a.626.626 0 0 1 .884.884l-4.375 4.375a.624.624 0 0 1-.884 0l-1.875-1.875Z"
    />
  </Svg>
  )
}

export default PrivacyIcon
