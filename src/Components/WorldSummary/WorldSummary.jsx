import React, { useState, useEffect, useCallback } from 'react'

import { WorldSummary as WorldSummaryApi } from '../../Utils/Api'

import { DataContainer, DataItem, DataHeading } from './Styles'

const WorldSummary = () => {
	const [Data, SetData] = useState({})

	const FetchWorldSummary = useCallback(() => {
		WorldSummaryApi()
			.then(data => {
				SetData({
					last_update: data.last_update,
					confirmed: data.confirmed,
					deaths: data.deaths,
				})
			})
			.catch(err => console.log(err))
	}, [])

	useEffect(() => {
		FetchWorldSummary()
	}, [FetchWorldSummary])

	return (
		<DataContainer>
			<DataHeading>Summary</DataHeading>
			<DataItem>Confirmed: {Data.confirmed || 0}</DataItem>
			<DataItem>Deaths: {Data.deaths || 0}</DataItem>
			<DataItem>
				Last Updated At: {Data.last_update || '0000-00-00'}
			</DataItem>
		</DataContainer>
	)
}

export default WorldSummary
