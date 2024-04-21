import {
	type ControllerFieldState,
	type ControllerRenderProps,
	type FieldPath,
	type FieldValues,
	type UseFormStateReturn
} from 'react-hook-form'

import { Form } from '@/presentation/components/ui'
import { Grouper } from '@/presentation/components/utils'
import { useHookForm } from '@/presentation/hooks/useHookForm'

type RenderComponentProps<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	field: ControllerRenderProps<TFieldValues, TName>
	fieldState: ControllerFieldState
	formState: UseFormStateReturn<TFieldValues>
}

export type ComponentProps<TFieldValues extends FieldValues> = {
	name: FieldPath<TFieldValues>
	label?: string
	renderComponent: (
		props: RenderComponentProps<TFieldValues, FieldPath<TFieldValues>>
	) => React.ReactNode
}

export type InputDataGrouped<TFieldValues extends FieldValues> = {
	key: string
	group: ComponentProps<TFieldValues>[]
}

type FormFieldFactoryProps<TFieldValues extends FieldValues> = {
	form: ReturnType<typeof useHookForm<TFieldValues>>
	inputData: InputDataGrouped<TFieldValues>[]
}

export const FormFieldFactory = <TFieldValues extends FieldValues>({
	form,
	inputData
}: FormFieldFactoryProps<TFieldValues>) =>
	inputData.map(({ key, group }) => (
		<Grouper key={key}>
			{group.map(({ name, label, renderComponent }) => (
				<Form.Field
					key={name}
					control={form.control}
					name={name}
					render={({ field, fieldState, formState }) => (
						<Form.Item>
							{label ? <Form.Label>{label}</Form.Label> : null}
							<Form.Control>
								{renderComponent({
									field,
									fieldState,
									formState
								})}
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>
			))}
		</Grouper>
	))
