import React from 'react'

import { ActionsDropdownItemProps } from './types'
import { Text } from '../../text'

export const ActionsDropdownItem: React.FC<ActionsDropdownItemProps> = ({
	text
}) => (
	<Text
		size="b3"
		color="text"
		styles={{
			cursor: 'pointer'
		}}
	>
		{text}
	</Text>
)
