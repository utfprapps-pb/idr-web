import { Breadcrumb, Button } from '@/core/presentation/components/ui'

import { useNutritionalBalancingContext } from '../../hooks/nutritional-balancing-context.hook'

type EditNutritionalBalancingHeaderProps = {
  buttonDisabled: boolean
  animalName: string
}

export function EditNutritionalBalancingHeader({
  buttonDisabled,
  animalName,
}: Readonly<EditNutritionalBalancingHeaderProps>) {
  const { closeEditNutritionalBalancingScreen } =
    useNutritionalBalancingContext()

  return (
    <div className="flex justify-between">
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Link onClick={closeEditNutritionalBalancingScreen}>
            Balanceamentos Nutricionais
          </Breadcrumb.Link>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>{animalName}</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>

      <Button type="submit" disabled={buttonDisabled}>
        Salvar Alterações
      </Button>
    </div>
  )
}

EditNutritionalBalancingHeader.displayName = 'EditNutritionalBalancingHeader'
