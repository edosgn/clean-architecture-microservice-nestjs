import { BadRequestException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { IGetOneIngredientByNameUseCase } from '@warehouse/domain/ports/get-one-ingredient-by-name.use-case';

import { IIngredientService } from '@warehouse/domain/services/ingredient.service';

import { GetOneIngredientByNameEntity, IngredientEntity } from '@warehouse/domain/entities/ingredient.entity';

@Injectable()
export class GetOneIngredientByNameUseCase
  implements IGetOneIngredientByNameUseCase
{
  constructor(private readonly ingredientService: IIngredientService) {}
  async execute(payload: GetOneIngredientByNameEntity): Promise<IngredientEntity> {
      return await this.ingredientService.findOneByName(payload);
  }
}
