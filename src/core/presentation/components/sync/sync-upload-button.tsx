import { CloudUploadIcon, Loader2Icon } from 'lucide-react'

import { Button } from '@/core/presentation/components/ui'
import { useSyncContext } from '@/core/presentation/hooks/sync/use-sync-context.hook'

export function SyncUploadButton() {
  const { isSyncing, error, triggerUpload } = useSyncContext()

  if (!error) return null

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isSyncing}
      onClick={triggerUpload}
      className="border-red-300 text-red-600 hover:bg-red-50"
    >
      {isSyncing ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <CloudUploadIcon />
      )}
      {isSyncing ? 'Enviando...' : 'Tentar enviar novamente'}
    </Button>
  )
}

SyncUploadButton.displayName = 'SyncUploadButton'
