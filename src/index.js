import React from 'react'

import { registerRootComponent } from 'expo'

import { StatusBar } from 'expo-status-bar'

import App from './App'

const Index = () => {
	return (
		<>
			<App />
			<StatusBar style='auto' />
		</>
	)
}

export default registerRootComponent(Index)
