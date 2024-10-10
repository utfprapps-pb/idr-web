import React, { useCallback, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { Button, Sheet, Form, Tabs } from '@/presentation/components/ui'
import { useHookForm } from '@/presentation/hooks'

import { usePropertyContext } from '../../propertyContext'

import { PROPERTY_DEFAULT_VALUES } from './constants'
import {
	GeneralTab,
	CollaboratorsTab,
	TotalAreaTab,
	LocalizationTab,
} from './tabs'
import { type PropertySchema, propertySchema } from './validation'

export const CreatePropertyForm: React.FC = () => {
	const {
		isOpenNewPropertyForm,
		closeNewPropertyForm,
		getAllUsers,
		createProperty,
	} = usePropertyContext()

	const queryClient = useQueryClient()

	const form = useHookForm<PropertySchema>({
		defaultValues: PROPERTY_DEFAULT_VALUES,
		resolver: zodResolver(propertySchema),
	})

	const { reset, handleSubmit: hookFormSubmit } = form

	const [activeTab, setActiveTab] = useState('general')

	const tabs = useMemo(
		() => [
			{
				value: 'general',
				title: 'Dados Gerais',
				component: <GeneralTab form={form} getAllUsers={getAllUsers} />,
			},
			{
				value: 'collaborators',
				title: 'Colaboradores',
				component: <CollaboratorsTab form={form} />,
			},
			{
				value: 'totalArea',
				title: 'Área Total',
				component: <TotalAreaTab form={form} />,
			},
			{
				value: 'localization',
				title: 'Localização',
				component: <LocalizationTab form={form} />,
			},
		],
		[form, getAllUsers]
	)

	const { mutateAsync } = useMutation({
		mutationFn: createProperty.execute,
	})

	const handleSubmit = useCallback(
		async (data: PropertySchema) => {
			try {
				await mutateAsync({ ...data })
				queryClient.invalidateQueries({
					queryKey: ['properties'],
				})
				toast.success('Propriedade foi cadastrada com sucesso')
				reset(PROPERTY_DEFAULT_VALUES)
				closeNewPropertyForm()
			} catch {
				toast.error('Erro ao cadastrar propriedade')
			}
		},
		[closeNewPropertyForm, mutateAsync, queryClient, reset]
	)

	return (
		<Sheet.Root
			open={isOpenNewPropertyForm}
			onOpenChange={closeNewPropertyForm}
		>
			<Sheet.Content className="overflow-y-scroll h-screen" side="right">
				<Sheet.Header>
					<Sheet.Title>Nova Propriedade</Sheet.Title>
					<Sheet.Description>
						Preencha o formulário para criar uma nova propriedade
					</Sheet.Description>
				</Sheet.Header>
				<Form.Provider {...form}>
					<form
						className="flex flex-col h-full gap-8"
						onSubmit={hookFormSubmit(handleSubmit)}
					>
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

						<Sheet.Footer className="pb-8">
							<Button
								type="submit"
								className="w-full"
								disabled={form.buttonDisabled}
							>
								Criar
							</Button>
						</Sheet.Footer>
					</form>
				</Form.Provider>
			</Sheet.Content>
		</Sheet.Root>
	)
}
