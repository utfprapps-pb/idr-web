import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryFn } from '@storybook/react/'
import { z } from 'zod'

import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { useHookForm } from '@/presentation/hooks'

import { Form } from '.'

export default {
	title: 'Components/UI/Form',
} as Meta

const schema = z.object({
	name: z.string().min(3, {
		message: 'Nome precisa ter ao menos três caracteres',
	}),
})
type FormData = z.infer<typeof schema>

const Template: StoryFn = () => {
	const form = useHookForm<FormData>({
		defaultValues: {
			name: '',
		},
		resolver: zodResolver(schema),
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

				<Button type="submit">Enviar</Button>
			</form>
		</Form.Provider>
	)
}

export const Default = Template.bind({})
