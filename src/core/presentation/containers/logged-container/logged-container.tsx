import type { PropsWithChildren, CSSProperties } from 'react'

import { LogOut } from 'lucide-react'
import { useLocation } from 'react-router-dom'

import { sidebarItems } from '@/core/main/routes/menu'
import { Button, Header, Sidebar } from '@/core/presentation/components/ui'
import { useAuth, useIdrNavigate } from '@/core/presentation/hooks'
import { cn } from '@/core/utils'

type SectionProps = React.HTMLAttributes<HTMLDivElement>

export type LoggedContainerProps = PropsWithChildren<SectionProps>

export type StylesProps = {
  inline: CSSProperties
  className: string
}

export function LoggedContainer({
  children,
  className,
  ...props
}: LoggedContainerProps) {
  const { pathname: currentPathname } = useLocation()
  const { navigate } = useIdrNavigate()
  const { signOut, user } = useAuth()

  return (
    <main
      style={{
        gridTemplateAreas: `'Header Header'
                            'Sidebar Content'`,
        gridTemplateColumns: '325px 1fr',
        gridTemplateRows: '82px 1fr',
      }}
      className={cn('w-screen h-screen grid', className)}
      {...props}
    >
      <Header
        displayName={user?.name ?? ''}
        imageUrl=""
        style={{
          gridArea: 'Header',
        }}
      />

      <Sidebar.Root
        className="shadow-200 border-r border-slate-200"
        style={{
          gridArea: 'Sidebar',
        }}
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

      <div
        className="overflow-y-auto p-10"
        style={{
          gridArea: 'Content',
        }}
      >
        {children}
      </div>
    </main>
  )
}
LoggedContainer.displayName = 'LoggedContainer'
