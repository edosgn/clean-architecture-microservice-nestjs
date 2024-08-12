import {
  GetOneIngredientByNameEntity,
  IngredientEntity,
} from '../entities/ingredient.entity';

export abstract class IIngredientService {
  abstract create(payload: IngredientEntity): Promise<IngredientEntity>;
  abstract findOneByName(
    payload: GetOneIngredientByNameEntity,
  ): Promise<IngredientEntity>;
}
