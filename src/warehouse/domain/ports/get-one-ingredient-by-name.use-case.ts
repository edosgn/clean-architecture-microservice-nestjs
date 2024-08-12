import { ResponseEntity } from '@core/domain/entities/response.entity';
import { GetOneIngredientByNameEntity } from '../entities/ingredient.entity';

export abstract class IGetOneIngredientByNameUseCase {
  abstract execute(
    payload: GetOneIngredientByNameEntity,
  ): Promise<ResponseEntity | void>;
}
