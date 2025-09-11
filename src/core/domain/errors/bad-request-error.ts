export class BadRequestError extends Error {
  constructor(message?: string) {
    super(message ?? 'Verifique os dados enviados e tente novamente')
    this.name = BadRequestError.name
  }
}
