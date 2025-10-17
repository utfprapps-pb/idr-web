import { Button, Input } from '@/core/presentation/components/ui'

import { CultivationDiseaseDataTable } from '../components/cultivation-disease-data-table'
import { CultivationDiseaseDeleteDialog } from '../components/cultivation-disease-delete-dialog'
import {
  CultivationDiseaseContext,
  CultivationDiseaseProvider,
} from '../contexts/cultivation-disease-context'
import { CultivationDiseaseForm } from '../forms/cultivation-disease-form'

export function CultivationDiseasesScreen() {
  return (
    <CultivationDiseaseProvider>
      <CultivationDiseaseContext.Consumer>
        {({
          filters,
          handleChangeFilters,
          selectedCultivationDisease,
          isOpenDeleteCultivationDiseaseContainer,
          isOpenNewCultivationDiseaseForm,
          isOpenEditCultivationDiseaseForm,
          openNewCultivationDiseaseForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewCultivationDiseaseForm}
              >
                Adicionar Doença do Cultivo
              </Button>

              <Input
                className="w-fit"
                value={filters.disease?.value}
                onChange={({ target }) => {
                  handleChangeFilters({
                    disease: {
                      value: target.value,
                      type: 'LIKE',
                    },
                  })
                }}
                placeholder="Procurar por doença"
              />
            </div>

            <CultivationDiseaseDataTable />
            {selectedCultivationDisease &&
              isOpenDeleteCultivationDiseaseContainer && (
                <CultivationDiseaseDeleteDialog />
              )}

            {(isOpenNewCultivationDiseaseForm ||
              isOpenEditCultivationDiseaseForm) && (
              <CultivationDiseaseForm id={selectedCultivationDisease?.id} />
            )}
          </section>
        )}
      </CultivationDiseaseContext.Consumer>
    </CultivationDiseaseProvider>
  )
}

CultivationDiseasesScreen.displayName = 'CultivationDiseasesScreen'
