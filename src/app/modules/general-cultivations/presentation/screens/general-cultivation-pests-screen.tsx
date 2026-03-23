import { Button, Input } from '@/core/presentation/components/ui'

import { GeneralCultivationPestDataTable } from '../components/general-cultivation-pest-data-table'
import { GeneralCultivationPestDeleteDialog } from '../components/general-cultivation-pest-delete-dialog'
import {
  GeneralCultivationPestContext,
  GeneralCultivationPestProvider,
} from '../contexts/general-cultivation-pest-context'
import { GeneralCultivationPestForm } from '../forms/general-cultivation-pest-form'

export function GeneralCultivationPestsScreen() {
  return (
    <GeneralCultivationPestProvider>
      <GeneralCultivationPestContext.Consumer>
        {({
          selectedGeneralCultivationPest,
          isOpenDeleteGeneralCultivationPestContainer,
          isOpenNewGeneralCultivationPestForm,
          isOpenEditGeneralCultivationPestForm,
          filters,
          handleChangeFilters,
          openNewGeneralCultivationPestForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewGeneralCultivationPestForm}
              >
                Adicionar Praga de Cultivo Geral
              </Button>

              <Input
                className="w-fit"
                value={filters.name?.value ?? ''}
                onChange={({ target }) => {
                  handleChangeFilters({
                    name: { value: target.value, type: 'LIKE' },
                  })
                }}
                placeholder="Procurar pragas"
              />
            </div>

            <GeneralCultivationPestDataTable />
            {selectedGeneralCultivationPest &&
              isOpenDeleteGeneralCultivationPestContainer && (
                <GeneralCultivationPestDeleteDialog />
              )}

            {(isOpenNewGeneralCultivationPestForm ||
              isOpenEditGeneralCultivationPestForm) && (
              <GeneralCultivationPestForm
                id={selectedGeneralCultivationPest?.id}
              />
            )}
          </section>
        )}
      </GeneralCultivationPestContext.Consumer>
    </GeneralCultivationPestProvider>
  )
}

GeneralCultivationPestsScreen.displayName = 'GeneralCultivationPestScreen'
