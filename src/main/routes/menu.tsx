import { ChartLineUp } from 'phosphor-react'

import { CowIcon } from '@/presentation/components/icons'
import { MenuProps } from '@/presentation/components/navigation'

import { PAGE_PATHS } from './paths'

type Items = MenuProps['Item'][]

export const menuItems = Object.freeze<Items>([
	{
		text: 'Dashboard',
		icon: ChartLineUp,
		to: PAGE_PATHS.dashboard
	},
	{
		text: 'Animais',
		icon: CowIcon,
		to: PAGE_PATHS.animals
	}
])
