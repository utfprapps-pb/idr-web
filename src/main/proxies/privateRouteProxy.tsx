import { PropsWithChildren, useMemo } from 'react'

import { CaretDown, SignOut, UserCircle } from 'phosphor-react'
import { toast } from 'react-hot-toast'
import { Navigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { uiAvatarsApi } from '@/infra/http'
import { menuItems } from '@/main/routes/menu'
import { Menu, Popover } from '@/presentation/components/navigation'
import { Header, Text } from '@/presentation/components/ui'
import {
	ActionsDropdown,
	ActionsDropdownProps
} from '@/presentation/components/ui/actionsDropdown'
import { Avatar } from '@/presentation/components/ui/avatar'
import { LoggedContainer } from '@/presentation/containers'
import { useAuth } from '@/presentation/store'

import { PAGE_PATHS } from '../routes/paths'

type HeaderItems = ActionsDropdownProps['Item'][]

const Main = styled.main`
	width: 100vw;
	height: 100vh;
	height: 100dvh;

	display: grid;
	grid-template-columns: 320px 1fr;
	grid-template-rows: 80px 1fr;
	grid-template-areas:
		'Sidebar Header'
		'Sidebar Content';
`

export const PrivateRouteProxy: React.FC<PropsWithChildren> = ({
	children
}) => {
	const { auth, handleSignOut } = useAuth()
	const { pathname } = useLocation()

	const isActive = (path: string) => pathname === path

	const headerItems = useMemo<HeaderItems>(
		() => [
			{
				icon: UserCircle,
				text: 'Perfil',
				onClick: () => toast('Em breve')
			},
			{
				icon: SignOut,
				text: 'Sair',
				onClick: handleSignOut
			}
		],
		[handleSignOut]
	)

	if (auth?.token)
		return (
			<Main>
				<Menu.Root>
					<Menu.Logo>IDR</Menu.Logo>
					<Menu.Container>
						{menuItems.map(({ text, to, icon }) => (
							<Menu.Item to={to} key={to} active={isActive(to)}>
								<Menu.ItemIcon icon={icon} />
								<Menu.ItemText text={text} />
							</Menu.Item>
						))}
					</Menu.Container>
				</Menu.Root>
				<Header.Root>
					<Header.UserContent>
						{/* ToDo: fix it with API */}
						<Avatar
							src={`${uiAvatarsApi.defaults.baseURL}?name=Nome do usuário`}
							alt="User profile photo"
						/>
						<Text size="b2" color="darkgray">
							Nome do user
						</Text>
						<Popover.Root>
							<Popover.Trigger>
								<CaretDown />
							</Popover.Trigger>
							<Popover.Content>
								<ActionsDropdown.Root>
									{headerItems.map(({ icon, text, onClick }) => (
										<ActionsDropdown.Item key={text} onClick={onClick}>
											<ActionsDropdown.Icon icon={icon} />
											<ActionsDropdown.Text text={text} />
										</ActionsDropdown.Item>
									))}
								</ActionsDropdown.Root>
							</Popover.Content>
						</Popover.Root>
					</Header.UserContent>
				</Header.Root>
				<LoggedContainer>{children}</LoggedContainer>
			</Main>
		)

	return <Navigate to={PAGE_PATHS.login} />
}
