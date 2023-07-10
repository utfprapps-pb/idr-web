import { ChartLineUp } from 'phosphor-react'

import { ROUTES } from './routes'
import { CowIcon } from '@/presentation/components/icons'
import { MenuProps } from '@/presentation/components/navigation'

type Items = MenuProps['Item'][]

export const menuItems = Object.freeze<Items>([
	{
		text: 'Dashboard',
		icon: ChartLineUp,
		to: ROUTES.dashboard.path()
	},
	{
		text: 'Animais',
		icon: CowIcon,
		to: ROUTES.animals.path()
	}
])
