import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IGetInventoryUseCase } from '@warehouse/domain/ports/get-inventory.use-case';
import { IUpdateInventoryUseCase } from '@warehouse/domain/ports/update-inventory.use-case';

import { INVENTORY_MSG } from '@warehouse/domain/enums/queues.enum';

import { MessagePattern } from '@nestjs/microservices';

import {
  GetOneInventoryByIngredientIdEntity,
  InventoryEntity,
} from '@warehouse/domain/entities/inventory.entity';
import { IGetOneInventoryByIngredientIdUseCase } from '../../domain/ports/get-one-inventory-by-ingredient.use-case';
import { ResponseEntity } from '@core/domain/entities/response.entity';

@ApiTags('inventories')
@Controller('inventories')
export class InventoryController {
  constructor(
    private updateInventoryUseCase: IUpdateInventoryUseCase,
    private getInventoryUseCase: IGetInventoryUseCase,
    private getOneInventoryByIngredientIdUseCase: IGetOneInventoryByIngredientIdUseCase,
  ) {}

  @MessagePattern(INVENTORY_MSG.UPDATE_INVENTORY)
  async create(@Body() payload: InventoryEntity): Promise<ResponseEntity> {
    return await this.updateInventoryUseCase.execute(payload);
  }

  @MessagePattern(INVENTORY_MSG.GET_INVENTORY)
  async findAll(): Promise<ResponseEntity> {
    return await this.getInventoryUseCase.execute();
  }

  @MessagePattern(INVENTORY_MSG.GET_ONE_INVENTORY_BY_INGREDIENT_ID)
  async findOneByIngredientId(
    @Body() payload: GetOneInventoryByIngredientIdEntity,
  ): Promise<ResponseEntity> {
    return await this.getOneInventoryByIngredientIdUseCase.execute(payload);
  }
}
