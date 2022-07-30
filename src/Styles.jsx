import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`

export const DataContainer = styled.View`
	background-color: #d3d3d3;

	display: flex;
	justify-content: flex-start;
	align-items: center;

	padding: 20px;
	margin: 10px 0;

	width: 80%;

	border-radius: 15px;
`

export const DataItem = styled.Text`
	margin: 10px 0;
`

export const DataHeading = styled(DataItem)`
	font-size: 20px;
	font-weight: bold;
`

export const Title = styled.Text`
	font-weight: bold;
	font-size: 30px;
`

export const DropdownContainer = styled.View`
	display: flex;
	justify-content: center;
	align-items: center;

	flex-direction: row;
`
