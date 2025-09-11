import { Button } from '@/core/presentation/components/ui'

import { PropertyDataTable } from '../components/property-data-table'
import { PropertyDeleteDialog } from '../components/property-delete-dialog'
import { PropertyContext, PropertyProvider } from '../contexts/property-context'
import { PropertyForm } from '../forms/property-form'

export function PropertiesScreen() {
  return (
    <PropertyProvider>
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
                  <h1 className="text-3xl text-slate-900 font-semibold">
                    Propriedades
                  </h1>
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

            <PropertyDataTable />
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
}

PropertiesScreen.displayName = 'PropertyScreen'
