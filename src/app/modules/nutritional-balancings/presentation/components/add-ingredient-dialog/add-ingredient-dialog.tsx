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
  useAddIngredientDialog,
  type IngredientExtraData,
} from './add-ingredient-dialog.hook'

import type { IngredientItemSchema } from '../../validations/nutritional-balancing-form-schema'

type AddIngredientDialogProps = {
  currentAnimalIndex: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: IngredientItemSchema) => void
}

export function AddIngredientDialog({
  currentAnimalIndex,
  open,
  onOpenChange,
  onSubmit,
}: Readonly<AddIngredientDialogProps>) {
  const {
    form,
    searchIngredient,
    setSearchIngredient,
    allGeneralCultivations,
    isLoading,
    handleSubmit,
    handleClose,
    handleSelectIngredient,
  } = useAddIngredientDialog({ currentAnimalIndex, onOpenChange, onSubmit })

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Adicionar Ingrediente</Dialog.Title>
          <Dialog.Description>
            Selecione o ingrediente e informe a quantidade em kg.
          </Dialog.Description>
        </Dialog.Header>

        <Form.Provider {...form}>
          <form
            id="add-ingredient-form"
            onSubmit={form.handleSubmit(handleSubmit)}
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
          <Button type="submit" form="add-ingredient-form">
            Salvar
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
