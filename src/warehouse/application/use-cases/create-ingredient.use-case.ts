import { Injectable } from '@nestjs/common';

import { IngredientEntity } from '@warehouse/domain/entities/ingredient.entity';

import { ICreateIngredientUseCase } from '@warehouse/domain/ports/create-ingredient.use-case';
import { IIngredientService } from '@warehouse/domain/services/ingredient.service';

@Injectable()
export class CreateIngredientUseCase implements ICreateIngredientUseCase {
  constructor(private readonly ingredientService: IIngredientService) {}
  async execute(payload: IngredientEntity): Promise<IngredientEntity | void> {
    return await this.ingredientService.create(payload);
  }
}
