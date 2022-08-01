const FormatCountriesNewUpdateData = data => {
	const newData = []

	data.forEach(country => {
		newData.push({
			population: country.population,
			displayName: country.combined_key,
			lastUpdateAt: country.latest.last_update_at,
			totalDeaths: country.latest.deaths,
			provinceState: country.province_state,
			iso2: country.iso2,
			country_region: country.country_region,
		})

		country.states.forEach(state => {
			newData.push({
				population: state.population,
				displayName: state.combined_key,
				lastUpdateAt: state.latest.last_update_at,
				totalDeaths: state.latest.deaths,
				provinceState: state.province_state,
				iso2: state.iso2,
				country_region: state.country_region,
			})
		})
	})

	return newData
}

export default FormatCountriesNewUpdateData
