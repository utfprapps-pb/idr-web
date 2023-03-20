export interface Validation {
	validate(params: { input: object; fieldName: string }): string | null
}
