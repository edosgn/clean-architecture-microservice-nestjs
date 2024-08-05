import { Inventory } from '@warehouse/infrastructure/entities/db/inventory.entity';
import { IDatabaseRepository } from './database.repository';

export abstract class IInventoryRepository extends IDatabaseRepository<Inventory> {}
