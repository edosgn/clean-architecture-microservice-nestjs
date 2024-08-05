import { InventoryEntity } from '@warehouse/domain/entities/inventory.entity';
import { ResponseEntity } from '@core/domain/entities/response.entity';

export abstract class IUpdateInventoryUseCase {
  abstract execute(payload: InventoryEntity): Promise<ResponseEntity | void>;
}
