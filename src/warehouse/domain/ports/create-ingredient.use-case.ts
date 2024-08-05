import { IngredientEntity } from '@warehouse/domain/entities/ingredient.entity';
import { ResponseEntity } from '@core/domain/entities/response.entity';

export abstract class ICreateIngredientUseCase {
  abstract execute(data: IngredientEntity): Promise<ResponseEntity | void>;
}
