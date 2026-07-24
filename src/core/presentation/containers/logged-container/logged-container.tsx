import type { PropsWithChildren, CSSProperties } from 'react'

import { LogOut } from 'lucide-react'
import { useLocation } from 'react-router-dom'

import { sidebarItems } from '@/core/main/routes/menu'
import { CacheStatusBadge } from '@/core/presentation/components/sync/cache-status-badge'
import { GlobalSyncIndicator } from '@/core/presentation/components/sync/global-sync-indicator'
import { SyncDownloadButton } from '@/core/presentation/components/sync/sync-download-button'
import { SyncUploadButton } from '@/core/presentation/components/sync/sync-upload-button'
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
        gridTemplateColumns: '224px 1fr',
        gridTemplateRows: 'auto 1fr',
      }}
      className={cn('w-screen h-screen grid', className)}
      {...props}
    >
      <div style={{ gridArea: 'Header' }} className="flex flex-col">
        <Header displayName={user?.name ?? ''} imageUrl="" className="flex-1" />
        <div className="flex items-center justify-end gap-4 px-5 py-1 border-b border-slate-200 bg-slate-50">
          <GlobalSyncIndicator />
          <SyncUploadButton />
          <CacheStatusBadge />
          <SyncDownloadButton />
        </div>
      </div>

      <Sidebar.Root
        className="shadow-200 border-r border-slate-200"
        style={{
          gridArea: 'Sidebar',
        }}
      >
        <Sidebar.List>
          {sidebarItems
            .filter((item) => !item.adminOnly || user?.role === 'ADMIN')
            .map(({ key, name, icon: Icon, path, matchPattern }) => (
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
        className="overflow-y-auto overflow-x-hidden"
        style={{
          gridArea: 'Content',
        }}
      >
        <div className="p-8 w-full">{children}</div>
      </div>
    </main>
  )
}
LoggedContainer.displayName = 'LoggedContainer'
