import { useCallback, useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

import { moneyMask } from '@/masker'
import { Input, Form, Combobox, Button } from '@/presentation/components/ui'
import { useDebounce } from '@/presentation/hooks'

import type { GeneralTabProps } from './types'

export const GeneralTab: React.FC<GeneralTabProps> = ({
	form,
	getAllUsers
}) => {
	const { control, getValues, setValue } = form
	const [search, setSearch] = useState('')
	const debouncedSearch = useDebounce({ value: search, delayInMs: 1000 })

	const handleRemoveTechnician = useCallback(
		(value: string) => {
			const technicians = getValues('general.responsibleTechnicians')

			setValue(
				'general.responsibleTechnicians',
				technicians.filter((technician) => technician.value !== value)
			)
		},
		[getValues, setValue]
	)

	const {
		data: allUsersData = [],
		isError,
		isLoading
	} = useQuery({
		queryKey: ['technicians', debouncedSearch],
		queryFn: () => getAllUsers.execute(debouncedSearch)
	})

	useEffect(() => {
		if (isError) {
			toast.error('Erro ao buscar técnicos')
		}
	}, [isError])

	return (
		<>
			<Form.Field
				key="general.name"
				name="general.name"
				control={control}
				render={({ field, fieldState }) => {
					const { error } = fieldState

					return (
						<Form.Item>
							<Form.Label>Nome da Propriedade</Form.Label>
							<Form.Control>
								<Input {...field} isError={!!error?.message} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)
				}}
			/>
			<Form.Field
				key="general.city"
				name="general.city"
				control={control}
				render={({ field, fieldState }) => {
					const { error } = fieldState

					return (
						<Form.Item>
							<Form.Label>Município</Form.Label>
							<Form.Control>
								<Input {...field} isError={!!error?.message} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)
				}}
			/>
			<Form.Field
				key="general.producer"
				name="general.producer"
				control={control}
				render={({ field, fieldState }) => {
					const { error } = fieldState

					return (
						<Form.Item>
							<Form.Label>Produtor</Form.Label>
							<Form.Control>
								<Input {...field} isError={!!error?.message} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)
				}}
			/>
			<Form.Field
				key="general.nakedAveragePricePerHectare"
				name="general.nakedAveragePricePerHectare"
				control={control}
				render={({ field, fieldState }) => {
					const { error } = fieldState

					return (
						<Form.Item>
							<Form.Label>Preço médio da terra nua (R$/ha)</Form.Label>
							<Form.Control>
								<Input {...field} isError={!!error?.message} mask={moneyMask} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)
				}}
			/>
			<Form.Field
				key="general.leaseAveragePricePerHectare"
				name="general.leaseAveragePricePerHectare"
				control={control}
				render={({ field, fieldState }) => {
					const { error } = fieldState

					return (
						<Form.Item>
							<Form.Label>
								Valor médio de arrendamento para pecuária na região (R$/ha/ano)
							</Form.Label>
							<Form.Control>
								<Input {...field} isError={!!error?.message} mask={moneyMask} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)
				}}
			/>
			<Form.Field
				key="general.responsibleTechnicians"
				name="general.responsibleTechnicians"
				control={control}
				render={({ field, fieldState }) => {
					const { value: technicians } = field
					const nonEmptyTechnicians = technicians.filter(
						(technician) => technician.value
					)
					const { error } = fieldState

					return (
						<Form.Item>
							<Form.Label>Técnicos responsáveis </Form.Label>
							<Form.Control>
								<div className="flex flex-col gap-2">
									{technicians.map((technician) => (
										<div className="flex gap-2">
											<Combobox
												key={technician.value}
												search={search}
												items={allUsersData}
												loading={isLoading}
												selected={technician}
												handleSearch={(value) => setSearch(value)}
												handleSelect={(selectedTechnician) =>
													setValue('general.responsibleTechnicians', [
														...nonEmptyTechnicians,
														selectedTechnician
													])
												}
												isError={!!error?.message}
											/>

											<Button
												variant="outline"
												size="icon"
												type="button"
												onClick={() => handleRemoveTechnician(technician.value)}
											>
												<Trash2 className="text-destructive" />
											</Button>
										</div>
									))}

									<Form.Message />

									<Button
										variant="outline"
										type="button"
										onClick={() => {
											const addedTechnicians = getValues(
												'general.responsibleTechnicians'
											)
											const hasEmptyTechnician = addedTechnicians.some(
												(technician) => !technician.value
											)

											if (hasEmptyTechnician) {
												toast.error(
													'Selecione um técnico antes de adicionar outro'
												)
												return
											}

											setValue('general.responsibleTechnicians', [
												...addedTechnicians,
												{
													label: '',
													value: ''
												}
											])
										}}
									>
										<Plus /> Adicionar novo técnico
									</Button>
								</div>
							</Form.Control>
						</Form.Item>
					)
				}}
			/>
		</>
	)
}
