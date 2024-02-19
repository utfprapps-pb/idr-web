import { yupResolver } from '@hookform/resolvers/yup'
import { zodResolver, Resolver } from '@hookform/resolvers/zod'
import { FieldValues, UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { z } from 'zod'

type UseHookFormProps<
	TSchema,
	TSchemaResolver extends Function,
	TDefaultValues extends FieldValues
> = UseFormProps<TDefaultValues> & {
	schema: TSchema
	schemaResolver: TSchemaResolver
}

export const useHookForm = <
	TSchema,
	TSchemaResolver extends Function,
	TDefaultValues extends FieldValues
>({
	schema,
	schemaResolver,
	...props
}: UseHookFormProps<TSchema, TSchemaResolver, TDefaultValues>) => {
	const form = useForm<TDefaultValues>({
		...props,
		resolver: schemaResolver(schema)
	})

	const formValues = form.getValues()

	const resetForm = () => form.reset()

	// const isEmpty = () =>
	// 	Object.keys(formValues).some((key: string) => {
	// 		const value = form[key as keyof T]
	// 	})

	return {
		resetForm
	}
}

const zodSchema = z.object({
	name: z.string()
})

const yupSchema = yup.object({
	name: yup.string()
})

type UserZod = z.infer<typeof zodSchema>

type UserYup = yup.InferType<typeof yupSchema>

const zodForm = useHookForm<z.Schema, Resolver, UserZod>({
	schema: zodSchema,
	schemaResolver: zodResolver
})

const yupForm = useHookForm<
	yup.ObjectSchema<UserYup>,
	typeof yupResolver,
	UserYup
>({
	schema: yupSchema,
	schemaResolver: yupResolver
})
