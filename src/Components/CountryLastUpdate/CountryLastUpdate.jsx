import React, { useEffect, useState } from 'react'

import DataTable, { COL_TYPES } from 'react-native-datatable-component'

import { Countries } from '../../Utils/Api'
import FormatCountriesNewUpdateData from '../../Utils/FormatCountriesNewUpdateData'

import { Container } from './Styles'

const CountryLastUpdate = () => {
	const [Data, SetData] = useState([])

	const FetchCountries = () => {
		Countries()
			.then(data => {
				const result = FormatCountriesNewUpdateData(data).map(item => ({
					Population: item.population,
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

	return (
		<Container>
			<DataTable
				data={Data}
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
