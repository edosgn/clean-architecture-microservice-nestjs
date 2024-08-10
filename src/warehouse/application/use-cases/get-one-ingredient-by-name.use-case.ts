import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { IGetOneIngredientByNameUseCase } from '@warehouse/domain/ports/get-one-ingredient-by-name.use-case';

import { IIngredientService } from '@warehouse/domain/services/ingredient.service';

import { ResponseEntity } from '@core/domain/entities/response.entity';

import { GetOneIngredientByNameEntity } from '@warehouse/domain/entities/ingredient.entity';

@Injectable()
export class GetOneIngredientByNameUseCase
  implements IGetOneIngredientByNameUseCase
{
  constructor(private readonly ingredientService: IIngredientService) {}
  async execute(
    payload: GetOneIngredientByNameEntity,
  ): Promise<ResponseEntity | void> {
    try {
      const ingredient = await this.ingredientService.findOneByName(payload);

      return {
        statusCode: ingredient ? HttpStatus.OK : HttpStatus.NOT_FOUND,
        status: ingredient ? 'success' : 'warning',
        message: ingredient
          ? 'Ingrediente encontrado'
          : 'Ingrediente no encontrado',
        data: ingredient,
      };
    } catch (error) {
      throw new RpcException(new BadRequestException(error.message));
    }
  }
}
