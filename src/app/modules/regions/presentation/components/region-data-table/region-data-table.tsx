import { DataTable, Input } from '@/core/presentation/components/ui'

import { useRegionDataTable } from './region-data-table.hook'

import type { RegionModel } from '../../../domain/models/regions-model'

export function RegionDataTable() {
  const { columns, regions, isLoading, terms, page, setTerms, setPage } =
    useRegionDataTable()

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={terms}
        className="w-fit"
        onChange={({ target }) => setTerms(target.value)}
        placeholder="Procurar por região"
      />

      <DataTable<RegionModel>
        columns={columns}
        data={regions.resources}
        totalPages={regions.totalPages}
        pagination={{
          currentPage: page,
          onPageChange: setPage,
        }}
        loading={isLoading}
      />
    </div>
  )
}

RegionDataTable.displayName = 'RegionDataTable'
