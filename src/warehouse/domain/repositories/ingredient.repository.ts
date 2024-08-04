import { Ingredient } from '@warehouse/infrastructure/entities/db/ingredient.entity';
import { IDatabaseRepository } from './database.repository';

export abstract class IIngredientRepository extends IDatabaseRepository<Ingredient> {}
