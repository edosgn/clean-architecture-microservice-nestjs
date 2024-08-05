import { Injectable } from '@nestjs/common';

import { IInventoryRepository } from '@warehouse/domain/repositories/inventory.repository';
import { DatabaseRepository } from './database.repository';
import { Inventory } from '../entities/db/inventory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryRepositoryImpl
  extends DatabaseRepository<Inventory>
  implements IInventoryRepository
{
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {
    super(inventoryRepository);
  }
}
