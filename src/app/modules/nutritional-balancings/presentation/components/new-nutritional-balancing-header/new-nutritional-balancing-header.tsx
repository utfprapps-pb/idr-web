import { Breadcrumb, Button } from '@/core/presentation/components/ui'

import { useNutritionalBalancingContext } from '../../hooks/nutritional-balancing-context.hook'
import { type NutritionalBalancingFormSchema } from '../../validations/nutritional-balancing-form-schema'

type NewNutritionalBalancingHeaderProps = {
  buttonDisabled: boolean
  nutritionalBalancings: NutritionalBalancingFormSchema['nutritionalBalancings']
}

export function NewNutritionalBalancingHeader({
  buttonDisabled,
}: Readonly<NewNutritionalBalancingHeaderProps>) {
  const { closeNewNutritionalBalancingScreen } =
    useNutritionalBalancingContext()

  return (
    <div className="flex justify-between items-center">
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Link onClick={closeNewNutritionalBalancingScreen}>
            Balanceamentos Nutricionais
          </Breadcrumb.Link>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Novo</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>

      <Button type="submit" disabled={buttonDisabled}>
        Salvar Balanceamento
      </Button>
    </div>
  )
}

NewNutritionalBalancingHeader.displayName = 'NewNutritionalBalancingHeader'
