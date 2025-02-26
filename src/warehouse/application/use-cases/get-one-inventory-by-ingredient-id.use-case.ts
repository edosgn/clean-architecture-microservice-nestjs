import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { IGetOneInventoryByIngredientIdUseCase } from '@warehouse/domain/ports/get-one-inventory-by-ingredient.use-case';

import { IInventoryService } from '@warehouse/domain/services/inventory.service';

import { ResponseEntity } from '@core/domain/entities/response.entity';

import { GetOneInventoryByIngredientIdEntity } from '@warehouse/domain/entities/inventory.entity';
import { WarehouseConfig } from '../core.config';
import { STATUS_DESC } from '@warehouse/domain/enums/status-desc.enum';

@Injectable()
export class GetOneInventoryByIngredientIdUseCase
  implements IGetOneInventoryByIngredientIdUseCase
{
  constructor(private readonly inventoryService: IInventoryService) {}
  async execute(
    payload: GetOneInventoryByIngredientIdEntity,
  ): Promise<ResponseEntity | void> {
    try {
      const inventory =
        await this.inventoryService.findOneByIngredientId(payload);

      return {
        statusCode: inventory ? HttpStatus.OK : HttpStatus.NOT_FOUND,
        status: inventory ? STATUS_DESC.SUCCESS : STATUS_DESC.WARNING,
        message: inventory
          ? WarehouseConfig.ERROR_MESSAGES.inventory.not_found
          : WarehouseConfig.SUCCESS_MESSAGES.inventory.found,
        data: inventory,
      };
    } catch (error) {
      throw new RpcException(new BadRequestException(error.message));
    }
  }
}
