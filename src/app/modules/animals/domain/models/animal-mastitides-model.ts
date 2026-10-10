export type AnimalMastitisCmtResults =
  | 'PLUS-ONE'
  | 'PLUS-TWO'
  | 'PLUS-THREE'
  | 'ABSENT'

export type AnimalMastitisType = 'CLINICAL' | 'SUBCLINICAL'

export type AnimalMastitisDetailsModel = {
  date: Date
  type: AnimalMastitisType
  ad: AnimalMastitisCmtResults
  ae: AnimalMastitisCmtResults
  pd: AnimalMastitisCmtResults
  pe: AnimalMastitisCmtResults
  /** Sem campo na tela; guardado do GET e reenviado no PUT para não ser apagado. */
  cmtResult?: string | null
}

/** Formato real da API (`GetMastitisByIdOutput` = `ListMastitisOutput`), usado no GET e em cada item da busca. */
export type AnimalMastitisApiResponse = {
  id: string
  animalId: string
  diagnoseDate: string
  mastitisType: string
  cmtResult: string | null
  ad: string
  ae: string
  pd: string
  pe: string
}

export type AnimalMastitisModel = {
  id: string
  date: Date
  type: AnimalMastitisType
  ad: AnimalMastitisCmtResults
  ae: AnimalMastitisCmtResults
  pd: AnimalMastitisCmtResults
  pe: AnimalMastitisCmtResults
}
