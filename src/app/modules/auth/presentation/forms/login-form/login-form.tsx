import { ChevronRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'

import { generateRoutePath } from '@/core/main/routes/generate-route-path'
import { Button, Card, Form, Input } from '@/core/presentation/components/ui'
import { useIdrNavigate } from '@/core/presentation/hooks'

import { ForgotPasswordDialog } from './forgot-password-dialog'
import { useForgotPasswordDialog } from './forgot-password-dialog.hook'
import { useLoginForm } from './login-form.hook'

export function LoginForm() {
  const { form, viewPassword, setViewPassword, handleSubmit } = useLoginForm()
  const { navigate } = useIdrNavigate()
  const {
    isOpen: isForgotPasswordOpen,
    handleOpen: openForgotPassword,
    handleClose: closeForgotPassword,
    form: forgotPasswordForm,
    handleSubmit: handleForgotPasswordSubmit,
  } = useForgotPasswordDialog()

  return (
    <>
      <Form.Provider {...form}>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <Card.Content className="flex flex-col gap-4 sm:gap-6">
            <Form.Field
              name="email"
              control={form.control}
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Email</Form.Label>
                  <Form.Control>
                    <Input
                      {...field}
                      placeholder="Email"
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
            <Form.Field
              name="password"
              control={form.control}
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Senha</Form.Label>
                  <Form.Control>
                    <Input
                      {...field}
                      placeholder="Senha"
                      type={viewPassword ? 'text' : 'password'}
                      iconsStart={[
                        {
                          key: LockKeyhole.displayName ?? 'LockKeyhole',
                          icon: LockKeyhole,
                        },
                      ]}
                      iconsEnd={[
                        {
                          key: viewPassword
                            ? (EyeOff.displayName ?? 'EyeOff')
                            : (Eye.displayName ?? 'Eye'),
                          icon: viewPassword ? EyeOff : Eye,
                          onClick: () =>
                            setViewPassword((oldValue) => !oldValue),
                        },
                      ]}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </Card.Content>
          <Card.Footer className="flex-col gap-6">
            <Button
              className="w-full"
              variant="default"
              type="submit"
              disabled={form.buttonDisabled}
            >
              Entrar
            </Button>

            <div className="flex flex-col gap-2">
              <Button
                className="flex flex-row items-center"
                variant="link"
                type="button"
                onClick={openForgotPassword}
              >
                Esqueci minha senha <ChevronRight />
              </Button>

              <Button
                className="flex flex-row items-center"
                variant="link"
                onClick={() => navigate(generateRoutePath('SIGN_UP'))}
              >
                Criar minha conta <ChevronRight />
              </Button>
            </div>
          </Card.Footer>
        </form>
      </Form.Provider>

      <ForgotPasswordDialog
        isOpen={isForgotPasswordOpen}
        onClose={closeForgotPassword}
        form={forgotPasswordForm}
        handleSubmit={handleForgotPasswordSubmit}
      />
    </>
  )
}

LoginForm.displayName = 'LoginForm'
