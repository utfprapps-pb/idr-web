import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import { cpfMask } from '@/core/masker'
import {
  Button,
  Form,
  Input,
  Loading,
  ScrollArea,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import {
  makeRemoteCreateProducerUseCase,
  makeRemoteGetProducerUseCase,
  makeRemoteUpdateProducerUseCase,
} from '../../../main/factories/use-cases'
import { useProducerContext } from '../../hooks/producer-context.hook'
import { useProducerQuery } from '../../hooks/queries/use-producer-query.hook'
import {
  producerFormSchema,
  type ProducerFormSchema,
} from '../../validations/producer-form-schema'

import { PRODUCER_INITIAL_FORM_DATA } from './producer-initial-form-data'

type ProducerFormProps = {
  readonly id?: string
}

function ProducerFormFields() {
  const form = useFormContext<ProducerFormSchema>()

  return (
    <>
      <Form.Field
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Form.Item>
            <Form.Label>Nome</Form.Label>
            <Form.Control>
              <Input {...field} isError={!!fieldState.error?.message} />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />
      <Form.Field
        name="cpf"
        control={form.control}
        render={({ field, fieldState }) => (
          <Form.Item>
            <Form.Label>CPF</Form.Label>
            <Form.Control>
              <Input
                {...field}
                isError={!!fieldState.error?.message}
                mask={cpfMask}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />
    </>
  )
}

function CreateProducerForm() {
  const createProducerUseCase = makeRemoteCreateProducerUseCase()

  const { isOpenNewProducerForm, closeNewProducerForm } = useProducerContext()

  const queryClient = useQueryClient()

  const form = useHookForm<ProducerFormSchema>({
    defaultValues: PRODUCER_INITIAL_FORM_DATA,
    resolver: zodResolver(producerFormSchema),
  })

  const { mutateAsync: mutateHandleCreateProducer } = useMutation({
    mutationFn: createProducerUseCase.execute,
  })

  const handleCreateProducer = useCallback(
    async (data: ProducerFormSchema) => {
      try {
        await mutateHandleCreateProducer(data)
        queryClient.invalidateQueries({ queryKey: ['producers'] })
        toast.success('Produtor cadastrado com sucesso')
        form.reset(PRODUCER_INITIAL_FORM_DATA)
        closeNewProducerForm()
      } catch {
        toast.error('Não foi possível cadastrar o produtor')
      }
    },
    [closeNewProducerForm, form, mutateHandleCreateProducer, queryClient]
  )

  return (
    <Sheet.Root
      open={isOpenNewProducerForm}
      onOpenChange={closeNewProducerForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Novo Produtor</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar um novo produtor
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <form
            id="create-producer-form"
            className="flex flex-col gap-4 py-4"
            onSubmit={form.handleSubmit(handleCreateProducer)}
          >
            <ScrollArea.Root>
              <div className="flex flex-col gap-4 px-2">
                <ProducerFormFields />
              </div>
            </ScrollArea.Root>
          </form>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-producer-form"
            type="submit"
            className="w-full"
            disabled={form.buttonDisabled}
          >
            Criar
          </Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  )
}

function EditProducerForm({ id }: { id: string }) {
  const updateProducerUseCase = makeRemoteUpdateProducerUseCase()
  makeRemoteGetProducerUseCase()

  const { isOpenEditProducerForm, closeEditProducerForm } = useProducerContext()

  const { producer, isLoading } = useProducerQuery({ id })

  const queryClient = useQueryClient()

  const form = useHookForm<ProducerFormSchema>({
    defaultValues: PRODUCER_INITIAL_FORM_DATA,
    values: producer,
    resolver: zodResolver(producerFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateProducer } = useMutation({
    mutationFn: updateProducerUseCase.execute,
  })

  const handleUpdateProducer = useCallback(
    async (data: ProducerFormSchema) => {
      try {
        await mutateHandleUpdateProducer({ id, ...data })
        queryClient.invalidateQueries({ queryKey: ['producers'] })
        toast.success('Produtor atualizado com sucesso')
        closeEditProducerForm()
      } catch {
        toast.error('Não foi possível atualizar o produtor')
      }
    },
    [closeEditProducerForm, id, mutateHandleUpdateProducer, queryClient]
  )

  if (isLoading) {
    return (
      <Sheet.Root
        open={isOpenEditProducerForm}
        onOpenChange={closeEditProducerForm}
      >
        <Sheet.Content side="right">
          <Loading />
        </Sheet.Content>
      </Sheet.Root>
    )
  }

  return (
    <Sheet.Root
      open={isOpenEditProducerForm}
      onOpenChange={closeEditProducerForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Editar Produtor</Sheet.Title>
          <Sheet.Description>Altere os dados do produtor</Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <form
            id="edit-producer-form"
            className="flex flex-col gap-4 py-4"
            onSubmit={form.handleSubmit(handleUpdateProducer)}
          >
            <ScrollArea.Root>
              <div className="flex flex-col gap-4 px-2">
                <ProducerFormFields />
              </div>
            </ScrollArea.Root>
          </form>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="edit-producer-form"
            type="submit"
            className="w-full"
            disabled={form.buttonDisabled}
          >
            Salvar
          </Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  )
}

export function ProducerForm({ id }: ProducerFormProps) {
  if (id) {
    return <EditProducerForm id={id} />
  }

  return <CreateProducerForm />
}

ProducerForm.displayName = 'ProducerForm'
