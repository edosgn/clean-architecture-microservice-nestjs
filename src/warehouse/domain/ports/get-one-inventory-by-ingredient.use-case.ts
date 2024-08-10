import { ResponseEntity } from '@core/domain/entities/response.entity';
import { GetOneInventoryByIngredientIdEntity } from '../entities/inventory.entity';

export abstract class IGetOneInventoryByIngredientIdUseCase {
  abstract execute(
    payload: GetOneInventoryByIngredientIdEntity,
  ): Promise<ResponseEntity | void>;
}
