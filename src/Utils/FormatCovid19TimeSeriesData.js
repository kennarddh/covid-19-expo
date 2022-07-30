import GetNthElementofArray from './GetNthElementofArray'

const FormatCovid19TimeSeriesData = (data, numData = 30, numDate = 3) => {
	const sorted = data.sort((a, b) => {
		return new Date(a.date) - new Date(b.date)
	}) // Sort data ascending

	const result = sorted.reduce(
		(acc, value) => ({
			confirmed: [
				...acc.confirmed,
				value.confirmed - acc.total.confirmed,
			],
			deaths: [...acc.deaths, value.deaths - acc.total.deaths],
			date: [...acc.date, value.date],
			total: {
				confirmed: value.confirmed,
				deaths: value.deaths,
			},
		}),
		{
			confirmed: [],
			deaths: [],
			date: [],
			total: { confirmed: 0, deaths: 0 },
		}
	)

	return {
		confirmed: result.confirmed.slice(-numData), // Get last n data
		deaths: result.deaths.slice(-numData), // Get last n data
		date: GetNthElementofArray(result.date.slice(-numData), numDate),
		fullDate: result.date.slice(-numData),
	}
}

export default FormatCovid19TimeSeriesData
