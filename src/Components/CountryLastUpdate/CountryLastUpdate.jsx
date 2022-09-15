import React, { useEffect, useMemo, useState } from 'react'

import { Text } from 'react-native'

// eslint-disable-next-line import/named, import/default
import DataTable, { COL_TYPES } from 'react-native-datatable-component'

import Button from '../Button/Button'

import { Countries } from '../../Utils/Api'
import FormatCountriesNewUpdateData from '../../Utils/FormatCountriesNewUpdateData'

import { Container } from './Styles'

const CountryLastUpdate = () => {
	const [Data, SetData] = useState([])
	const [IsSortedAscending, SetIsSortedAscending] = useState(true)
	const [SortType, SetSortType] = useState('Country / State')

	const FetchCountries = () => {
		Countries()
			.then(data => {
				const result = FormatCountriesNewUpdateData(data).map(item => ({
					Population: item.population || 0,
					'Country / State': item.displayName,
					lastUpdateAt: item.lastUpdateAt,
					'Total Deaths': item.totalDeaths,
					provinceState: item.provinceState,
					iso2: item.iso2,
					countryRegion: item.countryRegion,
				}))

				SetData(result)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		FetchCountries()
	}, [])

	const ChangeSortType = type => {
		if (SortType === type) return SetIsSortedAscending(prev => !prev)

		SetSortType(type)
	}

	const Preview = useMemo(() => {
		return [...Data].sort((a, b) => {
			let result

			if (SortType === 'Country / State') {
				// eslint-disable-next-line security/detect-object-injection
				result = b[SortType].localeCompare(a[SortType])
			} else {
				// eslint-disable-next-line security/detect-object-injection
				result = b[SortType] - a[SortType]
			}

			if (IsSortedAscending) return result * -1

			return result
		})
	}, [Data, IsSortedAscending, SortType])

	return (
		<Container>
			<Button
				onPress={() => ChangeSortType('Total Deaths')}
				style={{ backgroundColor: '#ffffff' }}
			>
				<Text style={{ textAlign: 'center' }}>
					Sort Total Deaths{' '}
					{IsSortedAscending ? 'Descending' : 'Ascending'}
				</Text>
			</Button>
			<Button
				onPress={() => ChangeSortType('Population')}
				style={{ backgroundColor: '#ffffff' }}
			>
				<Text style={{ textAlign: 'center' }}>
					Sort Population{' '}
					{IsSortedAscending ? 'Descending' : 'Ascending'}
				</Text>
			</Button>
			<Button
				onPress={() => ChangeSortType('Country / State')}
				style={{ backgroundColor: '#ffffff' }}
			>
				<Text style={{ textAlign: 'center' }}>
					Sort Country / State'{' '}
					{IsSortedAscending ? 'Descending' : 'Ascending'}
				</Text>
			</Button>
			<DataTable
				doSort={false}
				data={Preview}
				colNames={['Country / State', 'Population', 'Total Deaths']}
				colSettings={[
					{
						name: 'Country / State',
						type: COL_TYPES.STRING,
						width: '40%',
					},
					{
						name: 'Population',
						type: COL_TYPES.INT,
						width: '30%',
					},
					{
						name: 'Total Deaths',
						type: COL_TYPES.INT,
						width: '30%',
					},
				]}
				noOfPages={Data.length / 10}
				backgroundColor='#d3d3d3' // Table Background Color
				headerLabelStyle={{ color: 'grey', fontSize: 12 }} // Text Style Works
			/>
		</Container>
	)
}

export default CountryLastUpdate
