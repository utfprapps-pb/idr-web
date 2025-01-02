import { Button, Input } from '@/presentation/components/ui'

import { ForageDeleteDialog } from './components/forageDeleteDialog'
import { ForageForm } from './components/forageForm'
import { ForagesDataTable } from './components/foragesDataTable'
import { ForageContext, ForageProvider } from './contexts/forageContext'

export const ForageTab: React.FC = () => {
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
                className="w-1/4"
                value={filters.cultivation}
                onChange={({ target }) => {
                  handleChangeFilters({ cultivation: target.value })
                }}
                placeholder="Procurar forrageira por cultivo"
              />
            </div>

            <ForagesDataTable />
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
