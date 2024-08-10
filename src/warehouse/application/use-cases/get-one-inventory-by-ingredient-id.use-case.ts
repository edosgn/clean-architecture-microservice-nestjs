import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { IGetOneInventoryByIngredientIdUseCase } from '@warehouse/domain/ports/get-one-inventory-by-ingredient.use-case';

import { IInventoryService } from '@warehouse/domain/services/inventory.service';

import { ResponseEntity } from '@core/domain/entities/response.entity';

import { GetOneInventoryByIngredientIdEntity } from '@warehouse/domain/entities/inventory.entity';

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
        status: inventory ? 'success' : 'warning',
        message: inventory
          ? 'Inventario encontrado'
          : 'Inventario no encontrado',
        data: inventory,
      };
    } catch (error) {
      throw new RpcException(new BadRequestException(error.message));
    }
  }
}
