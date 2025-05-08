import { IngredientEntity } from '@warehouse/domain/entities/ingredient.entity';
export abstract class ICreateIngredientUseCase {
  abstract execute(payload: IngredientEntity): Promise<IngredientEntity | void>;
}
