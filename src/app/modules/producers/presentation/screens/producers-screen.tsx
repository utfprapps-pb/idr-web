import { Button } from '@/core/presentation/components/ui'

import { ProducerDataTable } from '../components/producer-data-table'
import { ProducerDeleteDialog } from '../components/producer-delete-dialog'
import { ProducerContext, ProducerProvider } from '../contexts/producer-context'
import { ProducerForm } from '../forms/producer-form/producer-form'

export function ProducersScreen() {
  return (
    <ProducerProvider>
      <ProducerContext.Consumer>
        {({
          producerSelected,
          isOpenDeleteProducerContainer,
          isOpenEditProducerForm,
          isOpenNewProducerForm,
          openNewProducerForm,
        }) => (
          <section className="flex flex-col gap-11">
            <header>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl text-slate-900 font-semibold">
                    Produtores
                  </h1>
                  <p className="text-base text-slate-600">
                    Gerenciamento dos produtores
                  </p>
                </div>

                <Button
                  variant="default"
                  type="button"
                  onClick={openNewProducerForm}
                >
                  Adicionar Produtor
                </Button>
              </div>
            </header>

            <ProducerDataTable />

            {producerSelected && isOpenDeleteProducerContainer && (
              <ProducerDeleteDialog />
            )}

            {isOpenNewProducerForm && <ProducerForm />}

            {isOpenEditProducerForm && producerSelected && (
              <ProducerForm id={producerSelected.id} />
            )}
          </section>
        )}
      </ProducerContext.Consumer>
    </ProducerProvider>
  )
}

ProducersScreen.displayName = 'ProducersScreen'
