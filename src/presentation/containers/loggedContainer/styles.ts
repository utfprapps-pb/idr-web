import clsx from 'clsx'

import { StylesProps } from './types'

const container: StylesProps = {
	inline: {
		gridTemplateAreas: `'Header Header'
												'Sidebar Content'`,
		gridTemplateColumns: '325px 1fr',
		gridTemplateRows: '82px 1fr'
	},
	className: clsx`w-screen h-screen grid`
}

const header: StylesProps = {
	inline: {
		gridArea: 'Header'
	},
	className: ''
}

const sidebar: StylesProps = {
	inline: {
		gridArea: 'Sidebar'
	},
	className: clsx`shadow-200 border-r border-slate-200`
}

const content: StylesProps = {
	inline: {
		gridArea: 'Content'
	},
	className: clsx`overflow-y-auto p-10`
}

export const styles = {
	container,
	header,
	sidebar,
	content
}
