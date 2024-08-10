import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ICreateIngredientUseCase } from '@warehouse/domain/ports/create-ingredient.use-case';
import { IGetOneIngredientByNameUseCase } from '@warehouse/domain/ports/get-one-ingredient-by-name.use-case';

import {
  GetOneIngredientByNameEntity,
  IngredientEntity,
} from '@warehouse/domain/entities/ingredient.entity';

import { INGREDIENT_MSG } from '@warehouse/domain/enums/queues.enum';

import { MessagePattern } from '@nestjs/microservices';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientController {
  constructor(
    private createIngredientUseCase: ICreateIngredientUseCase,
    private getOneByNameIngredientUseCase: IGetOneIngredientByNameUseCase,
  ) {}

  @MessagePattern(INGREDIENT_MSG.CREATE_INGREDIENT)
  async create(@Body() payload: IngredientEntity) {
    return await this.createIngredientUseCase.execute(
      payload as IngredientEntity,
    );
  }

  @MessagePattern(INGREDIENT_MSG.GET_ONE_INGREDIENT_BY_NAME)
  async findOneByName(@Body() payload: GetOneIngredientByNameEntity) {
    return await this.getOneByNameIngredientUseCase.execute(payload);
  }
}
