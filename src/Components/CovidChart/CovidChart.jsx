import React from 'react'

import { Dimensions } from 'react-native' // eslint-disable-line import/namespace

import { LineChart } from 'react-native-chart-kit'

const CovidChart = ({
	covidData,
	width,
	height,
	chartConfig,
	bezier = true,
	style,
	windowWidthMultiplier,
}) => {
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
		/>
	)
}

export default CovidChart
