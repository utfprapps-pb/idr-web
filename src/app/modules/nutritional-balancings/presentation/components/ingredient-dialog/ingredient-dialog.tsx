import { floatMask } from '@/core/masker'
import {
  Button,
  Combobox,
  Dialog,
  Form,
  Input,
} from '@/core/presentation/components/ui/'

import {
  CATEGORY_LABELS,
  useIngredientDialog,
  type IngredientExtraData,
} from './ingredient-dialog.hook'

import type { IngredientItemSchema } from '../../validations/nutritional-balancing-form-schema'

type IngredientDialogProps = {
  currentAnimalIndex: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: IngredientItemSchema) => void
  editMode?: boolean
  initialData?: IngredientItemSchema
}

export function IngredientDialog({
  currentAnimalIndex,
  open,
  onOpenChange,
  onSubmit,
  editMode = false,
  initialData,
}: Readonly<IngredientDialogProps>) {
  const {
    form,
    searchIngredient,
    setSearchIngredient,
    allGeneralCultivations,
    isLoading,
    handleSubmit,
    handleClose,
    handleSelectIngredient,
  } = useIngredientDialog({
    currentAnimalIndex,
    onOpenChange,
    onSubmit,
    editMode,
    initialData,
  })

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>
            {editMode ? 'Editar Ingrediente' : 'Adicionar Ingrediente'}
          </Dialog.Title>
          <Dialog.Description>
            {editMode
              ? 'Atualize a quantidade do ingrediente em kg.'
              : 'Selecione o ingrediente e informe a quantidade em kg.'}
          </Dialog.Description>
        </Dialog.Header>

        <Form.Provider {...form}>
          <form
            id="ingredient-form"
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit(handleSubmit)(e)
            }}
            className="space-y-4"
          >
            <Form.Field
              name="ingredient"
              control={form.control}
              render={({ field, fieldState }) => {
                const { error } = fieldState

                return (
                  <Form.Item>
                    <Form.Label>Ingrediente*</Form.Label>
                    <Form.Control>
                      <Combobox<IngredientExtraData>
                        search={searchIngredient}
                        items={allGeneralCultivations}
                        loading={isLoading}
                        selected={field.value}
                        handleSearch={setSearchIngredient}
                        handleSelect={(item) =>
                          handleSelectIngredient(item, field.onChange)
                        }
                        isError={!!error}
                        placeholder="Selecione um ingrediente"
                        emptyMessage="Nenhum ingrediente encontrado"
                        searchPlaceholder="Buscar ingrediente"
                        disabled={editMode}
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )
              }}
            />

            <Form.Field
              name="type"
              control={form.control}
              render={({ field }) => {
                return (
                  <Form.Item>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control>
                      <Input
                        value={CATEGORY_LABELS[field.value] || ''}
                        disabled
                        placeholder="Selecione um ingrediente"
                      />
                    </Form.Control>
                  </Form.Item>
                )
              }}
            />

            <Form.Field
              name="quantity"
              control={form.control}
              render={({ field, fieldState }) => {
                const { error } = fieldState

                return (
                  <Form.Item>
                    <Form.Label>Quantidade (kg)*</Form.Label>
                    <Form.Control>
                      <Input
                        {...field}
                        mask={(value) => floatMask(value, 'kg')}
                        placeholder="0.00"
                        isError={!!error}
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )
              }}
            />
          </form>
        </Form.Provider>

        <Dialog.Footer>
          <Button variant="outline" type="button" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" form="ingredient-form">
            {editMode ? 'Atualizar' : 'Salvar'}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
