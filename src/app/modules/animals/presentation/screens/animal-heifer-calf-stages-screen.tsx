import { Button, DatePicker } from '@/core/presentation/components/ui'

import { AnimalHeiferCalfStageDataTable } from '../components/animal-heifer-calf-stage-data-table'
import { AnimalHeiferCalfStageDeleteDialog } from '../components/animal-heifer-calf-stage-delete-dialog'
import {
  AnimalHeiferCalfStageContext,
  AnimalHeiferCalfStageProvider,
} from '../contexts/animal-heifer-calf-stage-context'
import { AnimalHeiferCalfStageForm } from '../forms/animal-heifer-calf-stage-form'

type AnimalHeiferCalfStagesScreenProps = {
  animalId: number
}

export function AnimalHeiferCalfStagesScreen({
  animalId,
}: Readonly<AnimalHeiferCalfStagesScreenProps>) {
  return (
    <AnimalHeiferCalfStageProvider animalId={animalId}>
      <AnimalHeiferCalfStageContext.Consumer>
        {({
          filters,
          handleChangeFilters,
          selectedAnimalHeiferCalfStage,
          isOpenDeleteAnimalHeiferCalfStageContainer,
          isOpenNewAnimalHeiferCalfStageForm,
          isOpenEditAnimalHeiferCalfStageForm,
          openNewAnimalHeiferCalfStageForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewAnimalHeiferCalfStageForm}
              >
                Adicionar Parto do Animal
              </Button>

              <DatePicker
                className="w-fit"
                label="Filtrar por data da pesagem"
                date={
                  filters.weighingDate?.value instanceof Date
                    ? filters.weighingDate.value
                    : undefined
                }
                onSelect={(date) => {
                  if (!date) return
                  handleChangeFilters({
                    ...filters,
                    weighingDate: {
                      value: date,
                      type: 'EQUALS',
                    },
                  })
                }}
              />
            </div>

            <AnimalHeiferCalfStageDataTable />
            {selectedAnimalHeiferCalfStage &&
              isOpenDeleteAnimalHeiferCalfStageContainer && (
                <AnimalHeiferCalfStageDeleteDialog />
              )}

            {(isOpenNewAnimalHeiferCalfStageForm ||
              isOpenEditAnimalHeiferCalfStageForm) && (
              <AnimalHeiferCalfStageForm
                id={selectedAnimalHeiferCalfStage?.id}
              />
            )}
          </section>
        )}
      </AnimalHeiferCalfStageContext.Consumer>
    </AnimalHeiferCalfStageProvider>
  )
}

AnimalHeiferCalfStagesScreen.displayName = 'AnimalHeiferCalfStagesScreen'
