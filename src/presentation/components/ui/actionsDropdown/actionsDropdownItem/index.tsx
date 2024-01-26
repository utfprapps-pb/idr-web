import { Text } from '../../text'

import { ActionsDropdownItemProps } from './types'

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
