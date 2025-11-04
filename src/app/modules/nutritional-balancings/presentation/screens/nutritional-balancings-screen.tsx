import { Button, DatePicker } from '@/core/presentation/components/ui'

import { NutritionalBalancingDataTable } from '../components/nutritional-balancing-data-table'
import { NutritionalBalancingDeleteDialog } from '../components/nutritional-balancing-delete-dialog'
import {
  NutritionalBalancingContext,
  NutritionalBalancingProvider,
} from '../contexts/nutritional-balancing-context'

import { EditNutritionalBalancingScreen } from './edit-nutritional-balancing-screen'
import { NewNutritionalBalancingScreen } from './new-nutritional-balancing-screen/new-nutritional-balancing-screen'

export function NutritionalBalancingsScreen() {
  return (
    <NutritionalBalancingProvider>
      <NutritionalBalancingContext.Consumer>
        {({
          isOpenDeleteNutritionalBalancingContainer,
          isOpenNewNutritionalBalancingScreen,
          isOpenEditNutritionalBalancingScreen,
          selectedNutritionalBalancing,
          filters,
          handleChangeFilters,
          openNewNutritionalBalancingScreen,
        }) => {
          const isOpenDeleteDialog =
            selectedNutritionalBalancing &&
            isOpenDeleteNutritionalBalancingContainer

          const isOpenEditScreen =
            isOpenEditNutritionalBalancingScreen &&
            selectedNutritionalBalancing?.id

          const isOpenNewScreen =
            isOpenNewNutritionalBalancingScreen &&
            !selectedNutritionalBalancing?.id

          if (isOpenNewScreen) {
            return <NewNutritionalBalancingScreen />
          }

          if (isOpenEditScreen) {
            return <EditNutritionalBalancingScreen />
          }

          return (
            <section className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="default"
                  className="self-end"
                  onClick={openNewNutritionalBalancingScreen}
                >
                  Adicionar Balanceamento Nutricional
                </Button>

                <DatePicker
                  className="w-fit"
                  label="Filtrar por data do balanceamento nutricional"
                  date={
                    filters.date?.value instanceof Date
                      ? filters.date.value
                      : undefined
                  }
                  onSelect={(date) => {
                    if (!date) return
                    handleChangeFilters({
                      ...filters,
                      date: {
                        value: date,
                        type: 'EQUALS',
                      },
                    })
                  }}
                />
              </div>

              <NutritionalBalancingDataTable />

              {isOpenDeleteDialog && <NutritionalBalancingDeleteDialog />}
            </section>
          )
        }}
      </NutritionalBalancingContext.Consumer>
    </NutritionalBalancingProvider>
  )
}

NutritionalBalancingsScreen.displayName = 'NutritionalBalancingsScreen'
