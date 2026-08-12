import { Button } from '@/core/presentation/components/ui'

import { RegionDataTable } from '../components/region-data-table'
import { RegionDeleteDialog } from '../components/region-delete-dialog'
import { RegionContext, RegionProvider } from '../contexts/region-context'
import { RegionForm } from '../forms/region-form'

export function RegionsScreen() {
  return (
    <RegionProvider>
      <RegionContext.Consumer>
        {({
          regionSelected,
          isOpenDeleteRegionContainer,
          isOpenEditRegionForm,
          isOpenNewRegionForm,
          openNewRegionForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex justify-end">
              <Button
                type="button"
                variant="default"
                onClick={openNewRegionForm}
              >
                Nova Região
              </Button>
            </div>

            <RegionDataTable />

            {regionSelected && isOpenDeleteRegionContainer && (
              <RegionDeleteDialog />
            )}

            {(isOpenEditRegionForm || isOpenNewRegionForm) && (
              <RegionForm id={regionSelected?.id} />
            )}
          </section>
        )}
      </RegionContext.Consumer>
    </RegionProvider>
  )
}

RegionsScreen.displayName = 'RegionsScreen'
