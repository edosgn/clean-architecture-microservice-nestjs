import { Injectable } from '@nestjs/common';

import { IInventoryService } from '@warehouse/domain/services/inventory.service';
import { IInventoryRepository } from '@warehouse/domain/repositories/inventory.repository';
import { InventoryEntity } from '@warehouse/domain/entities/inventory.entity';

@Injectable()
export class InventoryServiceImpl implements IInventoryService {
  constructor(private readonly inventoryRepository: IInventoryRepository) {}

  async create(payload: InventoryEntity): Promise<InventoryEntity> {
    return await this.inventoryRepository.save(payload);
  }

  async findByIngredientId(ingredient_id: number): Promise<InventoryEntity> {
    return await this.inventoryRepository.findOneBy({ ingredient_id });
  }

  async update(id: number, payload: InventoryEntity): Promise<InventoryEntity> {
    return await this.inventoryRepository.save(payload);
  }
}
