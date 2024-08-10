import { Injectable } from '@nestjs/common';

import { IInventoryService } from '@warehouse/domain/services/inventory.service';
import { IInventoryRepository } from '@warehouse/domain/repositories/inventory.repository';
import { IIngredientRepository } from '@warehouse/domain/repositories/ingredient.repository';

import { Inventory } from '../entities/db/inventory.entity';
import {
  GetOneInventoryByIngredientIdEntity,
  InventoryEntity,
} from '@warehouse/domain/entities/inventory.entity';

@Injectable()
export class InventoryServiceImpl implements IInventoryService {
  constructor(
    private readonly inventoryRepository: IInventoryRepository,
    private readonly ingredientRepository: IIngredientRepository,
  ) {}

  async create(payload: InventoryEntity): Promise<Inventory> {
    const ingredient = await this.ingredientRepository.findOneBy({
      id: payload.ingredient_id,
    });

    if (!ingredient) {
      throw new Error('Ingrediente no encontrado');
    }

    const inventory = new Inventory();
    inventory.id = payload.id ?? null;
    inventory.ingredient = ingredient;
    inventory.quantity = payload.quantity;

    return this.inventoryRepository.save(inventory);
  }

  async findAll(): Promise<Inventory[]> {
    return await this.inventoryRepository.find(null, ['ingredient']);
  }

  async findOneByIngredientId(
    payload: GetOneInventoryByIngredientIdEntity,
  ): Promise<Inventory> {
    const inventories = await this.inventoryRepository.find(
      {
        ingredient: { id: payload.ingredient_id },
      },
      ['ingredient'],
    );

    return inventories.length > 0 ? inventories[0] : null;
  }
}
