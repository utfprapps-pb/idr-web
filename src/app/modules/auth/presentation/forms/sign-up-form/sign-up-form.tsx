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
  const { form, isFirstStep, handleCreateUser } = useSignUpForm()

  return (
    <Form.Provider {...form}>
      <form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(handleCreateUser)}
      >
        <Card.Content className="flex flex-col gap-4 sm:gap-6">
          <FormFields isFirstStep={isFirstStep} />
        </Card.Content>
        <Card.Footer>
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
