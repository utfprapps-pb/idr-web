export class InvalidFieldError extends Error {
	constructor(message?: string) {
		super(message || `Campo é inválido`)
		this.name = InvalidFieldError.name
	}
}
