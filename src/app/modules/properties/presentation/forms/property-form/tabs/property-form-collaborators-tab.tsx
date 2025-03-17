import { useCallback } from 'react'

import { PlusIcon, Trash2Icon } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button, Form, Input } from '@/core/presentation/components/ui'

import { PropertyFormSchema } from '../../../validations/property-form-schema'

export function PropertyFormCollaboratorsTab() {
  const form = useFormContext<PropertyFormSchema>()
  const { fields, append, remove } = useFieldArray({
    name: 'collaborators',
    control: form.control,
  })

  const handleAddCollaborator = useCallback(
    () =>
      append({
        name: '',
        hoursPerDay: '',
      }),
    [append]
  )

  return (
    <div className="flex flex-col gap-3">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <Form.Field
            name={`collaborators.${index}.name`}
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control>
                    <Input {...field} isError={!!error?.message} />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />

          <Form.Field
            name={`collaborators.${index}.hoursPerDay`}
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Horas/Dia</Form.Label>
                  <Form.Control>
                    <div className="flex gap-3">
                      <Input {...field} isError={!!error?.message} />
                      <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        <Trash2Icon className="text-destructive" />
                      </Button>
                    </div>
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />
        </div>
      ))}

      <Button variant="outline" type="button" onClick={handleAddCollaborator}>
        <PlusIcon /> Adicionar colaborador
      </Button>
    </div>
  )
}

PropertyFormCollaboratorsTab.displayName = 'PropertyFormCollaboratorsTab'
