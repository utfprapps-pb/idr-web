import { useCallback } from 'react'

import { DownloadIcon, Trash2Icon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import { baseApi } from '@/core/infra/http/api-http-client/api-http-client'
import {
  Button,
  Dropzone,
  Form,
  Input,
  Label,
} from '@/core/presentation/components/ui'

import type { PropertyFormSchema } from '../../../validations/property-form-schema'
import type { FileType } from '@/core/domain/types'

export function PropertyFormLocalizationTab() {
  const form = useFormContext<PropertyFormSchema>()

  const handleRemoveFile = useCallback(
    (index: number, files: FileType[]) => {
      const updatedFiles = [...files.slice(0, index), ...files.slice(index + 1)]

      form.setValue('localization.images', updatedFiles)
    },
    [form]
  )

  const handleDownloadAttachment = useCallback(
    async (url: string, fileName?: string) => {
      try {
        const { data } = await baseApi.get<Blob>(url, {
          responseType: 'blob',
        })
        const objectUrl = URL.createObjectURL(data)
        const link = document.createElement('a')
        link.href = objectUrl
        link.download = fileName ?? 'anexo'
        document.body.appendChild(link)
        link.click()
        link.remove()
        URL.revokeObjectURL(objectUrl)
      } catch {
        toast.error('Erro ao baixar anexo')
      }
    },
    []
  )

  return (
    <>
      <Form.Field
        control={form.control}
        name="localization.images"
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Mapas de uso de solo</Label>
                <Dropzone
                  files={field.value}
                  onChange={(files) =>
                    field.onChange([...field.value, ...files])
                  }
                  mimeType={[
                    'image/*',
                    'application/pdf',
                    'application/vnd.ms-excel',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                  ]}
                  error={error?.message}
                />
              </div>
              <div className="flex flex-col gap-2">
                {field.value.map((item, index) => {
                  const isExisting = !!item.preview && !item.file
                  const label = isExisting
                    ? (item.fileName ?? item.preview)
                    : item.file?.name

                  return (
                    <div
                      key={item.id ?? item.preview ?? item.file?.name ?? index}
                      className="flex items-center w-full justify-between gap-1"
                    >
                      <span className="max-w-[80%] truncate">{label}</span>
                      <div className="flex gap-1">
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            isExisting
                              ? handleDownloadAttachment(item.preview!, label)
                              : window.open(
                                  URL.createObjectURL(item.file!),
                                  '_blank'
                                )
                          }
                        >
                          <DownloadIcon />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          onClick={() => handleRemoveFile(index, field.value)}
                        >
                          <Trash2Icon className="text-destructive" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }}
      />

      <Form.Field
        name="localization.latitude"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Latitude</Form.Label>
              <Form.Control>
                <Input {...field} isError={!!error?.message} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="localization.longitude"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Longitude</Form.Label>
              <Form.Control>
                <Input {...field} isError={!!error?.message} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
    </>
  )
}

PropertyFormLocalizationTab.displayName = 'PropertyFormLocalizationTab'
