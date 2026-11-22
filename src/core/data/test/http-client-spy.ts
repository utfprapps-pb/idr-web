import {
  type HttpClient,
  type HttpRequest,
  type HttpResponse,
  HttpStatusCode,
} from '@/core/data/protocols/http'

/**
 * Dublê da porta `HttpClient` para testar os remote use cases sem rede:
 * guarda as requisições recebidas e devolve a `response` configurada — ou,
 * quando `responses` tem itens, a próxima da fila (uma por requisição).
 * Só para testes; não importar em código de produção.
 */
export class HttpClientSpy<
  TModel = unknown,
  TApiModel = unknown,
  TApiResponse = TApiModel,
> implements HttpClient<TModel, TApiModel, TApiResponse>
{
  requests: HttpRequest<TModel, TApiModel>[] = []

  response: HttpResponse<TApiResponse> = { statusCode: HttpStatusCode.ok }

  responses: HttpResponse<TApiResponse>[] = []

  get lastRequest(): HttpRequest<TModel, TApiModel> | undefined {
    return this.requests.at(-1)
  }

  request = async (
    data: HttpRequest<TModel, TApiModel>
  ): Promise<HttpResponse<TApiResponse>> => {
    this.requests.push(data)

    return this.responses.shift() ?? this.response
  }
}
