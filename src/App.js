import React, { useState } from 'react'
import { Text, Dimensions } from 'react-native' // eslint-disable-line import/namespace

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
	const [Covid19Data, SetCovid19Data] = useState([])
	const [Covid19TotalData, SetCovid19TotalData] = useState({})

	const FetchCovid19Data = () => {
		fetch(
			'https://mahabub81.github.io/covid-19-api/api/v1/world-summary-time-series.json'
		)
			.then(response => response.json())
			.then(data => {
				SetCovid19Data(data)
				SetCovid19TotalData(
					data.reduce(
						(acc, value) => {
							acc.confirmed += value.confirmed
							acc.deaths += value.deaths

							return acc
						},
						{ confirmed: 0, deaths: 0 }
					)
				)
			})
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
			<LineChart
				data={{
					labels: ['January', 'February', 'March', 'April'],
					datasets: [
						{
							data: [10, 2, 100, 50, 55],
							color: (opacity = 1) =>
								`rgba(0, 0, 255, ${opacity})`,
						},
						{
							data: [12, 20, 120, 90, 49],
							color: (opacity = 1) =>
								`rgba(255, 0, 0, ${opacity})`,
						},
					],
				}}
				width={Dimensions.get('window').width * 0.8}
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
			</DataContainer>
			<StatusBar style='auto' />
		</Container>
	)
}

export default registerRootComponent(App)
