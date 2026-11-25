export type AnimalMastitisCmtResults =
  | 'PLUS-ONE'
  | 'PLUS-TWO'
  | 'PLUS-THREE'
  | 'ABSENT'

export type AnimalMastitisType = 'CLINICAL' | 'SUBCLINICAL'

/** `''` no tipo ou num quarto: a API devolveu nulo (não informado). */
export type AnimalMastitisDetailsModel = {
  date: Date | null
  type: AnimalMastitisType | ''
  ad: AnimalMastitisCmtResults | ''
  ae: AnimalMastitisCmtResults | ''
  pd: AnimalMastitisCmtResults | ''
  pe: AnimalMastitisCmtResults | ''
  /** Sem campo na tela; guardado do GET e reenviado no PUT para não ser apagado. */
  cmtResult?: string | null
}

/** Formato real da API (`GetMastitisByIdOutput` = `ListMastitisOutput`), usado no GET e em cada item da busca. */
export type AnimalMastitisApiResponse = {
  id: string
  animalId: string
  diagnoseDate: string | null
  /** Tipo e quartos a API aceita nulos. */
  mastitisType: string | null
  cmtResult: string | null
  ad: string | null
  ae: string | null
  pd: string | null
  pe: string | null
}

export type AnimalMastitisModel = {
  id: string
  date: Date | null
  type: AnimalMastitisType
  ad: AnimalMastitisCmtResults
  ae: AnimalMastitisCmtResults
  pd: AnimalMastitisCmtResults
  pe: AnimalMastitisCmtResults
}
