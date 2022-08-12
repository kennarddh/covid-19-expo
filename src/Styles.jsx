import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

export const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: 50px 0;
`

export const Title = styled.Text`
	font-weight: bold;
	font-size: 30px;
`

export const RowContainer = styled.View`
	display: flex;
	justify-content: center;
	align-items: center;

	flex-direction: row;

	width: ${Dimensions.get('window').width}px;
`

export const ColumnContainer = styled.View`
	display: flex;
	justify-content: center;
	align-items: center;

	flex-direction: column;
`
