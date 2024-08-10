import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { IIngredientRepository } from '@warehouse/domain/repositories/ingredient.repository';
import { DatabaseRepository } from './database.repository';

import { Ingredient } from '../entities/db/ingredient.entity';

@Injectable()
export class IngredientRepositoryImpl
  extends DatabaseRepository<Ingredient>
  implements IIngredientRepository
{
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {
    super(ingredientRepository);
  }
}
