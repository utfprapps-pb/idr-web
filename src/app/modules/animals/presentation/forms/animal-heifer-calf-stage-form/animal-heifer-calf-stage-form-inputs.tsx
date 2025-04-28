import { useEffect } from 'react'

import { useFormContext } from 'react-hook-form'

import { floatMask, onlyNumbersMask } from '@/core/masker'
import {
  DatePicker,
  Form,
  Select,
  Input,
  Label,
} from '@/core/presentation/components/ui'
import { Grouper } from '@/core/presentation/components/utils'

import { AnimalHeiferCalfStageFormSchema } from '../../validations/animal-heifer-calf-stage-form-schema'

export function AnimalHeiferCalfStageFormInputs() {
  const form = useFormContext<AnimalHeiferCalfStageFormSchema>()

  const amountOfMilkCorrection =
    Number(form.watch('amountOfMilk.correction').replace(',', '.')) ?? 0

  useEffect(() => {
    if (amountOfMilkCorrection) {
      form.setValue(
        'amountOfMilk.morning',
        floatMask((amountOfMilkCorrection / 2).toFixed(2))
      )
      form.setValue(
        'amountOfMilk.afternoon',
        floatMask((amountOfMilkCorrection / 2).toFixed(2))
      )
    }
  }, [amountOfMilkCorrection, form])

  return (
    <>
      <Form.Field
        name="weighingDate"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Data da Pesagem*</Form.Label>
              <Form.Control>
                <DatePicker
                  date={field.value}
                  onSelect={field.onChange}
                  isError={!!error?.message}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="ecc"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>ECC*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="2,4"
                  isError={!!error?.message}
                  mask={floatMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <div className="space-y-2">
        <Label>Idade</Label>

        <Grouper>
          <Form.Field
            name="age.years"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Anos</Form.Label>
                  <Form.Control>
                    <Input {...field} isError={!!error?.message} disabled />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />

          <Form.Field
            name="age.months"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Meses</Form.Label>
                  <Form.Control>
                    <Input {...field} isError={!!error?.message} disabled />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />
        </Grouper>
      </div>

      <div className="space-y-2">
        <Label>Pesagem</Label>

        <Grouper>
          <Form.Field
            name="weighing.last"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Anterior</Form.Label>
                  <Form.Control>
                    <Input {...field} isError={!!error?.message} disabled />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />

          <Form.Field
            name="weighing.current"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Atual*</Form.Label>
                  <Form.Control>
                    <Input
                      {...field}
                      isError={!!error?.message}
                      mask={floatMask}
                      placeholder="80,3"
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />
        </Grouper>
      </div>

      <div className="space-y-2">
        <Label>Estimativa de Peso para a Idade</Label>

        <Grouper>
          <Form.Field
            name="ageWeightEstimate.min"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Mínimo</Form.Label>
                  <Form.Control>
                    <Input {...field} isError={!!error?.message} disabled />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />

          <Form.Field
            name="ageWeightEstimate.max"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Máximo</Form.Label>
                  <Form.Control>
                    <Input {...field} isError={!!error?.message} disabled />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />
        </Grouper>
      </div>

      <div className="space-y-2">
        <Label>GMD (kg/dia)</Label>

        <Grouper>
          <Form.Field
            name="gmd.min"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Mínimo</Form.Label>
                  <Form.Control>
                    <Input {...field} isError={!!error?.message} disabled />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />

          <Form.Field
            name="gmd.max"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Máximo</Form.Label>
                  <Form.Control>
                    <Input {...field} isError={!!error?.message} disabled />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />

          <Form.Field
            name="gmd.real"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Real</Form.Label>
                  <Form.Control>
                    <Input {...field} isError={!!error?.message} disabled />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />
        </Grouper>
      </div>

      <Form.Field
        name="gmd.status"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Status do GMD</Form.Label>
              <Select.Root onValueChange={field.onChange} value={field.value}>
                <Form.Control>
                  <Select.Trigger disabled isError={!!error?.message}>
                    <Select.Value />
                  </Select.Trigger>
                </Form.Control>
                <Select.Content>
                  <Select.Item value="normal">Ideal</Select.Item>
                  <Select.Item value="underweight">Baixo</Select.Item>
                  <Select.Item value="overweight">Alto</Select.Item>
                </Select.Content>
              </Select.Root>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <div className="space-y-2">
        <Label>Quantidade de Litros (litros)</Label>

        <Grouper>
          <Form.Field
            name="amountOfMilk.correction"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Correção</Form.Label>
                  <Form.Control>
                    <Input
                      {...field}
                      isError={!!error?.message}
                      mask={floatMask}
                      placeholder="100,00"
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />

          <Form.Field
            name="amountOfMilk.morning"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Manhã</Form.Label>
                  <Form.Control>
                    <Input {...field} isError={!!error?.message} disabled />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />

          <Form.Field
            name="amountOfMilk.afternoon"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Tarde</Form.Label>
                  <Form.Control>
                    <Input {...field} isError={!!error?.message} disabled />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />
        </Grouper>
      </div>

      <div className="space-y-2">
        <Label>Data do desmame</Label>

        <Grouper>
          <Form.Field
            name="weaningDate.first"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Primeiro</Form.Label>
                  <Form.Control>
                    <DatePicker
                      date={field.value}
                      onSelect={field.onChange}
                      isError={!!error?.message}
                      disabled
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />

          <Form.Field
            name="weaningDate.second"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Segundo</Form.Label>
                  <Form.Control>
                    <DatePicker
                      date={field.value}
                      onSelect={field.onChange}
                      isError={!!error?.message}
                      disabled
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />
        </Grouper>
      </div>

      <Form.Field
        name="removeLittleHouseDate"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Retirar da Casinha em</Form.Label>
              <Form.Control>
                <DatePicker
                  date={field.value}
                  onSelect={field.onChange}
                  isError={!!error?.message}
                  disabled
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <div className="space-y-2">
        <Label>Quantidade de Concentrado Estimado (kg/dia)</Label>

        <Grouper>
          <Form.Field
            name="amountOfEstimateConcentrate.correction"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Correção (kg/dia)</Form.Label>
                  <Form.Control>
                    <Input
                      {...field}
                      isError={!!error?.message}
                      mask={floatMask}
                      placeholder="100,00"
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />

          <Form.Field
            name="amountOfEstimateConcentrate.calf"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Bezerras</Form.Label>
                  <Form.Control>
                    <Input {...field} isError={!!error?.message} disabled />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />

          <Form.Field
            name="amountOfEstimateConcentrate.heifer"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Novilhas</Form.Label>
                  <Form.Control>
                    <Input {...field} isError={!!error?.message} disabled />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />
        </Grouper>
      </div>

      <Form.Field
        name="bulky"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Volumoso (kg/dia)</Form.Label>
              <Form.Control>
                <Input {...field} isError={!!error?.message} disabled />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="dateToProvideSilage"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Fornecer Silagem a partir de</Form.Label>
              <Form.Control>
                <DatePicker
                  date={field.value}
                  onSelect={field.onChange}
                  isError={!!error?.message}
                  disabled
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <div className="space-y-2">
        <Label>Reprodução</Label>

        <Grouper>
          <Form.Field
            name="reproduction.status"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Status</Form.Label>
                  <Select.Root
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <Form.Control>
                      <Select.Trigger disabled isError={!!error?.message}>
                        <Select.Value />
                      </Select.Trigger>
                    </Form.Control>
                    <Select.Content>
                      <Select.Item value="fit">Apto</Select.Item>
                      <Select.Item value="unfit">Inapto</Select.Item>
                    </Select.Content>
                  </Select.Root>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />

          <Form.Field
            name="reproduction.minWeight"
            control={form.control}
            render={({ field, fieldState }) => {
              const { error } = fieldState

              return (
                <Form.Item>
                  <Form.Label>Peso Mínimo</Form.Label>
                  <Form.Control>
                    <Input {...field} isError={!!error?.message} disabled />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )
            }}
          />
        </Grouper>

        <Form.Field
          name="reproduction.fromDate"
          control={form.control}
          render={({ field, fieldState }) => {
            const { error } = fieldState

            return (
              <Form.Item>
                <Form.Label>A partir de</Form.Label>
                <Form.Control>
                  <DatePicker
                    date={field.value}
                    onSelect={field.onChange}
                    isError={!!error?.message}
                    disabled
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )
          }}
        />

        <Form.Field
          name="reproduction.carriedOut"
          control={form.control}
          render={({ field, fieldState }) => {
            const { error } = fieldState

            return (
              <Form.Item>
                <Form.Label>Realizada em</Form.Label>
                <Form.Control>
                  <DatePicker
                    date={field.value}
                    onSelect={field.onChange}
                    isError={!!error?.message}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )
          }}
        />

        <Form.Field
          name="reproduction.artificialInseminationNumber"
          control={form.control}
          render={({ field, fieldState }) => {
            const { error } = fieldState

            return (
              <Form.Item>
                <Form.Label>Número de Inseminação Artificial</Form.Label>
                <Form.Control>
                  <Input
                    {...field}
                    isError={!!error?.message}
                    mask={onlyNumbersMask}
                    placeholder="12345"
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )
          }}
        />
      </div>
    </>
  )
}

AnimalHeiferCalfStageFormInputs.displayName = 'AnimalHeiferCalfStageFormInputs'
