import { Button, Input } from '@/core/presentation/components/ui'

import { ForageDataTable } from '../components/forage-data-table'
import { ForageDeleteDialog } from '../components/forage-delete-dialog'
import { ForageContext, ForageProvider } from '../contexts/forage-context'
import { ForageForm } from '../forms/forage-form'

export function ForagesScreen() {
  return (
    <ForageProvider>
      <ForageContext.Consumer>
        {({
          selectedForage,
          isOpenDeleteForageContainer,
          isOpenNewForageForm,
          isOpenEditForageForm,
          filters,
          handleChangeFilters,
          openNewForageForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewForageForm}
              >
                Adicionar Forrageira
              </Button>

              <Input
                className="w-fit"
                value={filters.cultivation}
                onChange={({ target }) => {
                  handleChangeFilters({ cultivation: target.value })
                }}
                placeholder="Procurar forrageira por cultivo"
              />
            </div>

            <ForageDataTable />
            {selectedForage && isOpenDeleteForageContainer && (
              <ForageDeleteDialog />
            )}

            {(isOpenNewForageForm || isOpenEditForageForm) && (
              <ForageForm id={selectedForage?.id} />
            )}
          </section>
        )}
      </ForageContext.Consumer>
    </ForageProvider>
  )
}

ForagesScreen.displayName = 'ForageScreen'
