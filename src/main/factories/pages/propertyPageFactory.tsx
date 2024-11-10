import { PropertyPage } from '@/presentation/pages/propertyPage'

import { PropertyDataFactory } from '../useCases/property'
import { UserDataFactory } from '../useCases/user'

export const MakePropertyPage: React.FC = () => (
  <PropertyPage
    createProperty={PropertyDataFactory.makeRemoteCreate()}
    updateProperty={PropertyDataFactory.makeRemoteUpdate()}
    deleteProperty={PropertyDataFactory.makeRemoteDelete()}
    getProperties={PropertyDataFactory.makeRemoteGetAll()}
    getProperty={PropertyDataFactory.makeRemoteGetOne()}
    getAllUsers={UserDataFactory.makeRemoteGetAll()}
  />
)
