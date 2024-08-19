import { useEffect, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { useHookForm } from '@/presentation/hooks'

import { CollaboratorsTab, GeneralTab, TotalAreaTab } from './tabs'
import { propertySchema } from './validation'

import type { PropertySchema, PropertySheetContainerProps } from './types'

const PROPERTY_DEFAULT_VALUES: PropertySchema = {
	general: {
		name: '',
		producer: '',
		state: '',
		city: '',
		nakedAveragePricePerHectare: '',
		leaseAveragePricePerHectare: '',
		responsibleTechnicians: [{ value: '', label: '' }]
	},
	collaborators: [
		{
			name: '',
			hoursPerDay: ''
		}
	],
	totalArea: {
		dairyCattleFarming: '',
		perennialPasture: '',
		summerPlowing: '',
		winterPlowing: ''
	},
	localization: {
		latitude: '',
		longitude: '',
		images: []
	}
}

export const usePropertySheetContainer = ({
	createProperty,
	property,
	updateProperty,
	getAllUsers,
	getProperty,
	onOpen
}: PropertySheetContainerProps) => {
	const queryClient = useQueryClient()

	const form = useHookForm<PropertySchema>({
		defaultValues: PROPERTY_DEFAULT_VALUES,
		resolver: zodResolver(propertySchema)
	})

	const { getValues, reset } = form

	const {
		isError: isPropertyDetailsError,
		isLoading: isPropertyDetailsLoading
	} = useQuery({
		queryKey: ['property', property?.id],
		queryFn: async () => {
			if (!property?.id) {
				toast.error('Não foi possível buscar a propriedade')
				return
			}

			const data = await getProperty.execute(property.id)
			reset(data)
		},
		enabled: !!property?.id
	})

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

	const { mutate: handleSubmit } = useMutation({
		mutationFn: () => {
			const values = getValues()

			return property?.id
				? updateProperty.execute({
						id: property?.id,
						...values
					})
				: createProperty.execute(values)
		},
		onSuccess: () => {
			toast.success(
				`Propriedade ${property?.id ? 'atualizada' : 'criada'} com sucesso`
			)
			queryClient.invalidateQueries({
				queryKey: ['properties']
			})
			onOpen(false)
		},
		onError: () => {
			toast.error(
				`Não foi possível ${property?.id ? 'atualizar' : 'criar'} a propriedade`
			)
		}
	})

	useEffect(() => {
		if (isPropertyDetailsError) {
			toast.error('Erro ao buscar dados da propriedade')
		}
	}, [isPropertyDetailsError])

	return {
		tabs,
		form,
		activeTab,
		setActiveTab,
		handleSubmit,
		isPropertyDetailsLoading
	}
}
