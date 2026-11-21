import { HttpResponse } from 'msw'

import type { ProblemDetails } from '@/core/utils'

/**
 * Resposta de erro no formato da API real (Problem Details, RFC 9457): mesmo status, `type` em URN
 * e `Content-Type: application/problem+json`.
 */
export function problemResponse(
  status: number,
  type: string,
  title: string,
  detail?: string
) {
  return HttpResponse.json<ProblemDetails>(
    { type: `urn:idr:problem:${type}`, title, status, detail },
    { status, headers: { 'Content-Type': 'application/problem+json' } }
  )
}
