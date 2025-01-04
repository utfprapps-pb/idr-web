import { PropertyPage } from '@/presentation/pages/propertyPage'

import { PropertyDataFactory } from '../useCases/property'
import { UserDataFactory } from '../useCases/user'

export const MakePropertyPage: React.FC = () => (
  <PropertyPage
    createProperty={PropertyDataFactory.makeRemoteCreateProperty()}
    updateProperty={PropertyDataFactory.makeRemoteUpdateProperty()}
    deleteProperty={PropertyDataFactory.makeRemoteDeleteProperty()}
    getProperties={PropertyDataFactory.makeRemoteGetProperties()}
    getProperty={PropertyDataFactory.makeRemoteGetProperty()}
    getAllUsers={UserDataFactory.makeRemoteGetAllUsers()}
  />
)
