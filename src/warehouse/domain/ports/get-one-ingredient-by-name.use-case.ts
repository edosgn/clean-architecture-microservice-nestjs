import { GetOneIngredientByNameEntity, IngredientEntity } from '../entities/ingredient.entity';

export abstract class IGetOneIngredientByNameUseCase {
  abstract execute(
    payload: GetOneIngredientByNameEntity,
  ): Promise<IngredientEntity>;
}
