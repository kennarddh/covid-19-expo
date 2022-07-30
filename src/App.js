import React, { useState, useEffect } from 'react'
import { Text, TextInput } from 'react-native'

import { registerRootComponent } from 'expo'

import { StatusBar } from 'expo-status-bar'

import CovidChart from './Components/CovidChart/CovidChart'

import GetNthElementofArray from './Utils/GetNthElementofArray'

import Button from './Components/Button/Button'

import LinkToWebButton from './Components/LinkToWebButton/LinkToWebButton'

import {
	Container,
	DataContainer,
	DataItem,
	DataHeading,
	Title,
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

				SetCovid19Data({
					confirmed: result.confirmed.slice(-30), // Get last 30 data
					deaths: result.deaths.slice(-30), // Get last 30 data
					date: GetNthElementofArray(result.date.slice(-30), 3),
					fullDate: result.date.slice(-30),
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

	useEffect(() => {
		FetchCovid19Data()
	}, [])

	return (
		<Container>
			<Title>Covid 19 - Expo</Title>
			<Button onPress={OnPress}>
				<Text>Fetch Data</Text>
			</Button>
			<TextInput value={JSON.stringify(Covid19Data)} />
			<CovidChart covidData={Covid19Data} />
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
			<LinkToWebButton
				button={Button}
				url='https://github.com/mahabub81/covid-19-api'
			>
				<Text>Covid 19 Api Github</Text>
			</LinkToWebButton>
			<LinkToWebButton
				button={Button}
				url='https://github.com/kennarddh/covid-19-expo'
			>
				<Text>Github</Text>
			</LinkToWebButton>
			<StatusBar style='auto' />
		</Container>
	)
}

export default registerRootComponent(App)
