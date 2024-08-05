import { InventoryEntity } from '../entities/inventory.entity';

export abstract class IInventoryService {
  abstract create(payload: InventoryEntity): Promise<InventoryEntity>;
  abstract findByIngredientId(ingredient_id: number): Promise<InventoryEntity>;
  abstract update(
    id: number,
    payload: InventoryEntity,
  ): Promise<InventoryEntity>;
}
