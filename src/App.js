import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native' // eslint-disable-line import/namespace

const App = () => {
	return (
		<View>
			<Text>Open up App.js to start working on your app!</Text>
			<StatusBar style='auto' />
		</View>
	)
}

export default registerRootComponent(App)
