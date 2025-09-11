import { LogoIdr, LogoParana } from '@/app/assets/imgs'
import { Card, Wave } from '@/core/presentation/components/ui'

import { SignUpForm } from '../forms/sign-up-form/sign-up-form'

export function SignUpScreen() {
  return (
    <section className="flex flex-col items-center h-full relative sm:flex-row">
      <Wave className="sm:absolute sm:top-0 sm:left-0" />

      <img
        className="absolute bottom-10 left-10 w-auto h-auto max-w-[250px] max-md:hidden"
        src={LogoParana}
        alt="Logo representando o estado do Paraná"
      />

      <div className="flex justify-center w-full p-4 z-10 sm:p-0">
        <Card.Container className="max-w-[800px] shadow-200 w-full gap-8 p-4 sm:p-8">
          <Card.Header className="flex flex-col items-center gap-6 sm:flex-row-reverse sm:justify-between">
            <img
              className="w-auto h-auto max-w-[250px]"
              src={LogoIdr}
              alt="Logo representando o IDR-Paraná"
            />

            <Card.Title>Dados Pessoais</Card.Title>
          </Card.Header>
          <SignUpForm />
        </Card.Container>
      </div>
    </section>
  )
}

SignUpScreen.displayName = 'SignUpScreen'
