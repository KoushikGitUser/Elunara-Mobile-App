import React from 'react'
import Svg, { Path, Rect, Circle, Line } from 'react-native-svg'

const CurriculumIcon = ({ size = 28, color = "#000", strokeWidth = 2 }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Document body with folded corner */}
      <Path
        d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Folded corner */}
      <Path
        d="M15 2v5h5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Person head */}
      <Circle
        cx="10"
        cy="10"
        r="2"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      {/* Person body */}
      <Path
        d="M7 15.5c0-1.5 1.34-2.5 3-2.5s3 1 3 2.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Lines */}
      <Line
        x1="7"
        y1="18"
        x2="17"
        y2="18"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Line
        x1="7"
        y1="21"
        x2="17"
        y2="21"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default CurriculumIcon
