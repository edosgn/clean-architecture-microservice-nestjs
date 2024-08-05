import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IUpdateInventoryUseCase } from '@warehouse/domain/ports/update-inventory.use-case';

import { InventoryEntity } from '@warehouse/domain/entities/inventory.entity';

import { INVENTORY_MSG } from '@warehouse/domain/enums/queues.enum';

import { MessagePattern } from '@nestjs/microservices';

@ApiTags('inventories')
@Controller('inventories')
export class InventoryController {
  constructor(private updateInventoryUseCase: IUpdateInventoryUseCase) {}

  @MessagePattern(INVENTORY_MSG.UPDATE_INVENTORY)
  async create(@Body() payload: InventoryEntity) {
    return await this.updateInventoryUseCase.execute(
      payload as InventoryEntity,
    );
  }
}
