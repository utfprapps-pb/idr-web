export class UnexpectedError extends Error {
  constructor() {
    super('Algo de errado aconteceu. Tente novamente mais tarde!')
    this.name = UnexpectedError.name
  }
}
