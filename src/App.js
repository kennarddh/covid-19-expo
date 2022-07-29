import React, { useState } from 'react'

import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native' // eslint-disable-line import/namespace

import {
	Container,
	Button,
	DataContainer,
	DataItem,
	DataHeading,
} from './Styles'

const App = () => {
	const [Covid19Data, SetCovid19Data] = useState({})
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
