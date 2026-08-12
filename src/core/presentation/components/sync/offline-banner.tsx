import { useEffect, useState } from 'react'

import { WifiOffIcon } from 'lucide-react'

import { cn } from '@/core/utils'

type OfflineBannerProps = { className?: string }

export function OfflineBanner({ className }: OfflineBannerProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const on = () => setIsOnline(true)
    const off = () => setIsOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  if (isOnline) return null

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-md bg-amber-50 border border-amber-200 px-4 py-2 text-sm text-amber-800',
        className
      )}
    >
      <WifiOffIcon size={16} />
      <span>
        <span className="font-medium">Modo offline</span> — os dados serão
        sincronizados ao reconectar.
      </span>
    </div>
  )
}

OfflineBanner.displayName = 'OfflineBanner'
