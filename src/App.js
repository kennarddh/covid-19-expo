import React, { useState, useEffect, useCallback } from 'react'
import { Text, TextInput } from 'react-native'

import { registerRootComponent } from 'expo'

import { StatusBar } from 'expo-status-bar'

import FormatCovid19TimeSeriesData from './Utils/FormatCovid19TimeSeriesData'

import CovidChart from './Components/CovidChart/CovidChart'
import Button from './Components/Button/Button'
import LinkToWebButton from './Components/LinkToWebButton/LinkToWebButton'
import Select from './Components/Select/Select'

import { Iso2CountryName, CountryNameIso2 } from './Constants/Iso2CountryName'
import Covid19ApiSupportedCountries from './Constants/Covid19ApiSupportedCountries'
import States from './Constants/States'

import {
	WorldTimeSeries,
	WorldSummary as WorldSummaryApi,
	CountryTimeSeries,
	CountryStateTimeSeries,
} from './Utils/Api'

import {
	Container,
	DataContainer,
	DataItem,
	DataHeading,
	Title,
	RowContainer,
} from './Styles'

const App = () => {
	const [TimeSeries, SetTimeSeries] = useState({
		confirmed: [0],
		deaths: [0],
		date: ['No data'],
	})

	const [SelectedCountryIso2, SetSelectedCountryIso2] = useState('')

	const [WorldSummary, SetWorldSummary] = useState({})

	const FetchWorldTimeSeries = () => {
		WorldTimeSeries()
			.then(data => {
				SetTimeSeries(FormatCovid19TimeSeriesData(data))
			})
			.catch(err => console.log(err))
	}

	const FetchWorldSummary = () => {
		WorldSummaryApi()
			.then(data => {
				SetWorldSummary({
					last_update: data.last_update,
					confirmed: data.confirmed,
					deaths: data.deaths,
				})
			})
			.catch(err => console.log(err))
	}

	const FetchCountryTimeSeries = countryIso2 => {
		CountryTimeSeries(countryIso2)
			.then(data => {
				SetTimeSeries(
					FormatCovid19TimeSeriesData(data, {
						dateKey: 'last_updated_at',
					})
				)
			})
			.catch(err => console.log(err))
	}

	const FetchCountryStateTimeSeries = (countryIso2, state) => {
		CountryStateTimeSeries(countryIso2, state)
			.then(data => {
				SetTimeSeries(
					FormatCovid19TimeSeriesData(data, {
						dateKey: 'last_updated_at',
					})
				)
			})
			.catch(err => console.log(err))
	}

	const OnSelectCountry = countryName => {
		if (!Object.values(Iso2CountryName).includes(countryName)) return
		if (Covid19ApiSupportedCountries.includes(countryName)) return

		// eslint-disable-next-line security/detect-object-injection
		const countryIso2 = CountryNameIso2[countryName]

		SetSelectedCountryIso2(countryIso2)

		FetchCountryTimeSeries(countryIso2)
	}

	const OnSelectState = state => {
		if (!Object.keys(States).includes(SelectedCountryIso2)) return
		// eslint-disable-next-line security/detect-object-injection
		if (!States[SelectedCountryIso2].includes(state)) return

		FetchCountryStateTimeSeries(SelectedCountryIso2, state)
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
			<RowContainer>
				<Select
					data={Object.values(Iso2CountryName).filter(value =>
						Covid19ApiSupportedCountries.includes(
							CountryNameIso2[value] // eslint-disable-line security/detect-object-injection
						)
					)}
					onSelect={OnSelectCountry}
					defaultButtonText='Country'
				/>
				<Select
					data={
						!Object.keys(States).includes(SelectedCountryIso2)
							? []
							: States[SelectedCountryIso2] // eslint-disable-line security/detect-object-injection
					}
					disabled={
						!Object.keys(States).includes(SelectedCountryIso2)
					}
					onSelect={OnSelectState}
					defaultButtonText='State'
					selectDropdownProps={{
						buttonTextAfterSelection: selectedItem =>
							selectedItem.split('-').join(' '),
						rowTextForSelection: item => item.split('-').join(' '),
					}}
				/>
			</RowContainer>
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
