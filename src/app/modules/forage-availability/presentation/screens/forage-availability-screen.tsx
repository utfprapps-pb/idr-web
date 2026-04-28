import { Button, Input } from '@/core/presentation/components/ui'

import { ForageAvailabilityDataTable } from '../components/forage-availability-data-table'
import { ForageAvailabilityDeleteDialog } from '../components/forage-availability-delete-dialog'
import {
  ForageAvailabilityContext,
  ForageAvailabilityProvider,
} from '../contexts/forage-availability-context'
import { ForageAvailabilityForm } from '../forms/forage-availability-form'

export function ForageAvailabilityScreen() {
  return (
    <ForageAvailabilityProvider>
      <ForageAvailabilityContext.Consumer>
        {({
          selectedForageAvailability,
          isOpenDeleteForageAvailabilityContainer,
          isOpenNewForageAvailabilityForm,
          isOpenEditForageAvailabilityForm,
          filters,
          handleChangeFilters,
          openNewForageAvailabilityForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewForageAvailabilityForm}
              >
                Adicionar Disponibilidade de Forragem
              </Button>

              <Input
                className="w-fit"
                value={filters.forage?.value ?? ''}
                onChange={({ target }) => {
                  handleChangeFilters({
                    forage: { value: target.value, type: 'LIKE' },
                  })
                }}
                placeholder="Procurar por forrageira"
              />
            </div>

            <ForageAvailabilityDataTable />

            {selectedForageAvailability &&
              isOpenDeleteForageAvailabilityContainer && (
                <ForageAvailabilityDeleteDialog />
              )}

            {(isOpenNewForageAvailabilityForm ||
              isOpenEditForageAvailabilityForm) && (
              <ForageAvailabilityForm id={selectedForageAvailability?.id} />
            )}
          </section>
        )}
      </ForageAvailabilityContext.Consumer>
    </ForageAvailabilityProvider>
  )
}

ForageAvailabilityScreen.displayName = 'ForageAvailabilityScreen'
