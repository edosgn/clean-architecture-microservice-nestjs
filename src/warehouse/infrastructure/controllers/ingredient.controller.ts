import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ICreateIngredientUseCase } from '@warehouse/domain/ports/create-ingredient.use-case';

import { IngredientEntity } from '@warehouse/domain/entities/ingredient.entity';

import { INGREDIENT_MSG } from '@warehouse/domain/enums/queues.enum';

import { MessagePattern } from '@nestjs/microservices';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientController {
  constructor(private createIngredientUseCase: ICreateIngredientUseCase) {}

  @MessagePattern(INGREDIENT_MSG.CREATE_INGREDIENT)
  async create(@Body() payload: IngredientEntity) {
    return await this.createIngredientUseCase.execute(
      payload as IngredientEntity,
    );
  }
}
