export class UsernameInUseError extends Error {
	constructor() {
		super('Usuário já está em uso')
		this.name = UsernameInUseError.name
	}
}
