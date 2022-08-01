import React, { useEffect, useState } from 'react'
import DataTable, { COL_TYPES } from 'react-native-datatable-component'

import { Countries } from '../../Utils/Api'
import FormatCountriesNewUpdateData from '../../Utils/FormatCountriesNewUpdateData'

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
		<DataTable
			data={Data}
			colNames={[
				'displayName',
				'population',
				'lastUpdateAt',
				'totalDeaths',
			]}
			colSettings={[
				{ name: 'displayName', type: COL_TYPES.STRING, width: '20%' },
				{ name: 'population', type: COL_TYPES.INT, width: '20%' },
				{
					name: 'lastUpdateAt',
					type: COL_TYPES.STRING,
					width: '30%',
				},
				{ name: 'totalDeaths', type: COL_TYPES.INT, width: '20%' },
			]}
			noOfPages={1}
			backgroundColor='#d3d3d3' // Table Background Color
			headerLabelStyle={{ color: 'grey', fontSize: 12 }} // Text Style Works
		/>
	)
}

export default CountryLastUpdate
