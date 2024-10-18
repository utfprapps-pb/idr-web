import { useCallback } from 'react'

import { Plus, Trash2 } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'

import type { TabProps } from './types'

import { Button, Form, Input } from '@/presentation/components/ui'

export const CollaboratorsTab: React.FC<TabProps> = ({ form }) => {
	const { control } = form
	const { fields, append, remove } = useFieldArray({
		name: 'collaborators',
		control,
	})

	const handleAddCollaborator = useCallback(
		() =>
			append({
				name: '',
				hoursPerDay: '',
			}),
		[append]
	)

	return (
		<div className="flex flex-col gap-3">
			{fields.map((field, index) => (
				<div key={field.id} className="flex gap-2">
					<Form.Field
						name={`collaborators.${index}.name`}
						control={control}
						render={({ field, fieldState }) => {
							const { error } = fieldState

							return (
								<Form.Item>
									<Form.Label>Nome</Form.Label>
									<Form.Control>
										<Input {...field} isError={!!error?.message} />
									</Form.Control>
									<Form.Message />
								</Form.Item>
							)
						}}
					/>

					<Form.Field
						name={`collaborators.${index}.hoursPerDay`}
						control={control}
						render={({ field, fieldState }) => {
							const { error } = fieldState

							return (
								<Form.Item>
									<Form.Label>Horas/Dia</Form.Label>
									<Form.Control>
										<div className="flex gap-3">
											<Input {...field} isError={!!error?.message} />
											<Button
												variant="outline"
												size="icon"
												type="button"
												onClick={() => remove(index)}
											>
												<Trash2 className="text-destructive" />
											</Button>
										</div>
									</Form.Control>
									<Form.Message />
								</Form.Item>
							)
						}}
					/>
				</div>
			))}

			<Button variant="outline" type="button" onClick={handleAddCollaborator}>
				<Plus /> Adicionar colaborador
			</Button>
		</div>
	)
}
