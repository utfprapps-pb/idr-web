export class NotFoundError extends Error {
	constructor(resource: string) {
		super(`${resource} não encontrado`)
		this.name = NotFoundError.name
	}
}
