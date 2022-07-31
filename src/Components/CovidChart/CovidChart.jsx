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
	showDeaths,
	showConfirmed,
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
		const color = data
			.getColor()
			.substring(5)
			.slice(0, -1)
			.split(',')
			.map(value => parseInt(value, 10))
			.slice(0, -1)

		const value = {
			// eslint-disable-next-line security/detect-object-injection
			date: covidData.fullDate[data.index],
			value: data.value,
			isConfirmed: color[0] === 0 && color[1] === 0 && color[2] === 255,
		}

		if (
			TooltipData.position.x === data.x &&
			TooltipData.position.y === data.y
		) {
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

	const legend = []

	if (showConfirmed) legend.push('Confirmed')
	if (showDeaths) legend.push('Deaths')

	return (
		<LineChart
			data={{
				labels: covidData?.date || ['No data'],
				legend,
				datasets: [
					...(showConfirmed
						? [
								{
									data: covidData?.confirmed,
									color: (opacity = 1) =>
										`rgba(0, 0, 255, ${opacity})`,
								},
						  ]
						: []),
					...(showDeaths
						? [
								{
									data: covidData?.deaths,
									color: (opacity = 1) =>
										`rgba(255, 0, 0, ${opacity})`,
								},
						  ]
						: []),
				],
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
						isConfirmed={TooltipData.value.isConfirmed}
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
