import { Button, Card, Form } from '@/core/presentation/components/ui'

import { useSignUpFormInputs } from './sign-up-form-inputs.hook'
import { useSignUpForm } from './sign-up-form.hook'

function FormFields({ isFirstStep }: { isFirstStep: boolean }) {
  const { inputDataFirstStep, inputDataSecondStep } = useSignUpFormInputs()

  if (isFirstStep) {
    return inputDataFirstStep
  }

  return inputDataSecondStep
}

export function SignUpForm() {
  const { form, isFirstStep, handleGoBack, handleCreateUser } = useSignUpForm()

  return (
    <Form.Provider {...form}>
      <form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(handleCreateUser)}
      >
        <Card.Content className="flex flex-col gap-4 sm:gap-6">
          <FormFields isFirstStep={isFirstStep} />
        </Card.Content>
        <Card.Footer className="flex gap-3">
          {!isFirstStep && (
            <Button
              className="w-full"
              variant="outline"
              type="button"
              onClick={handleGoBack}
            >
              Voltar
            </Button>
          )}
          <Button
            className="w-full"
            variant={isFirstStep ? 'secondary' : 'default'}
            type="submit"
            disabled={form.buttonDisabled}
          >
            {isFirstStep ? 'Continuar' : 'Cadastrar'}
          </Button>
        </Card.Footer>
      </form>
    </Form.Provider>
  )
}

SignUpForm.displayName = 'SignUpForm'
