import { Injectable } from '@nestjs/common';

import { IIngredientService } from '@warehouse/domain/services/ingredient.service';
import { IIngredientRepository } from '@warehouse/domain/repositories/ingredient.repository';
import { IngredientEntity } from '@warehouse/domain/entities/ingredient.entity';

@Injectable()
export class IngredientServiceImpl implements IIngredientService {
  constructor(private readonly ingredientRepository: IIngredientRepository) {}

  async create(payload: IngredientEntity): Promise<IngredientEntity> {
    return await this.ingredientRepository.save(payload);
  }
}
