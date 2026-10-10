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

export type AnimalMastitisDetailsApiResponse = {
  diagnoseDate: string
  mastitisType: string
  ad: string
  ae: string
  pd: string
  pe: string
  cmtResult?: string | null
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

export type AnimalMastitisApiResponse = {
  id: string
  date: string
  type: string
  ad: string
  ae: string
  pd: string
  pe: string
}
