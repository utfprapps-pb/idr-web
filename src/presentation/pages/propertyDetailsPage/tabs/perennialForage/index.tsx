import { Button, Input } from '@/presentation/components/ui'

import { PerennialForageDeleteDialog } from './components/perennialForageDeleteDialog'
import { PerennialForageForm } from './components/perennialForageForm'
import { PerennialForagesDataTable } from './components/perennialForagesDataTable'
import {
  PerennialForageContext,
  PerennialForageProvider,
} from './contexts/perennialForageContext'

export const PerennialForageTab: React.FC = () => {
  return (
    <PerennialForageProvider>
      <PerennialForageContext.Consumer>
        {({
          selectedPerennialForage,
          isOpenDeletePerennialForageContainer,
          isOpenNewPerennialForageForm,
          isOpenEditPerennialForageForm,
          filters,
          handleChangeFilters,
          openNewPerennialForageForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewPerennialForageForm}
              >
                Adicionar Forrageira
              </Button>

              <Input
                className="w-1/4"
                value={filters.cultivation}
                onChange={({ target }) => {
                  handleChangeFilters({ cultivation: target.value })
                }}
                placeholder="Procurar forrageira por descrição"
              />
            </div>

            <PerennialForagesDataTable />
            {selectedPerennialForage &&
              isOpenDeletePerennialForageContainer && (
                <PerennialForageDeleteDialog />
              )}

            {(isOpenNewPerennialForageForm ||
              isOpenEditPerennialForageForm) && (
              <PerennialForageForm id={selectedPerennialForage?.id} />
            )}
          </section>
        )}
      </PerennialForageContext.Consumer>
    </PerennialForageProvider>
  )
}
