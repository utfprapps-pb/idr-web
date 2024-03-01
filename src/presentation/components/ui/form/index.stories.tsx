import { Meta, StoryFn } from '@storybook/react/'

import { ValidationBuilder } from '@/main/builders'
import { ValidationComposite } from '@/main/composite'
import { schemaResolver } from '@/validation/schemaResolver'

import { Button } from '../button'
import { Input } from '../input'

import { useHookForm } from './hooks/useHookForm'

import { Form } from '.'

export default {
	title: 'Components/UI/Form'
} as Meta

type FormData = {
	name: string
	email: string
	password: string
	passwordConfirmation: string
}

const Template: StoryFn = () => {
	const schema = ValidationComposite.build([
		...ValidationBuilder.field<keyof FormData>('name')
			.required()
			.min(3)
			.build(),
		...ValidationBuilder.field<keyof FormData>('email')
			.required()
			.email()
			.build(),
		...ValidationBuilder.field<keyof FormData>('password')
			.required()
			.min(20)
			.email()
			.build(),
		...ValidationBuilder.field<keyof FormData>('passwordConfirmation')
			.required()
			.sameAs('password')
			.build()
	])

	const form = useHookForm<FormData>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordConfirmation: ''
		},
		schemaResolver: (data) => schemaResolver({ data, schema })
	})

	const onSubmit = (data: FormData) => {
		console.info('formData: ', { ...data })
	}

	return (
		<Form.Provider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<Form.Field
					control={form.control}
					name="name"
					render={({ field }) => (
						<Form.Item>
							<Form.Label>Nome</Form.Label>
							<Form.Control>
								<Input placeholder="Nome" {...field} />
							</Form.Control>
							<Form.Description>Digite seu nome completo</Form.Description>
							<Form.Message />
						</Form.Item>
					)}
				/>

				<Form.Field
					control={form.control}
					name="email"
					render={({ field }) => (
						<Form.Item>
							<Form.Label>Email</Form.Label>
							<Form.Control>
								<Input placeholder="Email" {...field} />
							</Form.Control>
							<Form.Description>Digite seu email</Form.Description>
							<Form.Message />
						</Form.Item>
					)}
				/>

				<Form.Field
					control={form.control}
					name="password"
					render={({ field }) => (
						<Form.Item>
							<Form.Label>Senha</Form.Label>
							<Form.Control>
								<Input placeholder="Senha" {...field} />
							</Form.Control>
							<Form.Description>Digite sua senha</Form.Description>
							<Form.Message />
						</Form.Item>
					)}
				/>

				<Form.Field
					control={form.control}
					name="passwordConfirmation"
					render={({ field }) => (
						<Form.Item>
							<Form.Label>Confirme sua senha</Form.Label>
							<Form.Control>
								<Input placeholder="Confirmar senha" {...field} />
							</Form.Control>
							<Form.Description>Digite novamente sua senha</Form.Description>
							<Form.Message />
						</Form.Item>
					)}
				/>
				<Button type="submit">Enviar</Button>
			</form>
		</Form.Provider>
	)
}

export const Default = Template.bind({})
