import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IInventoryRepository } from '@warehouse/domain/repositories/inventory.repository';

import { DatabaseRepository } from './database.repository';

import { Inventory } from '../entities/db/inventory.entity';

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
