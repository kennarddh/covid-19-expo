import React from 'react'

import { canOpenURL, openURL } from 'expo-linking'

const LinkToWebButton = props => {
	const OnPress = () => {
		canOpenURL(props.url).then(supported => {
			if (supported) {
				openURL(props.url)
			} else {
				console.log(`Don't know how to open URI: ${props.url}`)
			}
		})
	}

	return <props.button onPress={OnPress}>{props.children}</props.button>
}

export default LinkToWebButton
