import React, { useState, useEffect, useCallback } from 'react'
import { Text, TextInput, SafeAreaView, ScrollView } from 'react-native'

import FormatCovid19TimeSeriesData from './Utils/FormatCovid19TimeSeriesData'

import CovidChart from './Components/CovidChart/CovidChart'
import Button from './Components/Button/Button'
import LinkToWebButton from './Components/LinkToWebButton/LinkToWebButton'
import Select from './Components/Select/Select'
import WorldSummary from './Components/WorldSummary/WorldSummary'
import CountryLastUpdate from './Components/CountryLastUpdate/CountryLastUpdate'

import { Iso2CountryName, CountryNameIso2 } from './Constants/Iso2CountryName'
import Covid19ApiSupportedCountries from './Constants/Covid19ApiSupportedCountries'
import States from './Constants/States'

import {
	WorldTimeSeries,
	CountryTimeSeries,
	CountryStateTimeSeries,
} from './Utils/Api'

import { Container, Title, RowContainer, ColumnContainer } from './Styles'

const App = () => {
	const [TimeSeries, SetTimeSeries] = useState({
		confirmed: [0],
		deaths: [0],
		date: ['No data'],
	})

	const [SelectedCountryIso2, SetSelectedCountryIso2] = useState('')
	const [ChartType, SetChartType] = useState('Both')

	const FetchWorldTimeSeries = useCallback(() => {
		WorldTimeSeries()
			.then(data => {
				SetTimeSeries(FormatCovid19TimeSeriesData(data))
			})
			.catch(err => console.log(err))
	}, [])

	const FetchCountryTimeSeries = useCallback(countryIso2 => {
		CountryTimeSeries(countryIso2)
			.then(data => {
				SetTimeSeries(
					FormatCovid19TimeSeriesData(data, {
						dateKey: 'last_updated_at',
					})
				)
			})
			.catch(err => console.log(err))
	}, [])

	const FetchCountryStateTimeSeries = useCallback((countryIso2, state) => {
		CountryStateTimeSeries(countryIso2, state)
			.then(data => {
				SetTimeSeries(
					FormatCovid19TimeSeriesData(data, {
						dateKey: 'last_updated_at',
					})
				)
			})
			.catch(err => console.log(err))
	}, [])

	const OnSelectCountry = useCallback(
		countryName => {
			if (countryName === 'World') {
				FetchWorldTimeSeries()

				return
			}

			if (!Object.values(Iso2CountryName).includes(countryName)) return
			if (Covid19ApiSupportedCountries.includes(countryName)) return

			// eslint-disable-next-line security/detect-object-injection
			const countryIso2 = CountryNameIso2[countryName]

			SetSelectedCountryIso2(countryIso2)

			FetchCountryTimeSeries(countryIso2)
		},
		[FetchCountryTimeSeries, FetchWorldTimeSeries]
	)

	const OnSelectState = useCallback(
		state => {
			if (!Object.keys(States).includes(SelectedCountryIso2)) return
			// eslint-disable-next-line security/detect-object-injection
			if (!States[SelectedCountryIso2].includes(state)) return

			FetchCountryStateTimeSeries(SelectedCountryIso2, state)
		},
		[FetchCountryStateTimeSeries, SelectedCountryIso2]
	)

	const OnSelectChartType = useCallback(type => {
		SetChartType(type)
	}, [])

	const Fetch = useCallback(() => {
		FetchWorldTimeSeries()
	}, [FetchWorldTimeSeries])

	useEffect(() => {
		Fetch()
	}, [Fetch])

	return (
		<SafeAreaView>
			<ScrollView>
				<Container>
					<Title>Covid 19 - Expo</Title>
					<Button onPress={Fetch}>
						<Text>Fetch Data</Text>
					</Button>
					<ColumnContainer>
						<Select
							data={[
								'World',
								...Object.values(Iso2CountryName).filter(
									value =>
										Covid19ApiSupportedCountries.includes(
											CountryNameIso2[value] // eslint-disable-line security/detect-object-injection
										)
								),
							]}
							onSelect={OnSelectCountry}
							defaultButtonText='Country'
							selectDropdownProps={{
								defaultValueByIndex: 0,
							}}
						/>
						<Select
							data={
								!Object.keys(States).includes(
									SelectedCountryIso2
								)
									? []
									: States[SelectedCountryIso2] // eslint-disable-line security/detect-object-injection
							}
							disabled={
								!Object.keys(States).includes(
									SelectedCountryIso2
								)
							}
							onSelect={OnSelectState}
							defaultButtonText='State'
							selectDropdownProps={{
								buttonTextAfterSelection: selectedItem =>
									selectedItem.split('-').join(' '),
								rowTextForSelection: item =>
									item.split('-').join(' '),
							}}
						/>
						<Select
							data={['Both', 'Deaths', 'Confirmed']}
							onSelect={OnSelectChartType}
							defaultButtonText='Chart Type'
							selectDropdownProps={{
								defaultValueByIndex: 0,
							}}
						/>
					</ColumnContainer>
					<TextInput value={JSON.stringify(TimeSeries)} />
					<CovidChart
						covidData={TimeSeries}
						showDeaths={
							ChartType === 'Both' || ChartType === 'Deaths'
						}
						showConfirmed={
							ChartType === 'Both' || ChartType === 'Confirmed'
						}
					/>
					<WorldSummary />
					<CountryLastUpdate />
					<RowContainer>
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
					</RowContainer>
				</Container>
			</ScrollView>
		</SafeAreaView>
	)
}

export default App
