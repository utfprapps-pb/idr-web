import { Button, Input } from '@/core/presentation/components/ui'

import { CultivationPestDataTable } from '../components/cultivation-pest-data-table'
import { CultivationPestDeleteDialog } from '../components/cultivation-pest-delete-dialog'
import {
  CultivationPestContext,
  CultivationPestProvider,
} from '../contexts/cultivation-pest-context'
import { CultivationPestForm } from '../forms/cultivation-pest-form'

export function CultivationPestsScreen() {
  return (
    <CultivationPestProvider>
      <CultivationPestContext.Consumer>
        {({
          filters,
          handleChangeFilters,
          selectedCultivationPest,
          isOpenDeleteCultivationPestContainer,
          isOpenNewCultivationPestForm,
          isOpenEditCultivationPestForm,
          openNewCultivationPestForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewCultivationPestForm}
              >
                Adicionar Praga do Cultivo
              </Button>

              <Input
                className="w-fit"
                value={filters.pest?.value}
                onChange={({ target }) => {
                  handleChangeFilters({
                    pest: {
                      value: target.value,
                      type: 'LIKE',
                    },
                  })
                }}
                placeholder="Procurar por praga"
              />
            </div>

            <CultivationPestDataTable />
            {selectedCultivationPest &&
              isOpenDeleteCultivationPestContainer && (
                <CultivationPestDeleteDialog />
              )}

            {(isOpenNewCultivationPestForm ||
              isOpenEditCultivationPestForm) && (
              <CultivationPestForm id={selectedCultivationPest?.id} />
            )}
          </section>
        )}
      </CultivationPestContext.Consumer>
    </CultivationPestProvider>
  )
}

CultivationPestsScreen.displayName = 'CultivationPestsScreen'
