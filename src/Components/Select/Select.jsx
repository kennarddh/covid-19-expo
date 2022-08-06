import React, { useEffect, useState } from 'react'

import DropDownPicker from 'react-native-dropdown-picker'

const Select = ({ data, onSelect, disabled = false, defaultButtonText }) => {
	const [IsOpen, SetIsOpen] = useState(false)
	const [Value, SetValue] = useState(null)
	const [Items, SetItems] = useState([])

	useEffect(() => {
		if (!Value) return

		onSelect(Value)
	}, [Value, onSelect])

	useEffect(() => {
		SetItems(data.map(value => ({ value, label: value })))
	}, [data])

	return (
		<DropDownPicker
			disabled={disabled}
			disabledStyle={{
				opacity: 0.4,
			}}
			placeholder={defaultButtonText}
			searchable
			open={IsOpen}
			setOpen={SetIsOpen}
			items={Items}
			setItems={SetItems}
			setValue={SetValue}
			value={Value}
			listMode='MODAL'
		/>
	)
}

export default Select
