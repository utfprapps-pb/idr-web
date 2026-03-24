import { Button, Input } from '@/core/presentation/components/ui'

import { GeneralCultivationDiseaseDataTable } from '../components/general-cultivation-disease-data-table'
import { GeneralCultivationDiseaseDeleteDialog } from '../components/general-cultivation-disease-delete-dialog'
import {
  GeneralCultivationDiseaseContext,
  GeneralCultivationDiseaseProvider,
} from '../contexts/general-cultivation-disease-context'
import { GeneralCultivationDiseaseForm } from '../forms/general-cultivation-disease-form'

export function GeneralCultivationDiseasesScreen() {
  return (
    <GeneralCultivationDiseaseProvider>
      <GeneralCultivationDiseaseContext.Consumer>
        {({
          filters,
          handleChangeFilters,
          selectedGeneralCultivationDisease,
          isOpenDeleteGeneralCultivationDiseaseContainer,
          isOpenNewGeneralCultivationDiseaseForm,
          isOpenEditGeneralCultivationDiseaseForm,
          openNewGeneralCultivationDiseaseForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewGeneralCultivationDiseaseForm}
              >
                Adicionar Doença de Cultivo Geral
              </Button>

              <Input
                className="w-fit"
                value={filters.name?.value ?? ''}
                onChange={({ target }) => {
                  handleChangeFilters({
                    name: {
                      value: target.value,
                      type: 'LIKE',
                    },
                  })
                }}
                placeholder="Procurar doenças"
              />
            </div>

            <GeneralCultivationDiseaseDataTable />
            {selectedGeneralCultivationDisease &&
              isOpenDeleteGeneralCultivationDiseaseContainer && (
                <GeneralCultivationDiseaseDeleteDialog />
              )}

            {(isOpenNewGeneralCultivationDiseaseForm ||
              isOpenEditGeneralCultivationDiseaseForm) && (
              <GeneralCultivationDiseaseForm
                id={selectedGeneralCultivationDisease?.id}
              />
            )}
          </section>
        )}
      </GeneralCultivationDiseaseContext.Consumer>
    </GeneralCultivationDiseaseProvider>
  )
}

GeneralCultivationDiseasesScreen.displayName =
  'GeneralCultivationDiseasesScreen'
