import React, { useState } from 'react'
import { Text, Dimensions, TextInput } from 'react-native' // eslint-disable-line import/namespace

import { registerRootComponent } from 'expo'

import { StatusBar } from 'expo-status-bar'

import { LineChart } from 'react-native-chart-kit'

import {
	Container,
	Button,
	DataContainer,
	DataItem,
	DataHeading,
} from './Styles'

const App = () => {
	const [Covid19Data, SetCovid19Data] = useState({
		confirmed: [0],
		deaths: [0],
		date: ['No data'],
	})

	const [Covid19TotalData, SetCovid19TotalData] = useState({})

	const FetchCovid19Data = () => {
		fetch(
			'https://mahabub81.github.io/covid-19-api/api/v1/world-summary-time-series.json'
		)
			.then(response => response.json())
			.then(data => {
				const sorted = data.sort((a, b) => {
					return new Date(a.date) - new Date(b.date)
				}) // Sort data ascending

				const result = sorted.reduce(
					(acc, value) => ({
						confirmed: [
							...acc.confirmed,
							value.confirmed - acc.total.confirmed,
						],
						deaths: [
							...acc.deaths,
							value.deaths - acc.total.deaths,
						],
						date: [...acc.date, value.date],
						total: {
							confirmed: value.confirmed,
							deaths: value.deaths,
						},
					}),
					{
						confirmed: [],
						deaths: [],
						date: [],
						total: { confirmed: 0, deaths: 0 },
					}
				)

				const array = result.date.slice(-30) // Get last 30 data

				const maxVal = 3

				const delta = Math.floor(array.length / maxVal)

				const newArray = []

				for (let i = 0; i < array.length; i = i + delta) {
					// eslint-disable-next-line security/detect-object-injection
					newArray.push(array[i])
				}

				SetCovid19Data({
					confirmed: result.confirmed.slice(-30), // Get last 30 data
					deaths: result.deaths.slice(-30), // Get last 30 data
					date: newArray,
				})

				SetCovid19TotalData(
					sorted.slice(-1)[0] // Get last data
				)
			})
			.catch(err => console.log(err))
	}

	const OnPress = () => {
		FetchCovid19Data()
	}

	return (
		<Container>
			<Text>Open up App.js to start working on your app!</Text>
			<Button onPress={OnPress}>
				<Text>Fetch Data</Text>
			</Button>
			<TextInput value={JSON.stringify(Covid19Data)} />
			<LineChart
				data={{
					labels: Covid19Data?.date || ['No data'],
					datasets: [
						{
							data: Covid19Data?.confirmed,
							color: (opacity = 1) =>
								`rgba(0, 0, 255, ${opacity})`,
						},
						{
							data: Covid19Data?.deaths,
							color: (opacity = 1) =>
								`rgba(255, 0, 0, ${opacity})`,
						},
					],
					legend: ['Confirmed', 'Deaths'],
				}}
				width={Dimensions.get('window').width * 0.9}
				height={220}
				chartConfig={{
					backgroundColor: '#d3d3d3',
					backgroundGradientFrom: '#eff3ff',
					backgroundGradientTo: '#efefef',
					decimalPlaces: 2, // optional, defaults to 2dp
					color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
					style: {
						borderRadius: 16,
					},
				}}
				bezier
				style={{
					marginVertical: 8,
					borderRadius: 16,
				}}
			/>
			<DataContainer>
				<DataHeading>Total</DataHeading>
				<DataItem>
					Confirmed: {Covid19TotalData.confirmed || 0}
				</DataItem>
				<DataItem>Deaths: {Covid19TotalData.deaths || 0}</DataItem>
				<DataItem>
					Last Updated At: {Covid19TotalData.date || '0000-00-00'}
				</DataItem>
			</DataContainer>
			<StatusBar style='auto' />
		</Container>
	)
}

export default registerRootComponent(App)
