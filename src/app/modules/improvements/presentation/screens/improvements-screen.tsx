import { Button, Input } from '@/core/presentation/components/ui'

import { ImprovementDataTable } from '../components/improvement-data-table'
import { ImprovementDeleteDialog } from '../components/improvement-delete-dialog'
import {
  ImprovementContext,
  ImprovementProvider,
} from '../contexts/improvement-context'
import { ImprovementForm } from '../forms/improvement-form'

export function ImprovementsScreen() {
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

            <ImprovementDataTable />
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

ImprovementsScreen.displayName = 'ImprovementScreen'
