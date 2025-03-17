import { LogoIdr, LogoParana } from '@/app/assets/imgs'
import { Card, Wave } from '@/core/presentation/components/ui'

import { LoginForm } from '../forms/login-form'

export function LoginScreen() {
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
          <LoginForm />
        </Card.Container>
      </div>
    </section>
  )
}

LoginScreen.displayName = 'LoginScreen'
