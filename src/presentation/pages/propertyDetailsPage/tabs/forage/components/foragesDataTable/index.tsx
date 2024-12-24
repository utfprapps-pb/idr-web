import React from 'react'

import { DataTable } from '@/presentation/components/ui'

import { ObservationDialog } from '../observationDialog'

import { useForagesDataTable } from './useForagesDataTable'

import type { ForageModel } from '@/domain/models/forageModel'

export const ForagesDataTable: React.FC = () => {
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
  } = useForagesDataTable()

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
        <ObservationDialog
          observation={selectedObservation}
          open={isOpenObservationDialog}
          onClose={handleCloseObservationDialog}
        />
      )}
    </>
  )
}
