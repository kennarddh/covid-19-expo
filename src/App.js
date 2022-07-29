import React, { useState } from 'react'

import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { Text, TouchableOpacity } from 'react-native' // eslint-disable-line import/namespace

import { Container } from './Styles'

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
			<TouchableOpacity onPress={OnPress}>
				<Text>Press Here</Text>
			</TouchableOpacity>
			<StatusBar style='auto' />
		</Container>
	)
}

export default registerRootComponent(App)
