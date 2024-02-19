import { Meta, StoryFn } from '@storybook/react/'
import { useForm } from 'react-hook-form'

import { Button } from '../button'
import { Input } from '../input'

import { Form } from '.'

export default {
	title: 'Components/UI/Form'
} as Meta

const Template: StoryFn = () => {
	const form = useForm({
		defaultValues: {
			name: ''
		}
	})

	const onSubmit = (data: any) => {
		alert(JSON.stringify(data, null, 2))
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

				<Button type="submit">Enviar</Button>
			</form>
		</Form.Provider>
	)
}

export const Default = Template.bind({})
