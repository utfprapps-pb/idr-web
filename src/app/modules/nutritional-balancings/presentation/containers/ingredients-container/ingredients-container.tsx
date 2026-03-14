import { CopyIcon, PlusIcon } from 'lucide-react'

import { formatNumber } from '@/core/masker'
import { Button, Card, Combobox } from '@/core/presentation/components/ui'

import { IngredientDialog } from '../../components/ingredient-dialog'
import { IngredientsTable } from '../../components/ingredients-table'

import { useIngredientsContainer } from './ingredients-container.hook'

type IngredientsContainerProps = {
  currentAnimalIndex: number
}

export function IngredientsContainer({
  currentAnimalIndex,
}: Readonly<IngredientsContainerProps>) {
  const {
    openAddIngredientDialog,
    setOpenAddIngredientDialog,
    handleAddIngredient,
    handleOpenEditIngredient,
    handleUpdateIngredient,
    handleRemoveIngredient,
    ingredients,
    searchAnimal,
    setSearchAnimal,
    selectedAnimalToCopy,
    setSelectedAnimalToCopy,
    animalOptions,
    handleCopyIngredients,
    editingIngredient,
    setEditingIngredient,
  } = useIngredientsContainer({ currentAnimalIndex })

  return (
    <>
      <Card.Container className="p-4 gap-4">
        <div className="flex justify-between items-start">
          <Card.Header>
            <Card.Title>Informações do Animal</Card.Title>
            <Card.Description>
              Comparação entre exigências e valores oferecidos
            </Card.Description>
          </Card.Header>

          <Button
            type="button"
            onClick={() => setOpenAddIngredientDialog(true)}
          >
            <PlusIcon className="mr-2" /> Adicionar Ingrediente
          </Button>
        </div>
        <Card.Content className="space-y-4">
          <div className="gap-4 flex w-full justify-start p-4 bg-slate-50 border rounded-md items-center">
            <span className="font-medium">Copiar Ingredientes de:</span>
            <Combobox
              search={searchAnimal}
              items={animalOptions}
              selected={selectedAnimalToCopy ?? { value: 0, label: '' }}
              handleSearch={setSearchAnimal}
              handleSelect={(item) => setSelectedAnimalToCopy(item)}
              placeholder="Selecione um animal"
              emptyMessage="Nenhum animal com ingredientes encontrado"
              className="w-auto"
            />

            <Button
              type="button"
              onClick={handleCopyIngredients}
              disabled={!selectedAnimalToCopy}
            >
              <CopyIcon className="mr-2" />
              Copiar
            </Button>
          </div>

          <IngredientsTable
            category="VOLUMOSO"
            categoryType="FORAGE"
            categoryClassName="text-amber-700"
            pointerClassName="text-amber-500"
            rows={ingredients.forage}
            onRemove={handleRemoveIngredient}
            onEdit={handleOpenEditIngredient}
          />

          <IngredientsTable
            category="CONCENTRADO"
            categoryType="CONCENTRATE"
            categoryClassName="text-orange-700"
            pointerClassName="text-orange-500"
            rows={ingredients.concentrate}
            onRemove={handleRemoveIngredient}
            onEdit={handleOpenEditIngredient}
          />

          <IngredientsTable
            category="MINERAL"
            categoryType="MINERAL"
            categoryClassName="text-blue-700"
            pointerClassName="text-blue-500"
            rows={ingredients.mineral}
            onRemove={handleRemoveIngredient}
            onEdit={handleOpenEditIngredient}
          />

          <div className="gap-4 flex w-full justify-between p-4 bg-slate-50 border rounded-md items-center">
            <span className="font-medium">TOTAL</span>
            <span className="font-bold text-3xl text-primary-500">
              {formatNumber(ingredients.total, {
                suffix: 'kg',
              })}
            </span>
          </div>
        </Card.Content>
      </Card.Container>

      {openAddIngredientDialog && (
        <IngredientDialog
          currentAnimalIndex={currentAnimalIndex}
          open={openAddIngredientDialog}
          onOpenChange={setOpenAddIngredientDialog}
          onSubmit={handleAddIngredient}
        />
      )}

      {editingIngredient && (
        <IngredientDialog
          currentAnimalIndex={currentAnimalIndex}
          open={!!editingIngredient}
          onOpenChange={(open) => {
            if (!open) setEditingIngredient(null)
          }}
          onSubmit={handleUpdateIngredient}
          editMode
          initialData={editingIngredient.data}
        />
      )}
    </>
  )
}

IngredientsContainer.displayName = 'IngredientsContainer'
