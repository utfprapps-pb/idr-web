import { useState } from 'react'

import { Meta, StoryFn } from '@storybook/react/'
import { FileTextIcon, Home, Info, Trees } from 'lucide-react'

import { Sidebar } from '.'

type Keys = 'inicio' | 'propriedades' | 'cadastros-gerais' | 'relatorios'

export default {
	title: 'Components/UI/Sidebar'
} as Meta

const Template: StoryFn = () => {
	const items = [
		{
			key: 'inicio',
			icon: <Home />,
			text: 'Início'
		},
		{
			key: 'propriedades',
			icon: <Trees />,
			text: 'Propriedades'
		},
		{
			key: 'cadastros-gerais',
			icon: <Info />,
			text: 'Cadastros Gerais'
		},
		{
			key: 'relatorios',
			icon: <FileTextIcon />,
			text: 'Relatórios'
		}
	]

	const [active, setActive] = useState<Keys>('inicio')

	const renderItems = (value: (typeof items)[0]) => (
		<Sidebar.Item
			key={value.key}
			active={active === value.key}
			onClick={() => setActive(value.key as Keys)}
		>
			{value.icon} {value.text}
		</Sidebar.Item>
	)

	return (
		<Sidebar.Root>
			<Sidebar.List>{items.map(renderItems)}</Sidebar.List>
		</Sidebar.Root>
	)
}

export const Default = Template.bind({})
