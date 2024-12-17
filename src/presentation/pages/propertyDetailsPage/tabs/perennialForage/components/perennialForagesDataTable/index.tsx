import React from 'react'

import { PerennialForageModel } from '@/domain/models/perennialForageModel'
import { DataTable } from '@/presentation/components/ui'

import { ObservationDialog } from '../observationDialog'

import { usePerennialForagesDataTable } from './usePerennialForagesDataTable'

export const PerennialForagesDataTable: React.FC = () => {
  const {
    columns,
    perennialForages,
    isLoading,
    isOpenObservationDialog,
    selectedObservation,
    handleCloseObservationDialog,
    page,
    sort,
    setSort,
    setPage,
  } = usePerennialForagesDataTable()

  return (
    <>
      <DataTable<PerennialForageModel>
        columns={columns}
        data={perennialForages.resources}
        totalPages={perennialForages.totalPages}
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
        <ObservationDialog
          observation={selectedObservation}
          open={isOpenObservationDialog}
          onClose={handleCloseObservationDialog}
        />
      )}
    </>
  )
}
