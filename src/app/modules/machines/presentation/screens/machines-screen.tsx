import { Button, Input } from '@/core/presentation/components/ui'

import { MachineDataTable } from '../components/machine-data-table'
import { MachineDeleteDialog } from '../components/machine-delete-dialog'
import { MachineContext, MachineProvider } from '../contexts/machine-context'
import { MachineForm } from '../forms/machine-form'

export function MachinesScreen() {
  return (
    <MachineProvider>
      <MachineContext.Consumer>
        {({
          selectedMachine,
          isOpenDeleteMachineContainer,
          isOpenNewMachineForm,
          isOpenEditMachineForm,
          filters,
          handleChangeFilters,
          openNewMachineForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewMachineForm}
              >
                Adicionar Máquina
              </Button>

              <Input
                className="w-fit"
                value={filters.name}
                onChange={({ target }) => {
                  handleChangeFilters({ name: target.value })
                }}
                placeholder="Procurar máquina por nome"
              />
            </div>

            <MachineDataTable />
            {selectedMachine && isOpenDeleteMachineContainer && (
              <MachineDeleteDialog />
            )}

            {(isOpenNewMachineForm || isOpenEditMachineForm) && (
              <MachineForm id={selectedMachine?.id} />
            )}
          </section>
        )}
      </MachineContext.Consumer>
    </MachineProvider>
  )
}

MachinesScreen.displayName = 'MachinesScreen'
