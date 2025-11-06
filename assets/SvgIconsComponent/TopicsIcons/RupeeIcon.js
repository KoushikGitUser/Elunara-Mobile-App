import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const RupeeIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox='0 0 17 17'
    fill="none"
  >
    <Path
      fill="#2FC3EC"
      d="M13 5a.5.5 0 0 1-.5.5h-2.01a3.754 3.754 0 0 1-3.74 4h-.957l4.543 4.13a.502.502 0 0 1-.12.827.5.5 0 0 1-.552-.087l-5.5-5A.5.5 0 0 1 4.5 8.5h2.25a2.753 2.753 0 0 0 2.738-3H4.5a.5.5 0 1 1 0-1h4.698A2.75 2.75 0 0 0 6.75 3H4.5a.5.5 0 1 1 0-1h8a.5.5 0 0 1 0 1H9.296c.446.413.786.927.989 1.5H12.5a.5.5 0 0 1 .5.5Z"
      
    />
  </Svg>
  )
}

export default RupeeIcon