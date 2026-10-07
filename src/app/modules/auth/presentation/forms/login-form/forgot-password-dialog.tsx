import { Mail } from 'lucide-react'

import { Button, Dialog, Form, Input } from '@/core/presentation/components/ui'

import { useForgotPasswordDialog } from './forgot-password-dialog.hook'

type ForgotPasswordDialogProps = {
  isOpen: boolean
  onClose: () => void
  form: ReturnType<typeof useForgotPasswordDialog>['form']
  handleSubmit: ReturnType<typeof useForgotPasswordDialog>['handleSubmit']
}

export function ForgotPasswordDialog({
  isOpen,
  onClose,
  form,
  handleSubmit,
}: ForgotPasswordDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Content className="max-w-md">
        <Dialog.Header>
          <Dialog.Title>Recuperar senha</Dialog.Title>
          <Dialog.Description>
            Informe seu e-mail cadastrado. Enviaremos um código para você
            redefinir sua senha.
          </Dialog.Description>
        </Dialog.Header>

        <Form.Provider {...form}>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <Form.Field
              name="email"
              control={form.control}
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Email</Form.Label>
                  <Form.Control>
                    <Input
                      {...field}
                      placeholder="seu@email.com"
                      iconsStart={[
                        {
                          key: Mail.displayName ?? 'Mail',
                          icon: Mail,
                        },
                      ]}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <Dialog.Footer>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={form.buttonDisabled}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="default"
                disabled={form.buttonDisabled}
              >
                Enviar código
              </Button>
            </Dialog.Footer>
          </form>
        </Form.Provider>
      </Dialog.Content>
    </Dialog.Root>
  )
}

ForgotPasswordDialog.displayName = 'ForgotPasswordDialog'
