import { Button, Input } from '@/core/presentation/components/ui'

import { InputUseLocationDataTable } from '../components/input-use-location-data-table'
import { InputUseLocationDeleteDialog } from '../components/input-use-location-delete-dialog'
import {
  InputUseLocationContext,
  InputUseLocationProvider,
} from '../contexts/input-use-location-context'
import { InputUseLocationForm } from '../forms/input-use-location-form'

export function InputUseLocationsScreen() {
  return (
    <InputUseLocationProvider>
      <InputUseLocationContext.Consumer>
        {({
          selectedInputUseLocation,
          isOpenDeleteInputUseLocationContainer,
          isOpenNewInputUseLocationForm,
          isOpenEditInputUseLocationForm,
          filters,
          handleChangeFilters,
          openNewInputUseLocationForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewInputUseLocationForm}
              >
                Adicionar Local de Utilização
              </Button>

              <Input
                className="w-fit"
                value={filters.description?.value ?? ''}
                onChange={({ target }) => {
                  handleChangeFilters({
                    description: { value: target.value, type: 'LIKE' },
                  })
                }}
                placeholder="Procurar local por descrição"
              />
            </div>

            <InputUseLocationDataTable />

            {selectedInputUseLocation &&
              isOpenDeleteInputUseLocationContainer && (
                <InputUseLocationDeleteDialog />
              )}

            {(isOpenNewInputUseLocationForm ||
              isOpenEditInputUseLocationForm) && (
              <InputUseLocationForm id={selectedInputUseLocation?.id} />
            )}
          </section>
        )}
      </InputUseLocationContext.Consumer>
    </InputUseLocationProvider>
  )
}

InputUseLocationsScreen.displayName = 'InputUseLocationsScreen'
