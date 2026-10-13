import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import producersData from '@database/producersData.json'

import type { ProducerDetailsApiResponse } from '../../domain/models/producers-model'

export const getProducerHandler = httpWithMiddleware<
  PathParams<'id'>,
  never,
  ProducerDetailsApiResponse
>({
  routePath: '/api/v1/producers/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const producerFound = producersData.find((p) => String(p.id) === params.id)

    if (!producerFound) {
      return HttpResponse.json({} as ProducerDetailsApiResponse, {
        status: HttpStatusCode.notFound,
      })
    }

    const response: ProducerDetailsApiResponse = {
      id: String(producerFound.id),
      name: producerFound.name,
      cpf: producerFound.cpf,
    }

    return HttpResponse.json(response, { status: HttpStatusCode.ok })
  },
})
