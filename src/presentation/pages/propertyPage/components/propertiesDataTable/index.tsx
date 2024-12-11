import { generateRoutePath } from '@/main/routes/generateRoutePath'
import { Input, DataTable } from '@/presentation/components/ui'
import { useIdrNavigate } from '@/presentation/hooks'

import { usePropertiesDataTable } from './usePropertiesDataTable'

import type { PropertyModel } from '@/domain/models/propertyModel'

export const PropertiesDataTable: React.FC = () => {
  const {
    columns,
    properties,
    isLoading,
    filters,
    page,
    sort,
    setFilters,
    setSort,
    setPage,
  } = usePropertiesDataTable()

  const { navigate } = useIdrNavigate()

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={filters.name}
        onChange={({ target }) => {
          setFilters((prevState) => ({
            ...prevState,
            name: target.value,
          }))
        }}
        placeholder="Procurar propriedade"
      />

      <DataTable<PropertyModel>
        columns={columns}
        data={properties.resources}
        totalPages={properties.totalPages}
        onClickRow={(row) =>
          navigate(
            generateRoutePath('PROPERTIES_DETAILS', {
              params: {
                id: row.id,
              },
              query: {
                producer: row.producer,
                property: row.name,
              },
            })
          )
        }
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
    </div>
  )
}
