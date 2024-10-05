import { z } from 'zod'

export const fileTypeSchema = z.union([
	z.object({
		preview: z.string().optional(),
		file: z.instanceof(File, { message: 'O arquivo precisa ser válido' })
	}),
	z.object({
		preview: z
			.string()
			.min(1, { message: 'A url do arquivo é obrigatória' })
			.url({ message: 'A url do arquivo precisa ser uma url válida' }),
		file: z.instanceof(File).optional()
	})
])
