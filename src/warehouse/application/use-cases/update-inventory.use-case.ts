import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { IUpdateInventoryUseCase } from '@warehouse/domain/ports/update-inventory.use-case';
import { IInventoryService } from '@warehouse/domain/services/inventory.service';

import { ResponseEntity } from '@core/domain/entities/response.entity';

import { InventoryEntity } from '@warehouse/domain/entities/inventory.entity';

@Injectable()
export class UpdateInventoryUseCase implements IUpdateInventoryUseCase {
  constructor(private readonly inventoryService: IInventoryService) {}
  async execute(payload: InventoryEntity): Promise<ResponseEntity | void> {
    try {
      const inventory = await this.inventoryService.create(payload);

      return {
        statusCode: HttpStatus.OK,
        status: 'success',
        message: 'Inventario actualizado',
        data: {
          inventory,
        },
      };
    } catch (error) {
      throw new RpcException(new BadRequestException(error.message));
    }
  }
}
