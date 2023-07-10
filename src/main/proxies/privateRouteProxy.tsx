import React, { useMemo } from 'react'

import { CaretDown, SignOut, UserCircle } from 'phosphor-react'
import { Navigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { menuItems, ROUTES } from '../routes'
import { Menu, Popover } from '@/presentation/components/navigation'
import { Header, Text } from '@/presentation/components/ui'
import {
	ActionsDropdown,
	ActionsDropdownProps
} from '@/presentation/components/ui/actionsDropdown'
import { Avatar } from '@/presentation/components/ui/avatar'
import { LoggedContainer } from '@/presentation/containers'
import { useAuth } from '@/presentation/store'

type HeaderItems = ActionsDropdownProps['Item'][]

const Main = styled.main`
	width: 100vw;
	height: 100vh;

	display: grid;
	grid-template-columns: 320px 1fr;
	grid-template-rows: 80px 1fr;
	grid-template-areas:
		'Sidebar Header'
		'Sidebar Content';
`

export const PrivateRouteProxy: React.FC<{ children: React.ReactNode }> = ({
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
				onClick: () => alert('Under Construction')
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
						<Avatar src="" alt="User profile photo" />
						<Text size="b2" color="darkgray">
							{auth?.token}
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

	return <Navigate to={ROUTES.login.path()} />
}
