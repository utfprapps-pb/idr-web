import { useEffect, useMemo, useState } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

import { DropdownMenu } from '@/presentation/components/ui'
import { useDebounce, useHookForm } from '@/presentation/hooks'

import { GeneralTab } from './tabs/generalTab'

import type { PropertyPageProps } from './types'
import type { PropertyDetailsModel, PropertyModel } from '@/domain/models'
import type { Filters, Sort } from '@/domain/shared/types'
import type { ColumnDef } from '@tanstack/react-table'

const PROPERTY_DEFAULT_VALUES: PropertyDetailsModel = {
	general: {
		name: '',
		producer: '',
		state: '',
		city: '',
		nakedAveragePricePerHectare: '',
		leaseAveragePricePerHectare: '',
		responsibleTechnicians: []
	},
	collaborators: [],
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

export const usePropertyPage = ({
	createProperty,
	updateProperty,
	deleteProperty,
	getProperties,
	getProperty,
	getAllUsers,
	validation
}: PropertyPageProps) => {
	const [isOpenSheet, setIsOpenSheet] = useState(false)
	const [isOpenDelete, setIsOpenDelete] = useState(false)
	const [activeTab, setActiveTab] = useState('general')
	const [filters, setFilters] = useState<Partial<Filters<keyof PropertyModel>>>(
		{
			name: ''
		}
	)
	const [page, setPage] = useState(1)
	const [sort, setSort] = useState<Sort<keyof PropertyModel> | undefined>()
	const [propertyIdToUpdate, setPropertyIdToUpdate] = useState<string | null>(
		null
	)
	const [propertyIdToDelete, setPropertyIdToDelete] = useState<string | null>(
		null
	)

	const debouncedFilters = useDebounce({ value: filters, delayInMs: 1000 })

	const form = useHookForm<PropertyDetailsModel>({
		defaultValues: PROPERTY_DEFAULT_VALUES,
		schemaResolver: (data) => validation.validate({ data })
	})
	const { getValues, reset } = form

	const {
		data: propertyDetails,
		isError: isPropertyDetailsError,
		isLoading: isPropertyDetailsLoading,
		refetch: handleGetPropertyDetails
	} = useQuery({
		queryKey: ['property', propertyIdToUpdate],
		queryFn: async () => {
			if (!propertyIdToUpdate) return undefined
			return getProperty.execute(propertyIdToUpdate)
		},
		enabled: false
	})

	const {
		data: propertiesData,
		isError: isPropertiesError,
		isLoading: isPropertiesLoading
	} = useQuery({
		queryKey: ['properties', { page, ...debouncedFilters, ...sort }],
		queryFn: () =>
			getProperties.execute({
				pagination: { page },
				sort,
				filters: debouncedFilters
			})
	})

	const { mutate: handleSubmit } = useMutation({
		mutationFn: () => {
			const values = getValues()

			return propertyIdToUpdate
				? updateProperty.execute({
						id: propertyIdToUpdate,
						...values
					})
				: createProperty.execute(values)
		},
		onSuccess: () => {
			toast.success(
				`Propriedade ${propertyIdToUpdate ? 'atualizada' : 'criada'} com sucesso`
			)
			setPropertyIdToUpdate(null)
			setIsOpenSheet(false)
		},
		onError: () => {
			toast.error(
				`Não foi possível ${propertyIdToUpdate ? 'atualizar' : 'criar'} a propriedade`
			)
		}
	})

	const { mutate: handleDeleteProperty } = useMutation({
		mutationFn: () => {
			if (!propertyIdToDelete) {
				return Promise.reject(new Error('Not found Property'))
			}

			return deleteProperty.execute(propertyIdToDelete)
		},
		onSuccess: () => {
			toast.success('Propriedade removida com sucesso')
			setPropertyIdToDelete(null)
			setIsOpenDelete(false)
		},
		onError: () => {
			toast.error('Não foi possível remover essa propriedade')
			setPropertyIdToDelete(null)
			setIsOpenDelete(false)
		}
	})

	const { properties, totalPages } = useMemo(
		() => ({
			properties: propertiesData ? propertiesData.resources : [],
			totalPages: propertiesData ? propertiesData.totalPages : 1
		}),
		[propertiesData]
	)

	const propertyToUpdate = useMemo(
		() => properties.find((property) => property.id === propertyIdToUpdate),
		[properties, propertyIdToUpdate]
	)

	const propertyToDelete = useMemo(
		() => properties.find((property) => property.id === propertyIdToDelete),
		[properties, propertyIdToDelete]
	)

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
				component: <GeneralTab form={form} getAllUsers={getAllUsers} />
			},
			{
				value: 'totalArea',
				title: 'Área Total',
				component: <GeneralTab form={form} getAllUsers={getAllUsers} />
			},
			{
				value: 'localization',
				title: 'Localização',
				component: <GeneralTab form={form} getAllUsers={getAllUsers} />
			}
		],
		[form, getAllUsers]
	)

	const columns = useMemo<ColumnDef<PropertyModel>[]>(
		() => [
			{
				accessorKey: 'producer',
				header: 'Produtor'
			},
			{
				accessorKey: 'name',
				header: 'Propriedade'
			},
			{
				accessorKey: 'county',
				header: 'Município',
				accessorFn: ({ county }) => `${county.city} - ${county.state}`
			},
			{
				id: 'row-actions',
				header: '',
				cell: ({ row }) => {
					const { id } = row.original

					return (
						<DropdownMenu.Root key={id}>
							<DropdownMenu.Trigger>
								<MoreHorizontal />
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Item
									className="gap-2"
									onClick={() => setPropertyIdToUpdate(id)}
								>
									<Pencil size={14} /> Editar
								</DropdownMenu.Item>
								<DropdownMenu.Separator />
								<DropdownMenu.Item
									className="gap-2"
									onClick={() => setPropertyIdToDelete(id)}
								>
									<Trash2 size={14} /> Excluir
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					)
				}
			}
		],
		[]
	)

	useEffect(() => {
		if (propertyIdToUpdate) {
			setIsOpenSheet(true)
			handleGetPropertyDetails()
		}
	}, [handleGetPropertyDetails, propertyIdToUpdate])

	useEffect(() => {
		if (propertyIdToDelete) {
			setIsOpenDelete(true)
		}
	}, [propertyIdToDelete])

	useEffect(() => {
		reset(propertyDetails)
	}, [propertyDetails, reset])

	useEffect(() => {
		if (!isOpenSheet) {
			reset(PROPERTY_DEFAULT_VALUES)
			setPropertyIdToUpdate(null)
		}
	}, [isOpenSheet, reset])

	useEffect(() => {
		if (!isOpenDelete) {
			setPropertyIdToDelete(null)
		}
	}, [isOpenDelete])

	useEffect(() => {
		if (isPropertiesError) {
			toast.error('Não foi possível listar as propriedades')
		}
	}, [isPropertiesError])

	useEffect(() => {
		if (isPropertyDetailsError) {
			setPropertyIdToUpdate(null)
			setIsOpenSheet(false)
			toast.error('Não foi possível buscar dados dessa propriedade')
		}
	}, [isPropertyDetailsError])

	return {
		tabs,
		isOpenSheet,
		setIsOpenSheet,
		isOpenDelete,
		setIsOpenDelete,
		activeTab,
		setActiveTab,
		form,
		propertyToDelete,
		propertyToUpdate,
		propertyIdToUpdate,
		columns,
		isPropertyDetailsLoading,
		isPropertiesLoading,
		properties,
		totalPages,
		page,
		setPage,
		sort,
		setSort,
		filters,
		setFilters,
		handleSubmit,
		handleDeleteProperty
	}
}
