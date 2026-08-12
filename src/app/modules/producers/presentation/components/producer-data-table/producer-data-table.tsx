import { DataTable, Input } from '@/core/presentation/components/ui'

import { useProducerDataTable } from './producer-data-table.hook'

import type { ProducerModel } from '../../../domain/models/producers-model'

export function ProducerDataTable() {
  const { columns, producers, isLoading, filters, page, setFilters, setPage } =
    useProducerDataTable()

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={filters.terms ?? ''}
        className="w-fit"
        onChange={({ target }) => {
          setFilters({ terms: target.value })
        }}
        placeholder="Procurar por produtor"
      />

      <DataTable<ProducerModel>
        columns={columns}
        data={producers.resources}
        totalPages={producers.totalPages}
        pagination={{
          currentPage: page,
          onPageChange: setPage,
        }}
        loading={isLoading}
      />
    </div>
  )
}

ProducerDataTable.displayName = 'ProducerDataTable'
