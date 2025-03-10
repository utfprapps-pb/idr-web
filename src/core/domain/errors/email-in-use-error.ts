export class EmailInUseError extends Error {
  constructor() {
    super('Usuário já está em uso')
    this.name = EmailInUseError.name
  }
}
