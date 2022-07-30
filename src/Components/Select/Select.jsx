import React from 'react'
import { Dimensions } from 'react-native'

import SelectDropdown from 'react-native-select-dropdown'

const Select = ({
	data,
	onSelect,
	disabled = false,
	defaultButtonText,
	selectDropdownProps,
}) => {
	return (
		<SelectDropdown
			data={data}
			onSelect={onSelect}
			buttonTextAfterSelection={selectedItem => selectedItem}
			rowTextForSelection={item => item}
			defaultButtonText={defaultButtonText}
			buttonStyle={{
				borderRadius: 15,
				marginHorizontal: 10,
				width: Dimensions.get('window').width * 0.3,
			}}
			selectedRowStyle={{
				backgroundColor: disabled ? '#979797' : '#adadad',
			}}
			dropdownStyle={{
				width: Dimensions.get('window').width * 0.8,
				left: Dimensions.get('window').width * (1 / 2 - 0.8 / 2),
			}}
			searchInputStyle={{
				width: Dimensions.get('window').width * 0.8,
			}}
			search
			disabled={disabled}
			{...selectDropdownProps}
		/>
	)
}

export default Select
