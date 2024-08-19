import { z } from 'zod'

import { moneyValidation } from '@/validation/validators/moneyValidation'

const general = z.object({
	name: z.string().min(1, {
		message: 'Nome da propriedade é obrigatório'
	}),
	producer: z.string().min(1, {
		message: 'Nome do produtor é obrigatório'
	}),
	state: z.string().min(1, {
		message: 'Estado é obrigatório'
	}),
	city: z.string().min(1, {
		message: 'Cidade é obrigatório'
	}),
	nakedAveragePricePerHectare: z
		.string()
		.refine((value) => moneyValidation(value, 0.01), {
			message: 'O valor mínimo é R$0,01'
		}),
	leaseAveragePricePerHectare: z
		.string()
		.refine((value) => moneyValidation(value, 0.01), {
			message: 'O valor mínimo é R$0,01'
		}),
	responsibleTechnicians: z
		.array(
			z
				.object({
					value: z.string(),
					label: z.string()
				})
				.refine(({ label, value }) => !!label || !!value, {
					message: 'Selecione pelo menos um técnico responsável'
				})
		)
		.nonempty({
			message: 'Adicione pelo menos um técnico'
		})
})

const collaborators = z.array(
	z.object({
		name: z.string().min(1, {
			message: 'Nome do colaborador é obrigatório'
		}),
		hoursPerDay: z.string().min(1, {
			message: 'Hora de trabalho por dia do colaborador é obrigatório'
		})
	})
)

const totalArea = z.object({
	dairyCattleFarming: z
		.string()
		.refine((value) => moneyValidation(value, 0.01), {
			message: 'A Área destinada a bovinocultura é obrigatória'
		}),
	perennialPasture: z.string().refine((value) => moneyValidation(value, 0.01), {
		message: 'A Área de pasto perene é obrigatória'
	}),
	summerPlowing: z.string().refine((value) => moneyValidation(value, 0.01), {
		message: 'A Área de lavora de verão é obrigatória'
	}),
	winterPlowing: z.string().refine((value) => moneyValidation(value, 0.01), {
		message: 'A Área de lavoura de inverno é obrigatória'
	})
})

const localization = z.object({
	latitude: z.string(),
	longitude: z.string(),
	images: z.array(
		z.object({
			name: z.string(),
			preview: z.string().url()
		})
	)
})

export const propertySchema = z.object({
	general,
	collaborators,
	totalArea,
	localization
})
