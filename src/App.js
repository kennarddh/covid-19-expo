import React, { useState, useEffect, useCallback } from 'react'
import { Text, TextInput } from 'react-native'

import { registerRootComponent } from 'expo'

import { StatusBar } from 'expo-status-bar'

import SelectDropdown from 'react-native-select-dropdown'

import FormatCovid19TimeSeriesData from './Utils/FormatCovid19TimeSeriesData'

import CovidChart from './Components/CovidChart/CovidChart'
import Button from './Components/Button/Button'
import LinkToWebButton from './Components/LinkToWebButton/LinkToWebButton'

import { Iso2CountryName } from './Constants/Iso2CountryName'

import {
	Container,
	DataContainer,
	DataItem,
	DataHeading,
	Title,
} from './Styles'

const App = () => {
	const [TimeSeries, SetTimeSeries] = useState({
		confirmed: [0],
		deaths: [0],
		date: ['No data'],
	})

	const [WorldSummary, SetWorldSummary] = useState({})

	const FetchWorldTimeSeries = () => {
		fetch(
			'https://mahabub81.github.io/covid-19-api/api/v1/world-summary-time-series.json'
		)
			.then(response => response.json())
			.then(data => {
				SetTimeSeries(FormatCovid19TimeSeriesData(data, 30, 3))
			})
			.catch(err => console.log(err))
	}

	const FetchWorldSummary = () => {
		fetch(
			'https://mahabub81.github.io/covid-19-api/api/v1/world-summary.json'
		)
			.then(response => response.json())
			.then(data => {
				SetWorldSummary({
					last_update: data.last_update,
					confirmed: data.confirmed,
					deaths: data.deaths,
				})
			})
			.catch(err => console.log(err))
	}

	const Fetch = useCallback(() => {
		FetchWorldTimeSeries()
		FetchWorldSummary()
	}, [])

	useEffect(() => {
		Fetch()
	}, [Fetch])

	return (
		<Container>
			<Title>Covid 19 - Expo</Title>
			<Button onPress={Fetch}>
				<Text>Fetch Data</Text>
			</Button>
			<SelectDropdown
				data={Object.values(Iso2CountryName)}
				onSelect={(selectedItem, index) => {
					console.log(selectedItem, index)
				}}
				buttonTextAfterSelection={selectedItem => selectedItem}
				rowTextForSelection={item => item}
				defaultButtonText='Country'
				buttonStyle={{
					borderRadius: 15,
				}}
				selectedRowStyle={{
					backgroundColor: '#adadad',
				}}
				search
			/>
			<TextInput value={JSON.stringify(TimeSeries)} />
			<CovidChart covidData={TimeSeries} />
			<DataContainer>
				<DataHeading>Summary</DataHeading>
				<DataItem>Confirmed: {WorldSummary.confirmed || 0}</DataItem>
				<DataItem>Deaths: {WorldSummary.deaths || 0}</DataItem>
				<DataItem>
					Last Updated At: {WorldSummary.last_update || '0000-00-00'}
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
