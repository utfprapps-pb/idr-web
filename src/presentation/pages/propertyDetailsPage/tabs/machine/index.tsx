import { Button, Input } from '@/presentation/components/ui'

import {
  MachinesDataTable,
  MachineDeleteDialog,
  MachineForm,
} from './components'
import { MachineContext, MachineProvider } from './contexts/machineContext'

export const MachineTab: React.FC = () => {
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

            <MachinesDataTable />
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
