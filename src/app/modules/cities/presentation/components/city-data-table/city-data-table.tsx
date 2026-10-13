import { DataTable, Input } from '@/core/presentation/components/ui'

import { useCityDataTable } from './city-data-table.hook'

import type { CityModel } from '../../../domain/models/cities-model'

export function CityDataTable() {
  const { columns, cities, isLoading, terms, page, setTerms, setPage } =
    useCityDataTable()

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={terms}
        className="w-fit"
        onChange={({ target }) => setTerms(target.value)}
        placeholder="Procurar por cidade"
      />

      <DataTable<CityModel>
        columns={columns}
        data={cities.resources}
        totalPages={cities.totalPages}
        pagination={{
          currentPage: page,
          onPageChange: setPage,
        }}
        loading={isLoading}
      />
    </div>
  )
}

CityDataTable.displayName = 'CityDataTable'
