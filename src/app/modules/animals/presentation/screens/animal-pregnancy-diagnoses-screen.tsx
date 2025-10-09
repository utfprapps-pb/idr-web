import { Button, DatePicker } from '@/core/presentation/components/ui'

import { AnimalPregnancyDiagnosisDataTable } from '../components/animal-pregnancy-diagnosis-data-table'
import { AnimalPregnancyDiagnosisDeleteDialog } from '../components/animal-pregnancy-diagnosis-delete-dialog'
import {
  AnimalPregnancyDiagnosisProvider,
  AnimalPregnancyDiagnosisContext,
} from '../contexts/animal-pregnancy-diagnosis-context'
import { AnimalPregnancyDiagnosisForm } from '../forms/animal-pregnancy-diagnosis-form'

type AnimalPregnancyDiagnosesScreenProps = {
  readonly animalId: number
}

export function AnimalPregnancyDiagnosesScreen({
  animalId,
}: AnimalPregnancyDiagnosesScreenProps) {
  return (
    <AnimalPregnancyDiagnosisProvider animalId={animalId}>
      <AnimalPregnancyDiagnosisContext.Consumer>
        {({
          filters,
          handleChangeFilters,
          selectedAnimalPregnancyDiagnosis,
          isOpenDeleteAnimalPregnancyDiagnosisContainer,
          isOpenNewAnimalPregnancyDiagnosisForm,
          isOpenEditAnimalPregnancyDiagnosisForm,
          openNewAnimalPregnancyDiagnosisForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewAnimalPregnancyDiagnosisForm}
              >
                Adicionar Diagnóstico de Gestação
              </Button>

              <DatePicker
                className="w-fit"
                date={filters.date?.value}
                onSelect={(date) => {
                  if (!date) return
                  handleChangeFilters({
                    date: {
                      value: date,
                      type: 'EQUALS',
                    },
                  })
                }}
                label="Filtrar por data do diagnóstico"
              />
            </div>

            <AnimalPregnancyDiagnosisDataTable />
            {selectedAnimalPregnancyDiagnosis &&
              isOpenDeleteAnimalPregnancyDiagnosisContainer && (
                <AnimalPregnancyDiagnosisDeleteDialog />
              )}

            {(isOpenNewAnimalPregnancyDiagnosisForm ||
              isOpenEditAnimalPregnancyDiagnosisForm) && (
              <AnimalPregnancyDiagnosisForm
                id={selectedAnimalPregnancyDiagnosis?.id}
              />
            )}
          </section>
        )}
      </AnimalPregnancyDiagnosisContext.Consumer>
    </AnimalPregnancyDiagnosisProvider>
  )
}
