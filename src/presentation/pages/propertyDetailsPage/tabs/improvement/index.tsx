import { Button, Input } from '@/presentation/components/ui'

import { ImprovementDeleteDialog } from './components/improvementDeleteDialog'
import { ImprovementForm } from './components/improvementForm'
import { ImprovementsDataTable } from './components/improvementsDataTable'
import {
  ImprovementContext,
  ImprovementProvider,
} from './contexts/improvementContext'

export const ImprovementTab: React.FC = () => {
  return (
    <ImprovementProvider>
      <ImprovementContext.Consumer>
        {({
          selectedImprovement,
          isOpenDeleteImprovementContainer,
          isOpenNewImprovementForm,
          isOpenEditImprovementForm,
          filters,
          handleChangeFilters,
          openNewImprovementForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewImprovementForm}
              >
                Adicionar Benfeitoria
              </Button>

              <Input
                className="w-fit"
                value={filters.description}
                onChange={({ target }) => {
                  handleChangeFilters({ description: target.value })
                }}
                placeholder="Procurar benfeitoria"
              />
            </div>

            <ImprovementsDataTable />
            {selectedImprovement && isOpenDeleteImprovementContainer && (
              <ImprovementDeleteDialog />
            )}

            {(isOpenNewImprovementForm || isOpenEditImprovementForm) && (
              <ImprovementForm id={selectedImprovement?.id} />
            )}
          </section>
        )}
      </ImprovementContext.Consumer>
    </ImprovementProvider>
  )
}
