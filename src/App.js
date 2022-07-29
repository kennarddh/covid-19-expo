import React, { useState } from 'react'

import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native' // eslint-disable-line import/namespace

import { Container, Button, DataContainer, DataItem } from './Styles'

const App = () => {
	const [Covid19Data, SetCovid19Data] = useState({})

	const FetchCovid19Data = () => {
		fetch('https://covid19.mathdro.id/api')
			.then(response => response.json())
			.then(data => {
				SetCovid19Data({
					confirmed: data.confirmed.value,
					recovered: data.recovered.value,
					deaths: data.deaths.value,
				})
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
				<DataItem>Confirmed: {Covid19Data.confirmed || 0}</DataItem>
				<DataItem>Recovered: {Covid19Data.recovered || 0}</DataItem>
				<DataItem>Deaths: {Covid19Data.deaths || 0}</DataItem>
			</DataContainer>
			<StatusBar style='auto' />
		</Container>
	)
}

export default registerRootComponent(App)
