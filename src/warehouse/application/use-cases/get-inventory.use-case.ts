import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { IGetInventoryUseCase } from '@warehouse/domain/ports/get-inventory.use-case';
import { IInventoryService } from '@warehouse/domain/services/inventory.service';

import { ResponseEntity } from '@core/domain/entities/response.entity';

@Injectable()
export class GetInventoryUseCase implements IGetInventoryUseCase {
  constructor(private readonly inventoryService: IInventoryService) {}
  async execute(): Promise<ResponseEntity | void> {
    try {
      const inventory = await this.inventoryService.findAll();

      return {
        statusCode: HttpStatus.OK,
        status: 'success',
        message: 'Inventario listo',
        data: inventory,
      };
    } catch (error) {
      console.log('file: get-inventory.use-case.ts:25 ~ error:', error);
      throw new RpcException(new BadRequestException(error.message));
    }
  }
}
