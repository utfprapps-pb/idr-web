import { Text } from '@/presentation/components/ui'

import { TextFieldLabelProps } from './types'

export const TextFieldLabel: React.FC<TextFieldLabelProps> = ({ label }) => (
	<Text size="b3" color="text">
		{label}
	</Text>
)
