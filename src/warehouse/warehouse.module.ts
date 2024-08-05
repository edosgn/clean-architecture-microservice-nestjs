import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Ingredient
import { Ingredient } from './infrastructure/entities/db/ingredient.entity';

import { IngredientController } from './infrastructure/controllers/ingredient.controller';

import { IIngredientRepository } from './domain/repositories/ingredient.repository';
import { IngredientRepositoryImpl } from './infrastructure/repositories/ingredient.repository.impl';

import { IIngredientService } from './domain/services/ingredient.service';
import { IngredientServiceImpl } from './infrastructure/services/ingredient.service.impl';

import { ICreateIngredientUseCase } from './domain/ports/create-ingredient.use-case';
import { CreateIngredientUseCase } from './application/use-cases/create-ingredient.use-case';

// Inventory
import { Inventory } from './infrastructure/entities/db/inventory.entity';

import { InventoryController } from './infrastructure/controllers/inventory.controller';

import { IInventoryRepository } from './domain/repositories/inventory.repository';
import { InventoryRepositoryImpl } from './infrastructure/repositories/inventory.repository.impl';

import { IInventoryService } from './domain/services/inventory.service';
import { InventoryServiceImpl } from './infrastructure/services/inventory.service.impl';

import { IUpdateInventoryUseCase } from './domain/ports/update-inventory.use-case';
import { UpdateInventoryUseCase } from './application/use-cases/update-inventory.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, Inventory])],
  controllers: [IngredientController, InventoryController],
  providers: [
    {
      provide: IIngredientRepository,
      useClass: IngredientRepositoryImpl,
    },
    {
      provide: IIngredientService,
      useClass: IngredientServiceImpl,
    },
    {
      provide: ICreateIngredientUseCase,
      useClass: CreateIngredientUseCase,
    },
    {
      provide: IInventoryRepository,
      useClass: InventoryRepositoryImpl,
    },
    {
      provide: IInventoryService,
      useClass: InventoryServiceImpl,
    },
    {
      provide: IUpdateInventoryUseCase,
      useClass: UpdateInventoryUseCase,
    },
  ],
})
export class WarehouseModule {}
