import { DataTable } from '@/core/presentation/components/ui'

import { ForageObservationDialog } from '../forage-observation-dialog'

import { useForageDataTable } from './forage-data-table.hook'

import type { ForageModel } from '../../../domain/models/forages-model'

export function ForageDataTable() {
  const {
    columns,
    forages,
    isLoading,
    isOpenObservationDialog,
    selectedObservation,
    handleCloseObservationDialog,
    page,
    sort,
    setSort,
    setPage,
  } = useForageDataTable()

  return (
    <>
      <DataTable<ForageModel>
        columns={columns}
        data={forages.resources}
        totalPages={forages.totalPages}
        pagination={{
          currentPage: page,
          onPageChange: setPage,
        }}
        sorting={{
          currentSorting: sort,
          onSorting: setSort,
        }}
        loading={isLoading}
      />

      {selectedObservation && (
        <ForageObservationDialog
          observation={selectedObservation}
          open={isOpenObservationDialog}
          onClose={handleCloseObservationDialog}
        />
      )}
    </>
  )
}

ForageDataTable.displayName = 'ForageDataTable'
