import { format } from 'date-fns';

import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http';
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors';

  ForageApiResponse,
} from '../../domain/models/forages-model';
import type { GetForagesUseCase } from '../../domain/use-cases';
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types';

export class RemoteGetForagesUseCase implements GetForagesUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      ForageModel,
      ForageApiResponse,
      ListApiResponse<ForageApiResponse[]>
    >
  ) {}

  execute: GetForagesUseCase['execute'] = async ({
    propertyId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<ForageModel, ForageApiResponse> = {
      id: 'id',
      area: 'area',
      averageCost: 'averageCost',
      cultivation: 'cultivation',
      formation: 'formation',
      observation: 'observation',
      ownershipType: 'ownershipType',
      growthCycle: 'growthCycle',
      usefulLife: 'usefulLife',
    };

    const url = this.url.replace(':propertyId', String(propertyId));

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}`,
      method: 'get',
      filters,
      pagination,
      sort,
      mapApiProperties,
    });

    if (statusCode === HttpStatusCode.ok && body) {
      const ownershipType: Record<ForageOwnershipType, string> = {
        OWNED_LAND: 'Terra Própria',
        LEASED_LAND: 'Terra Arrendada',
      };

      const growthCycle: Record<ForageGrowthCycle, string> = {
        ANNUAL: 'Anual',
        PERENNIAL: 'Perene',
      };

      const rawResources = Array.isArray(body)
        ? body
        : Array.isArray(body.content)
        ? body.content
        : [];

      const resources = rawResources.map((item) => ({
        id: item.id,
        area: item.area,
        averageCost: item.averageCost ?? 'Não informado',
        cultivation: item.cultivation ?? 'Não informado',
        formation: item.formation ? format(new Date(item.formation), 'dd/MM/yyyy') : 'Não informado',
        observation: item.observation ?? 'Sem observação',
        ownershipType: ownershipType[item.ownershipType as ForageOwnershipType] ?? 'Não informado',
        growthCycle: growthCycle[item.growthCycle as ForageGrowthCycle] ?? 'Não informado',

        
        usefulLife: item.usefulLife ?? 'Não informado',
      }));

      
      const totalPages =
        body && body.pageable && body.pageable.pageSize && body.numberOfElements
          ? Math.ceil(body.numberOfElements / body.pageable.pageSize)
          : 1; // Retorna 1 se a API não fornecer dados de paginação.

      return {
        resources,
        totalPages,
      };
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Propriedades');
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar propriedades'
      );
    }

    throw new UnexpectedError();
  };
}
