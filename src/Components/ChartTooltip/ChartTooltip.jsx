import React from 'react'

import { View } from 'react-native'

import Svg, { Rect, Text, Circle } from 'react-native-svg'

const ChartTooltip = ({ date, value, position }) => {
	return (
		<View>
			<Svg>
				<Circle cx={position.x} cy={position.y} r={3} fill='green' />
				<Rect
					x={position.x}
					y={position.y}
					width='100'
					height='50'
					rx={5}
					fill='rgba(186, 186, 186, 0.5)'
				/>
				<Text
					x={position.x + 40}
					y={position.y + 20}
					fill='white'
					fontSize='16'
					fontWeight='bold'
					textAnchor='middle'
				>
					{value}
				</Text>
				<Text
					x={position.x + 50}
					y={position.y + 40}
					fill='white'
					fontSize='16'
					fontWeight='bold'
					textAnchor='middle'
				>
					{date}
				</Text>
			</Svg>
		</View>
	)
}

export default ChartTooltip
