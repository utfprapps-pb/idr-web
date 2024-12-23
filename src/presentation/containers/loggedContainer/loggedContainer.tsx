import { LogOut } from 'lucide-react'
import { useLocation } from 'react-router-dom'

import { sidebarItems } from '@/main/routes/menu'
import { Button, Header } from '@/presentation/components/ui'
import { Sidebar } from '@/presentation/components/ui/sidebar'
import { useAuth, useIdrNavigate } from '@/presentation/hooks'
import { cn } from '@/shared/utils'

import { styles } from './styles'

import type { LoggedContainerProps } from './types'

export const LoggedContainer: React.FC<LoggedContainerProps> = ({
  children,
  className,
  ...props
}) => {
  const { pathname: currentPathname } = useLocation()
  const { navigate } = useIdrNavigate()
  const { signOut, user } = useAuth()

  return (
    <main
      style={styles.container.inline}
      className={cn(styles.container.className, className)}
      {...props}
    >
      <Header
        displayName={user?.name ?? ''}
        imageUrl=""
        className={styles.header.className}
        style={styles.header.inline}
      />

      <Sidebar.Root
        className={styles.sidebar.className}
        style={styles.sidebar.inline}
      >
        <Sidebar.List>
          {sidebarItems.map(({ key, name, icon: Icon, path, matchPattern }) => (
            <Sidebar.Item
              key={key}
              active={new RegExp(matchPattern).test(currentPathname)}
              onClick={() => navigate(path)}
            >
              <Icon size={24} /> {name}
            </Sidebar.Item>
          ))}
        </Sidebar.List>

        <Button
          className="flex flex-row items-center justify-start gap-3 text-base font-semibold mt-auto"
          onClick={signOut}
        >
          <LogOut size={24} /> Sair
        </Button>
      </Sidebar.Root>

      <div className={styles.content.className} style={styles.content.inline}>
        {children}
      </div>
    </main>
  )
}
