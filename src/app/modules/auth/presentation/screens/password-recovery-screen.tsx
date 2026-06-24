import { Eye, EyeOff, KeyRound, LockKeyhole } from 'lucide-react'

import { LogoIdr, LogoParana } from '@/app/assets/imgs'
import { generateRoutePath } from '@/core/main/routes/generate-route-path'
import {
  Button,
  Card,
  Form,
  Input,
  Wave,
} from '@/core/presentation/components/ui'
import { useIdrNavigate } from '@/core/presentation/hooks'

import { usePasswordRecoveryScreen } from './password-recovery-screen.hook'

export function PasswordRecoveryScreen() {
  const {
    step,
    codeForm,
    passwordForm,
    viewPassword,
    setViewPassword,
    viewConfirmPassword,
    setViewConfirmPassword,
    handleSubmitCode,
    handleSubmitPassword,
    handleGoBack,
  } = usePasswordRecoveryScreen()

  const { navigate } = useIdrNavigate()

  return (
    <section className="flex flex-col items-center justify-center h-full relative">
      <Wave className="absolute top-0 left-0" />

      <img
        className="absolute bottom-10 left-10 w-auto h-auto max-w-[250px] max-md:hidden"
        src={LogoParana}
        alt="Logo representando o estado do Paraná"
      />

      <div className="flex justify-center w-full p-4 z-10 sm:p-0">
        <Card.Container className="max-w-[800px] shadow-200 w-full gap-8 p-4 sm:p-8">
          <Card.Header className="flex flex-col items-center">
            <img
              className="w-auto h-auto max-w-[250px]"
              src={LogoIdr}
              alt="Logo representando o IDR-Paraná"
            />
          </Card.Header>

          {step === 'code' && (
            <Form.Provider {...codeForm}>
              <form className="flex flex-col gap-8" onSubmit={handleSubmitCode}>
                <Card.Content className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Recuperar senha
                  </h2>
                  <p className="text-sm text-slate-600">
                    Digite o código de recuperação enviado para o seu e-mail.
                  </p>

                  <div className="mt-4">
                    <Form.Field
                      name="recoveryCode"
                      control={codeForm.control}
                      render={({ field }) => (
                        <Form.Item>
                          <Form.Label>Código de recuperação</Form.Label>
                          <Form.Control>
                            <Input
                              {...field}
                              placeholder="Ex: a1b2c3d4"
                              iconsStart={[
                                {
                                  key: KeyRound.displayName ?? 'KeyRound',
                                  icon: KeyRound,
                                },
                              ]}
                            />
                          </Form.Control>
                          <Form.Message />
                        </Form.Item>
                      )}
                    />
                  </div>
                </Card.Content>

                <Card.Footer className="flex flex-col gap-4">
                  <Button
                    className="w-full"
                    variant="default"
                    type="submit"
                    disabled={codeForm.buttonDisabled}
                  >
                    Validar código
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    type="button"
                    onClick={() => navigate(generateRoutePath('LOGIN'))}
                  >
                    Voltar para o login
                  </Button>
                </Card.Footer>
              </form>
            </Form.Provider>
          )}

          {step === 'password' && (
            <Form.Provider {...passwordForm}>
              <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmitPassword}
              >
                <Card.Content className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Nova senha
                  </h2>
                  <p className="text-sm text-slate-600">
                    Escolha uma nova senha para a sua conta.
                  </p>

                  <div className="flex flex-col gap-4 mt-4">
                    <Form.Field
                      name="newPassword"
                      control={passwordForm.control}
                      render={({ field }) => (
                        <Form.Item>
                          <Form.Label>Nova senha</Form.Label>
                          <Form.Control>
                            <Input
                              {...field}
                              placeholder="Nova senha"
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
                                  onClick: () => setViewPassword((v) => !v),
                                },
                              ]}
                            />
                          </Form.Control>
                          <Form.Message />
                        </Form.Item>
                      )}
                    />

                    <Form.Field
                      name="confirmPassword"
                      control={passwordForm.control}
                      render={({ field }) => (
                        <Form.Item>
                          <Form.Label>Confirmar nova senha</Form.Label>
                          <Form.Control>
                            <Input
                              {...field}
                              placeholder="Confirmar nova senha"
                              type={viewConfirmPassword ? 'text' : 'password'}
                              iconsStart={[
                                {
                                  key: LockKeyhole.displayName ?? 'LockKeyhole',
                                  icon: LockKeyhole,
                                },
                              ]}
                              iconsEnd={[
                                {
                                  key: viewConfirmPassword
                                    ? (EyeOff.displayName ?? 'EyeOff')
                                    : (Eye.displayName ?? 'Eye'),
                                  icon: viewConfirmPassword ? EyeOff : Eye,
                                  onClick: () =>
                                    setViewConfirmPassword((v) => !v),
                                },
                              ]}
                            />
                          </Form.Control>
                          <Form.Message />
                        </Form.Item>
                      )}
                    />
                  </div>
                </Card.Content>

                <Card.Footer className="flex flex-col gap-4">
                  <Button
                    className="w-full"
                    variant="default"
                    type="submit"
                    disabled={passwordForm.buttonDisabled}
                  >
                    Redefinir senha
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    type="button"
                    onClick={handleGoBack}
                    disabled={passwordForm.buttonDisabled}
                  >
                    Voltar
                  </Button>
                </Card.Footer>
              </form>
            </Form.Provider>
          )}
        </Card.Container>
      </div>
    </section>
  )
}

PasswordRecoveryScreen.displayName = 'PasswordRecoveryScreen'
