import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { IGetInventoryUseCase } from '@warehouse/domain/ports/get-inventory.use-case';
import { IInventoryService } from '@warehouse/domain/services/inventory.service';

import { ResponseEntity } from '@core/domain/entities/response.entity';
import { HttpStatusCodeEnum } from '@core/domain/enums/http-status-code.enum';
import { HttpStatusTypeEnum } from '@core/domain/enums/http-status-type.enum';

@Injectable()
export class GetInventoryUseCase implements IGetInventoryUseCase {
  constructor(private readonly inventoryService: IInventoryService) {}
  async execute(): Promise<ResponseEntity | void> {
    try {
      const inventory = await this.inventoryService.findAll();

      return {
        statusCode: HttpStatusCodeEnum.OK,
        statusDesc: HttpStatusTypeEnum.SUCCESS,
        message: 'Inventario listo',
        data: inventory,
      };
    } catch (error) {
      throw new RpcException(new BadRequestException(error.message));
    }
  }
}
