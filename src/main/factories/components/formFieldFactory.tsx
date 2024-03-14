import { FieldPath, FieldValues } from 'react-hook-form'

import { Form, Input, type InputIcon } from '@/presentation/components/ui'
import { useHookForm } from '@/presentation/components/ui/form/hooks/useHookForm'
import { Grouper } from '@/presentation/components/utils'

export type InputData<T extends FieldValues> = {
	name: FieldPath<T>
	type?: React.InputHTMLAttributes<HTMLInputElement>['type']
	label?: string
	placeholder?: string
	iconsStart?: InputIcon[]
	iconsEnd?: InputIcon[]
	debounce?: number
	debounceCallback?: () => void
	mask?: (value: string) => string
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
			{group.map(
				({
					name,
					label,
					placeholder,
					type,
					iconsStart,
					iconsEnd,
					debounce,
					mask,
					debounceCallback
				}) => (
					<Form.Field
						key={name}
						control={form.control}
						name={name}
						render={({ field }) => (
							<Form.Item>
								{label ? <Form.Label>{label}</Form.Label> : null}
								<Form.Control>
									<Input
										placeholder={placeholder ?? ''}
										type={type ?? 'text'}
										mask={mask}
										isError={!!form.formState.errors[name]}
										iconsStart={iconsStart}
										iconsEnd={iconsEnd}
										debounce={debounce}
										debounceCallback={debounceCallback}
										{...field}
									/>
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>
				)
			)}
		</Grouper>
	))
