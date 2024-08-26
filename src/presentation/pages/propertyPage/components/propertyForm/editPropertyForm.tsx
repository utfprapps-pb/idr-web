import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import {
	Button,
	Form,
	Tabs,
	Loading,
	Sheet
} from '@/presentation/components/ui'
import { useHookForm } from '@/presentation/hooks'

import { useProperty } from '../../hooks/useProperty'
import { usePropertyContext } from '../../propertyContext'

import { PROPERTY_DEFAULT_VALUES } from './constants'
import { GeneralTab, CollaboratorsTab, TotalAreaTab } from './tabs'
import { type PropertySchema, propertySchema } from './validation'

export const EditPropertyForm: React.FC = () => {
	const {
		isOpenEditPropertyForm,
		closeEditPropertyForm,
		propertySelected,
		getAllUsers,
		getProperty,
		updateProperty
	} = usePropertyContext()

	const { isLoading, property } = useProperty({
		id: propertySelected!.id,
		getProperty
	})

	const queryClient = useQueryClient()

	const form = useHookForm<PropertySchema>({
		defaultValues: PROPERTY_DEFAULT_VALUES,
		resolver: zodResolver(propertySchema)
	})

	const { reset, handleSubmit: hookFormSubmit } = form

	const [activeTab, setActiveTab] = useState('general')

	const tabs = useMemo(
		() => [
			{
				value: 'general',
				title: 'Dados Gerais',
				component: <GeneralTab form={form} getAllUsers={getAllUsers} />
			},
			{
				value: 'collaborators',
				title: 'Colaboradores',
				component: <CollaboratorsTab form={form} />
			},
			{
				value: 'totalArea',
				title: 'Área Total',
				component: <TotalAreaTab form={form} />
			},
			{
				value: 'localization',
				title: 'Localização',
				component: <GeneralTab form={form} getAllUsers={getAllUsers} />
			}
		],
		[form, getAllUsers]
	)

	const { mutateAsync } = useMutation({
		mutationFn: updateProperty.execute
	})

	const handleSubmit = useCallback(
		async (data: PropertySchema) => {
			try {
				await mutateAsync({ ...data, id: propertySelected!.id })
				queryClient.invalidateQueries({
					queryKey: ['properties']
				})
				toast.success('Propriedade foi editada com sucesso')
				reset(PROPERTY_DEFAULT_VALUES)
				closeEditPropertyForm()
			} catch {
				toast.error('Erro ao salvar alterações')
			}
		},
		[closeEditPropertyForm, mutateAsync, propertySelected, queryClient, reset]
	)

	useEffect(() => {
		if (property) {
			reset(property)
		}
	}, [property, reset])

	return (
		<Sheet.Root
			open={isOpenEditPropertyForm}
			onOpenChange={closeEditPropertyForm}
		>
			<Sheet.Content className="overflow-y-scroll h-screen" side="right">
				<Sheet.Header>
					<Sheet.Title>{`Editar Propriedade ${propertySelected?.name}`}</Sheet.Title>
					<Sheet.Description>
						Preencha o formulário para editar a propriedade
					</Sheet.Description>
				</Sheet.Header>
				<Form.Provider {...form}>
					<form
						className="flex flex-col h-full gap-8"
						onSubmit={hookFormSubmit(handleSubmit)}
					>
						{isLoading ? (
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

						<Sheet.Footer className="pb-8">
							<Button
								type="submit"
								className="w-full"
								disabled={form.buttonDisabled}
							>
								Salvar
							</Button>
						</Sheet.Footer>
					</form>
				</Form.Provider>
			</Sheet.Content>
		</Sheet.Root>
	)
}
