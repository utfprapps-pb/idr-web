import { TextFieldLabelProps } from './types'
import { Text } from '@/presentation/components/ui'

export const TextFieldLabel: React.FC<TextFieldLabelProps> = ({ label }) => (
	<Text size="b3" color="text">
		{label}
	</Text>
)
