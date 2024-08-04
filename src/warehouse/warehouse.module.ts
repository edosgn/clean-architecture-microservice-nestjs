import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ingredient } from './infrastructure/entities/db/ingredient.entity';

import { IngredientController } from './infrastructure/controllers/ingredient.controller';

import { IIngredientRepository } from './domain/repositories/ingredient.repository';
import { IngredientRepositoryImpl } from './infrastructure/repositories/ingredient.repository.impl';

import { IIngredientService } from './domain/services/ingredient.service';
import { IngredientServiceImpl } from './infrastructure/services/ingredient.service.impl';

import { ICreateIngredientUseCase } from './domain/ports/create-ingredient.use-case';
import { CreateIngredientUseCase } from './application/use-cases/create-ingredient.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient])],
  controllers: [IngredientController],
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
  ],
})
export class WarehouseModule {}
