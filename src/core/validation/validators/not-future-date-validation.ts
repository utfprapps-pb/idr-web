import { endOfDay } from 'date-fns'

/**
 * Data até o fim do dia de hoje. "Hoje" é lido a cada validação, não quando o
 * schema é criado: com a tela aberta na virada do dia, a data nova é aceita.
 */
export function notFutureDateValidation(date: Date): boolean {
  return date <= endOfDay(new Date())
}
