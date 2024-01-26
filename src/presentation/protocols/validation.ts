export interface IValidation {
	validate(params: { input: object; fieldName: string }): string | null
}
