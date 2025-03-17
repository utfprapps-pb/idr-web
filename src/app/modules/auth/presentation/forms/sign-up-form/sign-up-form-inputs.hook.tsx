import { useState } from 'react'

import { Mail, EyeOff, Eye } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { cpfMask, onlyNumbersMask, phoneMask, cepMask } from '@/core/masker'
import { Form, Input } from '@/core/presentation/components/ui'
import { Grouper } from '@/core/presentation/components/utils'

import type {
  SignUpFormFirstStepSchema,
  SignUpFormSecondStepSchema,
} from '../../validations/sign-up-form-schema'

export function useSignUpFormInputs(cepLoading: boolean) {
  const [viewPassword, setViewPassword] = useState(false)
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false)

  const form = useForm<SignUpFormFirstStepSchema & SignUpFormSecondStepSchema>()

  const inputDataFirstStep = [
    <Grouper key="grouper-name-email">
      <Form.Field
        key="name"
        name="name"
        control={form.control}
        render={({ field, formState }) => {
          const { name } = formState.errors

          return (
            <Form.Item>
              <Form.Label>Nome *</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  isError={!!name?.message}
                  placeholder="Digite seu nome"
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
      <Form.Field
        key="email"
        name="email"
        control={form.control}
        render={({ field, formState }) => {
          const { email } = formState.errors

          return (
            <Form.Item>
              <Form.Label>Email *</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  isError={!!email?.message}
                  placeholder="Digite seu email"
                  iconsStart={[
                    {
                      key: Mail.displayName ?? 'Mail',
                      icon: Mail,
                    },
                  ]}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
    </Grouper>,
    <Grouper key="grouper-passwords">
      <Form.Field
        key="password"
        name="password"
        control={form.control}
        render={({ field, formState }) => {
          const { password } = formState.errors

          return (
            <Form.Item>
              <Form.Label>Senha *</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  isError={!!password?.message}
                  placeholder="Digite uma senha forte"
                  type={viewPassword ? 'text' : 'password'}
                  iconsEnd={[
                    {
                      key: viewPassword
                        ? (EyeOff.displayName ?? 'EyeOff')
                        : (Eye.displayName ?? 'Eye'),
                      icon: viewPassword ? EyeOff : Eye,
                      onClick: () => setViewPassword((oldValue) => !oldValue),
                    },
                  ]}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
      <Form.Field
        key="confirmPassword"
        name="confirmPassword"
        control={form.control}
        render={({ field, formState }) => {
          const { confirmPassword } = formState.errors

          return (
            <Form.Item>
              <Form.Label>Confirmar Senha *</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  isError={!!confirmPassword?.message}
                  placeholder="Repita a senha"
                  type={viewConfirmPassword ? 'text' : 'password'}
                  iconsEnd={[
                    {
                      key: viewConfirmPassword
                        ? (EyeOff.displayName ?? 'EyeOff')
                        : (Eye.displayName ?? 'Eye'),
                      icon: viewConfirmPassword ? EyeOff : Eye,
                      onClick: () =>
                        setViewConfirmPassword((oldValue) => !oldValue),
                    },
                  ]}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
    </Grouper>,
    <Grouper key="grouper-cpf-phone">
      <Form.Field
        key="cpf"
        name="cpf"
        control={form.control}
        render={({ field, formState }) => {
          const { cpf } = formState.errors

          return (
            <Form.Item>
              <Form.Label>CPF *</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  isError={!!cpf?.message}
                  placeholder="Digite seu CPF"
                  mask={cpfMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
      <Form.Field
        key="phone"
        name="phone"
        control={form.control}
        render={({ field, formState }) => {
          const { phone } = formState.errors

          return (
            <Form.Item>
              <Form.Label>Celular *</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  isError={!!phone?.message}
                  placeholder="Digite o número do seu celular"
                  mask={phoneMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
    </Grouper>,
    <Grouper key="grouper-register-year">
      <Form.Field
        key="professionalRegister"
        name="professionalRegister"
        control={form.control}
        render={({ field, formState }) => {
          const { professionalRegister } = formState.errors

          return (
            <Form.Item>
              <Form.Label>Registro Profissional *</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  isError={!!professionalRegister?.message}
                  placeholder="Digite seu registro profissional"
                  mask={onlyNumbersMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
      <Form.Field
        key="graduationYear"
        name="graduationYear"
        control={form.control}
        render={({ field, formState }) => {
          const { graduationYear } = formState.errors

          return (
            <Form.Item>
              <Form.Label>Ano de Graduação *</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  isError={!!graduationYear?.message}
                  placeholder="Digite o ano de graduação"
                  mask={onlyNumbersMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
    </Grouper>,
  ]

  const inputDataSecondStep = [
    <Grouper key="grouper-cep-street">
      <Form.Field
        key="cep"
        name="cep"
        control={form.control}
        render={({ field, formState }) => {
          const { cep } = formState.errors

          return (
            <Form.Item>
              <Form.Label>CEP *</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  isError={!!cep?.message}
                  placeholder="Digite seu CEP"
                  mask={cepMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
      <Form.Field
        key="street"
        name="street"
        control={form.control}
        render={({ field, formState }) => {
          const { street } = formState.errors

          return (
            <Form.Item>
              <Form.Label>Rua *</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  isError={!!street?.message}
                  placeholder="Digite seu endereço"
                  disabled={cepLoading}
                  loading={cepLoading}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
    </Grouper>,
    <Grouper key="grouper-city-state">
      <Form.Field
        key="city"
        name="city"
        control={form.control}
        render={({ field, formState }) => {
          const { city } = formState.errors

          return (
            <Form.Item>
              <Form.Label>Cidade *</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  isError={!!city?.message}
                  placeholder="Digite sua cidade"
                  disabled={cepLoading}
                  loading={cepLoading}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
      <Form.Field
        key="houseNumber"
        name="houseNumber"
        control={form.control}
        render={({ field }) => (
          <Form.Item>
            <Form.Label>Número da casa</Form.Label>
            <Form.Control>
              <Input {...field} placeholder="Digite o número da casa" />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />
    </Grouper>,
  ]

  return {
    inputDataFirstStep,
    inputDataSecondStep,
  }
}
