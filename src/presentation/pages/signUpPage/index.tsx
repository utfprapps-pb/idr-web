import { LogoIdr, LogoParana } from '@/assets/imgs'
import { Button, Card, Wave, Form } from '@/presentation/components/ui'

import { useSignUpPage } from './useSignUpPage'
import { useSignUpPageInputData } from './useSignUpPageInputData'

import type { SignUpPageProps } from './types'

export const SignUpPage: React.FC<SignUpPageProps> = ({
	createUser,
	getCep
}) => {
	const { form, isFirstStep, buttonDisabled, cepLoading, handleSubmit } =
		useSignUpPage({
			createUser,
			getCep
		})

	const { inputDataFirstStep, inputDataSecondStep } = useSignUpPageInputData({
		control: form.control,
		cepLoading
	})

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

						<Card.Title>
							{isFirstStep ? 'Dados Pessoais' : 'Dados de Endereço'}
						</Card.Title>
					</Card.Header>
					<Form.Provider {...form}>
						<form className="flex flex-col gap-8" onSubmit={handleSubmit}>
							<Card.Content className="flex flex-col gap-4 sm:gap-6">
								{isFirstStep
									? inputDataFirstStep.map((component) => component)
									: inputDataSecondStep.map((component) => component)}
							</Card.Content>
							<Card.Footer>
								<Button
									className="w-full"
									variant={isFirstStep ? 'secondary' : 'default'}
									type="submit"
									disabled={buttonDisabled}
								>
									{isFirstStep ? 'Continuar' : 'Cadastrar'}
								</Button>
							</Card.Footer>
						</form>
					</Form.Provider>
				</Card.Container>
			</div>
		</section>
	)
}
