import { FieldPath, FieldValues } from 'react-hook-form'

import { Form, Input, type InputProps } from '@/presentation/components/ui'
import { useHookForm } from '@/presentation/components/ui/form/hooks/useHookForm'
import { Grouper } from '@/presentation/components/utils'

export type InputData<T extends FieldValues> = InputProps & {
	name: FieldPath<T>
	label?: string
}

export type InputDataGrouped<T extends FieldValues> = {
	key: string
	group: InputData<T>[]
}

type FormFieldFactoryProps<T extends FieldValues> = {
	form: ReturnType<typeof useHookForm<T>>
	inputData: InputDataGrouped<T>[]
}

export const FormFieldFactory = <T extends FieldValues>({
	form,
	inputData
}: FormFieldFactoryProps<T>) =>
	inputData.map(({ key, group }) => (
		<Grouper key={key}>
			{group.map(({ name, label, ...props }) => (
				<Form.Field
					key={name}
					control={form.control}
					name={name}
					render={({ field }) => (
						<Form.Item>
							{label ? <Form.Label>{label}</Form.Label> : null}
							<Form.Control>
								<Input
									{...field}
									{...props}
									isError={!!form.formState.errors[name]}
								/>
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>
			))}
		</Grouper>
	))
