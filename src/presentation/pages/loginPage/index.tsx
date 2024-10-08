import { ChevronRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'

import { LogoIdr, LogoParana } from '@/assets/imgs'
import { PAGE_PATHS } from '@/main/routes/paths'
import { Button, Card, Form, Input, Wave } from '@/presentation/components/ui'
import { useIdrHistory } from '@/presentation/hooks'

import { LoginPageProps } from './types'
import { useLoginPage } from './useLoginPage'

export const LoginPage: React.FC<LoginPageProps> = ({ remoteLogin }) => {
	const { form, viewPassword, setViewPassword, handleSubmit } = useLoginPage({
		remoteLogin
	})
	const { navigate } = useIdrHistory()

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
															icon: Mail
														}
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
															icon: LockKeyhole
														}
													]}
													iconsEnd={[
														{
															key: viewPassword
																? EyeOff.displayName ?? 'EyeOff'
																: Eye.displayName ?? 'Eye',
															icon: viewPassword ? EyeOff : Eye,
															onClick: () =>
																setViewPassword((oldValue) => !oldValue)
														}
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
									<Button className="flex flex-row items-center" variant="link">
										Esqueci minha senha <ChevronRight />
									</Button>

									<Button
										className="flex flex-row items-center"
										variant="link"
										onClick={() => navigate(PAGE_PATHS.signUp)}
									>
										Criar minha conta <ChevronRight />
									</Button>
								</div>
							</Card.Footer>
						</form>
					</Form.Provider>
				</Card.Container>
			</div>
		</section>
	)
}
