import React, { useState } from 'react'

import { Dimensions } from 'react-native'

import { LineChart } from 'react-native-chart-kit'

import ChartTooltip from '../ChartTooltip/ChartTooltip'

const CovidChart = ({
	covidData,
	width,
	height,
	chartConfig,
	bezier = true,
	style,
	windowWidthMultiplier,
}) => {
	const [TooltipData, SetTooltipData] = useState({
		position: {
			x: 0,
			y: 0,
		},
		visible: false,
		value: 0,
	})

	const OnDataPointClick = data => {
		const value = {
			// eslint-disable-next-line security/detect-object-injection
			date: covidData.fullDate[data.index],
			value: data.value,
		}

		if (TooltipData.x === data.x && TooltipData.y === data.y) {
			SetTooltipData(tooltipData => ({
				...tooltipData,
				value,
				visible: !tooltipData.visible,
			}))
			return
		}

		SetTooltipData({
			position: {
				x: data.x,
				y: data.y,
			},
			value,
			visible: true,
		})
	}

	return (
		<LineChart
			data={{
				labels: covidData?.date || ['No data'],
				datasets: [
					{
						data: covidData?.confirmed,
						color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
					},
					{
						data: covidData?.deaths,
						color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
					},
				],
				legend: ['Confirmed', 'Deaths'],
			}}
			width={
				width ||
				Dimensions.get('window').width * (windowWidthMultiplier || 0.9)
			}
			height={height || 220}
			chartConfig={{
				backgroundColor: '#d3d3d3',
				backgroundGradientFrom: '#eff3ff',
				backgroundGradientTo: '#efefef',
				decimalPlaces: 0, // optional, defaults to 2dp
				color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
				style: {
					borderRadius: 16,
				},
				...chartConfig,
			}}
			bezier={bezier}
			style={{
				marginVertical: 8,
				borderRadius: 16,
				...style,
			}}
			decorator={() =>
				TooltipData.visible ? (
					<ChartTooltip
						date={TooltipData.value.date}
						value={TooltipData.value.value}
						position={TooltipData.position}
					/>
				) : null
			}
			onDataPointClick={OnDataPointClick}
		/>
	)
}

export default CovidChart
