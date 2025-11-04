import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from 'lucide-react'

import { Button, Card } from '@/core/presentation/components/ui'
import { Badge } from '@/core/presentation/components/ui/badge'

type NutritionalBalancingAnimalNavigationProps = {
  currentNutritionalBalancingIndex: number
  totalNutritionalBalancings: number
  animalName: string
  handleSelectNutritionalBalancing: (index: number) => void
  handleRemoveNutritionalBalancing: (index: number) => void
}

export function NutritionalBalancingAnimalNavigation({
  currentNutritionalBalancingIndex,
  totalNutritionalBalancings,
  animalName,
  handleSelectNutritionalBalancing,
  handleRemoveNutritionalBalancing,
}: Readonly<NutritionalBalancingAnimalNavigationProps>) {
  const hasPrevious =
    currentNutritionalBalancingIndex !== null &&
    currentNutritionalBalancingIndex > 0
  const hasNext =
    currentNutritionalBalancingIndex !== null &&
    currentNutritionalBalancingIndex < totalNutritionalBalancings - 1

  return (
    <Card.Container>
      <Card.Content className="flex justify-between items-center">
        <Button
          type="button"
          variant="outline"
          disabled={!hasPrevious}
          onClick={() =>
            handleSelectNutritionalBalancing(
              currentNutritionalBalancingIndex - 1
            )
          }
        >
          <ChevronLeftIcon className="mr-2" />
          Anterior
        </Button>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-primary-500">
              {animalName}
            </h2>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() =>
                handleRemoveNutritionalBalancing(
                  currentNutritionalBalancingIndex
                )
              }
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2Icon className="h-5 w-5" />
            </Button>
          </div>

          <Badge variant="secondary">
            {`Animal ${currentNutritionalBalancingIndex + 1} de ${totalNutritionalBalancings}`}
          </Badge>
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={!hasNext}
          onClick={() =>
            handleSelectNutritionalBalancing(
              currentNutritionalBalancingIndex + 1
            )
          }
        >
          Próximo
          <ChevronRightIcon className="ml-2" />
        </Button>
      </Card.Content>
    </Card.Container>
  )
}

NutritionalBalancingAnimalNavigation.displayName =
  'NutritionalBalancingAnimalNavigation'
