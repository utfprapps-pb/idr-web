import { Button } from '@/core/presentation/components/ui'

import { CityDataTable } from '../components/city-data-table'
import { CityDeleteDialog } from '../components/city-delete-dialog'
import { CityContext, CityProvider } from '../contexts/city-context'
import { CityForm } from '../forms/city-form'

export function CitiesScreen() {
  return (
    <CityProvider>
      <CityContext.Consumer>
        {({
          citySelected,
          isOpenDeleteCityContainer,
          isOpenEditCityForm,
          isOpenNewCityForm,
          openNewCityForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex justify-end">
              <Button type="button" variant="default" onClick={openNewCityForm}>
                Nova Cidade
              </Button>
            </div>

            <CityDataTable />

            {citySelected && isOpenDeleteCityContainer && <CityDeleteDialog />}

            {(isOpenEditCityForm || isOpenNewCityForm) && (
              <CityForm id={citySelected?.id} />
            )}
          </section>
        )}
      </CityContext.Consumer>
    </CityProvider>
  )
}

CitiesScreen.displayName = 'CitiesScreen'
