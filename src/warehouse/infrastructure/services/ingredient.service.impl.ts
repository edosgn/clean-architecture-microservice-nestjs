import { Injectable } from '@nestjs/common';

import { IIngredientService } from '@warehouse/domain/services/ingredient.service';
import { IIngredientRepository } from '@warehouse/domain/repositories/ingredient.repository';
import {
  GetOneIngredientByNameEntity,
  IngredientEntity,
} from '@warehouse/domain/entities/ingredient.entity';
import { Ingredient } from '../entities/db/ingredient.entity';

@Injectable()
export class IngredientServiceImpl implements IIngredientService {
  constructor(private readonly ingredientRepository: IIngredientRepository) {}

  async create(payload: Ingredient): Promise<IngredientEntity> {
    return await this.ingredientRepository.save(payload);
  }

  async findOneByName(
    payload: GetOneIngredientByNameEntity,
  ): Promise<IngredientEntity> {
    return await this.ingredientRepository.findOneBy(payload);
  }
}
