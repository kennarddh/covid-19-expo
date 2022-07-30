export const WorldTimeSeries = () =>
	new Promise((resolve, reject) =>
		fetch(
			'https://mahabub81.github.io/covid-19-api/api/v1/world-summary-time-series.json'
		)
			.then(response => response.json())
			.then(resolve)
			.catch(reject)
	)

export const WorldSummary = () =>
	new Promise((resolve, reject) =>
		fetch(
			'https://mahabub81.github.io/covid-19-api/api/v1/world-summary.json'
		)
			.then(response => response.json())
			.then(resolve)
			.catch(reject)
	)

export const CountryTimeSeries = countryIso2 =>
	new Promise((resolve, reject) =>
		fetch(
			`https://mahabub81.github.io/covid-19-api/api/v1/countries/${countryIso2}.json`
		)
			.then(response => response.json())
			.then(resolve)
			.catch(reject)
	)

export const CountryStateTimeSeries = (countryIso2, state) =>
	new Promise((resolve, reject) =>
		fetch(
			`https://mahabub81.github.io/covid-19-api/api/v1/states/${countryIso2}/${state}.json`
		)
			.then(response => response.json())
			.then(resolve)
			.catch(reject)
	)
