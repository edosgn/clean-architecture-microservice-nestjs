import { Inventory } from '@warehouse/infrastructure/entities/db/inventory.entity';
import {
  GetOneInventoryByIngredientIdEntity,
  InventoryEntity,
} from '../entities/inventory.entity';
export abstract class IInventoryService {
  abstract create(payload: InventoryEntity): Promise<Inventory>;
  abstract findAll(): Promise<Inventory[]>;
  abstract findOneByIngredientId(
    payload: GetOneInventoryByIngredientIdEntity,
  ): Promise<Inventory>;
}
