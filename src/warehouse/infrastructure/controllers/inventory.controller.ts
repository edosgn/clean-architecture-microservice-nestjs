import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IGetInventoryUseCase } from '@warehouse/domain/ports/get-inventory.use-case';
import { IUpdateInventoryUseCase } from '@warehouse/domain/ports/update-inventory.use-case';

import { INVENTORY_MSG } from '@warehouse/domain/enums/queues.enum';

import { MessagePattern } from '@nestjs/microservices';

import { InventoryEntity } from '@warehouse/domain/entities/inventory.entity';

@ApiTags('inventories')
@Controller('inventories')
export class InventoryController {
  constructor(
    private updateInventoryUseCase: IUpdateInventoryUseCase,
    private getInventoryUseCase: IGetInventoryUseCase,
  ) {}

  @MessagePattern(INVENTORY_MSG.UPDATE_INVENTORY)
  async create(@Body() payload: InventoryEntity) {
    return await this.updateInventoryUseCase.execute(payload);
  }

  @MessagePattern(INVENTORY_MSG.GET_INVENTORY)
  async findAll() {
    return await this.getInventoryUseCase.execute();
  }
}
