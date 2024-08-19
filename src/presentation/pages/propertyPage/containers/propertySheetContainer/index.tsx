import React from 'react'

import {
	Loading,
	Button,
	Tabs,
	Form,
	Sheet
} from '@/presentation/components/ui'

import { usePropertySheetContainer } from './usePropertySheetContainer'

import type { PropertySheetContainerProps } from './types'

export const PropertySheetContainer: React.FC<PropertySheetContainerProps> = (
	props
) => {
	const { property, open, onOpen } = props

	const {
		tabs,
		form,
		activeTab,
		setActiveTab,
		handleSubmit,
		isPropertyDetailsLoading
	} = usePropertySheetContainer(props)

	return (
		<Sheet.Root open={open} onOpenChange={onOpen}>
			<Sheet.Content className="overflow-y-scroll h-screen" side="right">
				<Sheet.Header>
					<Sheet.Title>
						{property?.id
							? `Atualizar Propriedade ${property?.name}`
							: 'Nova Propriedade'}
					</Sheet.Title>
					<Sheet.Description>{`Preencha o formulário para ${property?.id ? 'atualizar a' : 'criar uma nova'} propriedade`}</Sheet.Description>
				</Sheet.Header>
				<Form.Provider {...form}>
					<form
						className="flex flex-col h-full gap-8"
						onSubmit={form.handleSubmit(() => handleSubmit())}
					>
						{isPropertyDetailsLoading ? (
							<div className="flex justify-center h-full items-center">
								<Loading size="lg" />
							</div>
						) : (
							<Tabs.Root defaultValue="general">
								<Tabs.List>
									{tabs.map((tab) => (
										<Tabs.Trigger
											key={tab.value}
											value={tab.value}
											onClick={() => setActiveTab(tab.value)}
										>
											{tab.title}
										</Tabs.Trigger>
									))}
								</Tabs.List>
								<Tabs.Content value={activeTab} className="flex flex-col gap-6">
									{tabs.find((tab) => tab.value === activeTab)?.component}
								</Tabs.Content>
							</Tabs.Root>
						)}

						{!form.formState.isLoading && (
							<Sheet.Footer className="pb-8">
								<Button type="submit" className="w-full">
									{' '}
									Salvar
								</Button>
							</Sheet.Footer>
						)}
					</form>
				</Form.Provider>
			</Sheet.Content>
		</Sheet.Root>
	)
}
