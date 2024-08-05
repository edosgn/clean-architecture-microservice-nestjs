import { Injectable } from '@nestjs/common';

import { IInventoryService } from '@warehouse/domain/services/inventory.service';
import { IInventoryRepository } from '@warehouse/domain/repositories/inventory.repository';
import { IIngredientRepository } from '@warehouse/domain/repositories/ingredient.repository';

import { Inventory } from '../entities/db/inventory.entity';
import { InventoryEntity } from '@warehouse/domain/entities/inventory.entity';

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

  async findByIngredientId(ingredient_id: number): Promise<Inventory> {
    return await this.inventoryRepository.findOneBy({ ingredient_id });
  }

  async findAll(): Promise<Inventory[]> {
    return await this.inventoryRepository.find(null, ['ingredient']);
  }
}
