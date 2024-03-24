import { useLocation } from 'react-router-dom'

import { sidebarItems } from '@/main/routes/menu'
import { cn } from '@/main/utils'
import { Header } from '@/presentation/components/ui'
import { Sidebar } from '@/presentation/components/ui/sidebar'
import { useIdrHistory } from '@/presentation/hooks'

import { styles } from './styles'

import type { LoggedContainerProps } from './types'

export const LoggedContainer: React.FC<LoggedContainerProps> = ({
	children,
	className,
	...props
}) => {
	const { pathname: currentPathname } = useLocation()
	const { navigate } = useIdrHistory()

	return (
		<main
			style={styles.container.inline}
			className={cn(styles.container.className, className)}
			{...props}
		>
			<Header
				displayName="Guilherme Minozzi"
				imageUrl=""
				className={styles.header.className}
				style={styles.header.inline}
			/>

			<Sidebar.Root
				className={styles.sidebar.className}
				style={styles.sidebar.inline}
			>
				<Sidebar.List>
					{sidebarItems.map(({ key, name, icon: Icon, path }) => (
						<Sidebar.Item
							key={key}
							active={path === currentPathname}
							onClick={() => navigate(path)}
						>
							<Icon size={24} /> {name}
						</Sidebar.Item>
					))}
				</Sidebar.List>
			</Sidebar.Root>

			<div className={styles.content.className} style={styles.content.inline}>
				{children}
			</div>
		</main>
	)
}
