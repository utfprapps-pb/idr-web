import { Button, Input } from '@/core/presentation/components/ui'

import { GeneralCultivationDataTable } from '../components/general-cultivation-data-table'
import { GeneralCultivationDeleteDialog } from '../components/general-cultivation-delete-dialog'
import {
  GeneralCultivationContext,
  GeneralCultivationProvider,
} from '../contexts/general-cultivation-context'
import { GeneralCultivationForm } from '../forms/general-cultivation-form'

export function GeneralCultivationsScreen() {
  return (
    <GeneralCultivationProvider>
      <GeneralCultivationContext.Consumer>
        {({
          selectedGeneralCultivation,
          isOpenDeleteGeneralCultivationContainer,
          isOpenNewGeneralCultivationForm,
          isOpenEditGeneralCultivationForm,
          filters,
          handleChangeFilters,
          openNewGeneralCultivationForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewGeneralCultivationForm}
              >
                Adicionar Cultivo Geral
              </Button>

              <Input
                className="w-fit"
                value={filters.name?.value ?? ''}
                onChange={({ target }) => {
                  handleChangeFilters({
                    name: { value: target.value, type: 'LIKE' },
                  })
                }}
                placeholder="Procurar cultivo geral por nome"
              />
            </div>

            <GeneralCultivationDataTable />
            {selectedGeneralCultivation &&
              isOpenDeleteGeneralCultivationContainer && (
                <GeneralCultivationDeleteDialog />
              )}

            {(isOpenNewGeneralCultivationForm ||
              isOpenEditGeneralCultivationForm) && (
              <GeneralCultivationForm id={selectedGeneralCultivation?.id} />
            )}
          </section>
        )}
      </GeneralCultivationContext.Consumer>
    </GeneralCultivationProvider>
  )
}

GeneralCultivationsScreen.displayName = 'GeneralCultivationScreen'
