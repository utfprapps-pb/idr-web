import { Text } from '@/presentation/components/ui'

type MenuItemTextProps = {
	text: string
}

export const MenuItemText: React.FC<MenuItemTextProps> = ({ text }) => (
	<Text color="lightgray" size="b2">
		{text}
	</Text>
)
