import { Inventory } from '@warehouse/infrastructure/entities/db/inventory.entity';
import { InventoryEntity } from '../entities/inventory.entity';
export abstract class IInventoryService {
  abstract create(payload: InventoryEntity): Promise<Inventory>;
  abstract findByIngredientId(ingredient_id: number): Promise<Inventory>;
  abstract findAll(): Promise<Inventory[]>;
}
