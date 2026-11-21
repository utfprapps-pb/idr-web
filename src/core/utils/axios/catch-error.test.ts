import { AxiosError, AxiosHeaders } from 'axios'
import { describe, expect, it } from 'vitest'

import { getApiErrorMessage, getProblemDetailMessage } from './catch-error'

function axiosErrorWith(data: unknown, status = 400): AxiosError {
  const config = { headers: new AxiosHeaders() }
  return new AxiosError('Request failed', 'ERR_BAD_REQUEST', config, null, {
    data,
    status,
    statusText: '',
    headers: {},
    config,
  })
}

describe('getProblemDetailMessage', () => {
  it('usa o detail', () => {
    expect(
      getProblemDetailMessage({ title: 'Acesso negado', detail: 'Sem acesso' })
    ).toBe('Sem acesso')
  })

  it('usa o title quando não há detail', () => {
    expect(getProblemDetailMessage({ title: 'Acesso negado' })).toBe(
      'Acesso negado'
    )
  })

  it('trata detail vazio como ausente', () => {
    expect(
      getProblemDetailMessage({ title: 'Acesso negado', detail: '' })
    ).toBe('Acesso negado')
  })

  it('ignora o formato antigo { message }', () => {
    expect(getProblemDetailMessage({ message: 'x' })).toBeUndefined()
  })

  it('ignora corpo que não é objeto', () => {
    expect(getProblemDetailMessage('<html>502</html>')).toBeUndefined()
    expect(getProblemDetailMessage(null)).toBeUndefined()
    expect(getProblemDetailMessage(undefined)).toBeUndefined()
  })
})

describe('getApiErrorMessage', () => {
  it('lê o problem+json do AxiosError', () => {
    expect(
      getApiErrorMessage(axiosErrorWith({ detail: 'Código inválido' }))
    ).toBe('Código inválido')
  })

  it('usa o fallback quando não há resposta', () => {
    const error = new AxiosError('Network Error', 'ERR_NETWORK')
    expect(getApiErrorMessage(error)).toBe(
      'Erro inesperado, tente novamente mais tarde'
    )
  })

  it('usa o fallback quando o corpo está no formato antigo', () => {
    expect(getApiErrorMessage(axiosErrorWith({ message: 'antigo' }))).toBe(
      'Erro inesperado, tente novamente mais tarde'
    )
  })
})
