import { Button, Dialog } from '@/core/presentation/components/ui'

type Props = {
  observation: string
  open: boolean
  onClose: () => void
}

export function ForageObservationDialog({ observation, open, onClose }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Observação da forrageira</Dialog.Title>
          <Dialog.Description>
            Caso seja necessário alterar, edite o registro na tabela.
          </Dialog.Description>
        </Dialog.Header>
        <p className="text-sm text-slate-500">{observation}</p>
        <Dialog.Footer>
          <Button type="button" onClick={onClose}>
            Fechar
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
