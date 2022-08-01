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
				SetData(FormatCountriesNewUpdateData(data))
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
				colNames={['displayName', 'population', 'totalDeaths']}
				colSettings={[
					{
						name: 'displayName',
						type: COL_TYPES.STRING,
						width: '40%',
					},
					{
						name: 'population',
						type: COL_TYPES.INT,
						width: '30%',
					},
					{
						name: 'totalDeaths',
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
