import { Button } from '@/presentation/components/ui'

import { PropertiesDataTable } from './components/propertiesDataTable'
import { PropertyDeleteDialog } from './components/propertyDeleteDialog'
import { PropertyForm } from './components/propertyForm'
import { PropertyContext, PropertyProvider } from './contexts/propertyContext'

import type { PropertyPageProps } from './types'

export const PropertyPage: React.FC<PropertyPageProps> = ({
  createProperty,
  updateProperty,
  deleteProperty,
  getProperties,
  getProperty,
  getAllUsers,
}) => (
  <PropertyProvider
    getProperties={getProperties}
    deleteProperty={deleteProperty}
    createProperty={createProperty}
    updateProperty={updateProperty}
    getProperty={getProperty}
    getAllUsers={getAllUsers}
  >
    <PropertyContext.Consumer>
      {({
        propertySelected,
        isOpenDeletePropertyContainer,
        isOpenEditPropertyForm,
        isOpenNewPropertyForm,
        openNewPropertyForm,
      }) => (
        <section className="flex flex-col gap-11">
          <header>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <span className="text-3xl text-slate-900 font-semibold">
                  Propriedades
                </span>
                <p className="text-base text-slate-600">
                  Gerenciamento das propriedades dos produtores
                </p>
              </div>

              <Button
                variant="default"
                type="button"
                onClick={openNewPropertyForm}
              >
                Adicionar Propriedade
              </Button>
            </div>
          </header>

          <PropertiesDataTable />
          {propertySelected && isOpenDeletePropertyContainer && (
            <PropertyDeleteDialog />
          )}
          {(isOpenEditPropertyForm || isOpenNewPropertyForm) && (
            <PropertyForm id={propertySelected?.id} />
          )}
        </section>
      )}
    </PropertyContext.Consumer>
  </PropertyProvider>
)
