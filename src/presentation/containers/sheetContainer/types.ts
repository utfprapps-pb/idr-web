import type { ReactNode } from 'react'

import { useHookForm } from '@/presentation/hooks'

import type { FieldValues } from 'react-hook-form'

type FooterButton = {
	key: string
	component: React.ReactNode
	isCloser?: boolean
}

export type SheetContainerProps<TValues extends FieldValues> = {
	buttonAddText: string
	title: string
	description: string
	loading: boolean
	form: ReturnType<typeof useHookForm<TValues>>
	footerButtons: FooterButton[]
	open: boolean
	onOpenChange: (open: boolean) => void
	renderData: () => ReactNode
	handleSubmit: () => void
}
