import { createContext } from 'react'

import type { Services } from './types'
import type { PropertyModel } from '@/domain/models/propertyModel'

type PropertyContextValue = Services & {
  propertySelected: null | PropertyModel
  isOpenNewPropertyForm: boolean
  isOpenEditPropertyForm: boolean
  isOpenDeletePropertyContainer: boolean
  openNewPropertyForm: () => void
  closeNewPropertyForm: () => void
  openEditPropertyForm: (property: PropertyModel) => void
  closeEditPropertyForm: () => void
  openDeletePropertyContainer: (property: PropertyModel) => void
  closeDeletePropertyContainer: () => void
}
export const PropertyContext = createContext({} as PropertyContextValue)
