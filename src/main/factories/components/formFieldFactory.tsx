import { CreateUserModel } from '@/domain/models'
import { Form, Input, type InputIcon } from '@/presentation/components/ui'
import { useHookForm } from '@/presentation/components/ui/form/hooks/useHookForm'
import { Grouper } from '@/presentation/components/utils'

export type InputData = {
	name: keyof CreateUserModel
	type?: React.InputHTMLAttributes<HTMLInputElement>['type']
	label?: string
	placeholder?: string
	iconsStart?: InputIcon[]
	iconsEnd?: InputIcon[]
	debounce?: number
	debounceCallback?: () => void
	mask?: (value: string) => string
}

export type InputDataGrouped = {
	key: string
	group: InputData[]
}

type FormFieldFactoryProps = {
	form: ReturnType<typeof useHookForm<CreateUserModel>>
	inputData: InputDataGrouped[]
}

export const FormFieldFactory: React.FC<FormFieldFactoryProps> = ({
	form,
	inputData
}) =>
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
