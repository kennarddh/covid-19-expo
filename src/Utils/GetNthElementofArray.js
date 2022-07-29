const GetNthElementofArray = (array, max) => {
	const maxVal = 3

	const delta = Math.floor(array.length / maxVal)

	const newArray = []

	for (let i = 0; i < array.length; i = i + delta) {
		// eslint-disable-next-line security/detect-object-injection
		newArray.push(array[i])
	}

	return newArray
}

export default GetNthElementofArray
