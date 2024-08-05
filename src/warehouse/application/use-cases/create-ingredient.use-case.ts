import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { IngredientEntity } from '@warehouse/domain/entities/ingredient.entity';

import { ICreateIngredientUseCase } from '@warehouse/domain/ports/create-ingredient.use-case';
import { IIngredientService } from '@warehouse/domain/services/ingredient.service';

import { ResponseEntity } from '@core/domain/entities/response.entity';

@Injectable()
export class CreateIngredientUseCase implements ICreateIngredientUseCase {
  constructor(private readonly ingredientService: IIngredientService) {}
  async execute(payload: IngredientEntity): Promise<ResponseEntity | void> {
    try {
      const ingredient = await this.ingredientService.create(payload);

      return {
        statusCode: HttpStatus.OK,
        status: 'success',
        message: 'Ingrediente creado',
        data: ingredient,
      };
    } catch (error) {
      throw new RpcException(new BadRequestException(error.message));
    }
  }
}
