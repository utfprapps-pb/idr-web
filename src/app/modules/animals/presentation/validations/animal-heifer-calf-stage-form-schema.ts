import { z } from 'zod'

export const animalHeiferCalfStageFormSchema = z.object({
  weighingDate: z.date().max(new Date(), { message: 'Data inválida' }),
  ecc: z.string().min(1, { message: 'Campo obrigatório' }),
  age: z.object({
    years: z.string().min(1, { message: 'Campo obrigatório' }),
    months: z.string().min(1, { message: 'Campo obrigatório' }),
  }),
  weighing: z.object({
    last: z.string().min(1, { message: 'Campo obrigatório' }),
    current: z.string().min(1, { message: 'Campo obrigatório' }),
  }),
  ageWeightEstimate: z.object({
    min: z.string().min(1, { message: 'Campo obrigatório' }),
    max: z.string().min(1, { message: 'Campo obrigatório' }),
  }),
  gmd: z.object({
    min: z.string().min(1, { message: 'Campo obrigatório' }),
    max: z.string().min(1, { message: 'Campo obrigatório' }),
    real: z.string().min(1, { message: 'Campo obrigatório' }),
    status: z.enum(['normal', 'overweight', 'underweight'], {
      errorMap: () => ({ message: 'Campo obrigatório' }),
    }),
  }),
  amountOfMilk: z.object({
    correction: z.string().min(1, { message: 'Campo obrigatório' }),
    morning: z.string().min(1, { message: 'Campo obrigatório' }),
    afternoon: z.string().min(1, { message: 'Campo obrigatório' }),
  }),
  weaningDate: z.object({
    first: z.date(),
    second: z.date(),
  }),
  removeLittleHouseDate: z.date(),
  amountOfEstimateConcentrate: z.object({
    correction: z.string().min(1, { message: 'Campo obrigatório' }),
    heifer: z.string().min(1, { message: 'Campo obrigatório' }),
    calf: z.string().min(1, { message: 'Campo obrigatório' }),
  }),
  bulky: z.string().min(1, { message: 'Campo obrigatório' }),
  dateToProvideSilage: z.date(),
  reproduction: z.object({
    status: z.enum(['fit', 'unfit'], {
      errorMap: () => ({ message: 'Campo obrigatório' }),
    }),
    minWeight: z.string().min(1, { message: 'Campo obrigatório' }),
    fromDate: z.date(),
    carriedOut: z.date().max(new Date(), {
      message: 'Data inválida',
    }),
    artificialInseminationNumber: z.string().min(1, {
      message: 'Campo obrigatório',
    }),
  }),
})

export type AnimalHeiferCalfStageFormSchema = z.infer<
  typeof animalHeiferCalfStageFormSchema
>
