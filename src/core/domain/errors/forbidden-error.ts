export class ForbiddenError extends Error {
  constructor(message?: string) {
    super(message ?? 'Você não tem permissão para acessar este recurso')
    this.name = ForbiddenError.name
  }
}
