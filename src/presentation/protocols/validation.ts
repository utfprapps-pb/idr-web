export type ErrorDef = {
	[x: string]: { message: string }
}

type ValidateResponse = {
	errors: ErrorDef
	values: object
}

export type Validate = (props: { data: object }) => ValidateResponse

export interface IValidation {
	validate: Validate
}
