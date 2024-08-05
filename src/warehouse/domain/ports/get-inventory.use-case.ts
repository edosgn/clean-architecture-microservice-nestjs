import { ResponseEntity } from '@core/domain/entities/response.entity';

export abstract class IGetInventoryUseCase {
  abstract execute(): Promise<ResponseEntity | void>;
}
