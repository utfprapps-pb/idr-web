import type { Option, WithId } from '@/core/domain/types'

export type AnimalDetailsModel = {
  name: string
  breed: Option
}

export type AnimalDetailsApiResponse = {
  name: string
  breed: Option
}

export type AnimalModel = WithId<{
  name: string
  breed: string
}>

// TODO: arrumar campos necessários para cada implementação dos campos seguintes a tela de animal
export type AnimalApiResponse = {
  id: string
  /*
    property: {
        id: number,
        ocupationArea: ,
        totalArea: 389.16,
        soilMap: null,
        latitude: 365,
        longitude: 365,
        leased: true,
        user: {
            id: 2,
            username: fulano2@test.com,
            displayName: Fulano 2,
            cpf: 222.222.222-22,
            county: null,
            cep: 2222.2222,
            street: Rua teste2,
            houseNumber: 22,
            phone: 2222,
            professionalRegister: 2222,
            graduationYear: 2002
        }
    },
    */
  // type: string,
  identifier: string
  breed: {
    id: number
    breedName: string
  }
  /*
  bornDate: Date,
  bornWeight: number,
  previousWeight: number,
  currentWeight: number,
  ecc: number
  */
}
