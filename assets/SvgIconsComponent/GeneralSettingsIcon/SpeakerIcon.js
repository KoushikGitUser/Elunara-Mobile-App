import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const SpeakerIcon = () => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox='0 0 20 20'
    fill="none"
  >
    <Path
      fill="#888"
      d="M12.15 1.938a.625.625 0 0 0-.659.069L6.035 6.25H2.5A1.25 1.25 0 0 0 1.25 7.5v5a1.25 1.25 0 0 0 1.25 1.25h3.535l5.456 4.243A.625.625 0 0 0 12.5 17.5v-15a.625.625 0 0 0-.35-.562ZM2.5 7.5h3.125v5H2.5v-5Zm8.75 8.722-4.375-3.403V7.18l4.375-3.402v12.444Zm4.219-8.288a3.125 3.125 0 0 1 0 4.131.625.625 0 0 1-.938-.826 1.875 1.875 0 0 0 0-2.478.625.625 0 0 1 .938-.827ZM19.375 10a6.243 6.243 0 0 1-1.591 4.167.625.625 0 0 1-.932-.833 5 5 0 0 0 0-6.667.626.626 0 0 1 .499-1.048.625.625 0 0 1 .433.214A6.237 6.237 0 0 1 19.375 10Z"
    />
  </Svg>
  )
}

export default SpeakerIcon
