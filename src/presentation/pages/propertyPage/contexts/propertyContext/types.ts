import type {
  ICreateProperty,
  IDeleteProperty,
  IGetProperties,
  IGetProperty,
  IUpdateProperty,
} from '@/domain/useCases/property'
import type { IGetAllUsers } from '@/domain/useCases/user'

type Services = {
  getProperties: IGetProperties
  deleteProperty: IDeleteProperty
  createProperty: ICreateProperty
  updateProperty: IUpdateProperty
  getProperty: IGetProperty
  getAllUsers: IGetAllUsers
}

export { type Services }
