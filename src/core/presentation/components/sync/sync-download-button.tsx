import { CloudDownloadIcon } from 'lucide-react'

import { Button } from '@/core/presentation/components/ui'
import { useSyncDownload } from '@/core/presentation/hooks/sync/use-sync-download.hook'

export function SyncDownloadButton() {
  const { isLoading, triggerDownload } = useSyncDownload()

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      onClick={triggerDownload}
    >
      <CloudDownloadIcon />
      {isLoading ? 'Sincronizando...' : 'Sincronizar dados'}
    </Button>
  )
}

SyncDownloadButton.displayName = 'SyncDownloadButton'
