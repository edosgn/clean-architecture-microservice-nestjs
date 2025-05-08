import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ICreateIngredientUseCase } from '@warehouse/domain/ports/create-ingredient.use-case';
import { IGetOneIngredientByNameUseCase } from '@warehouse/domain/ports/get-one-ingredient-by-name.use-case';

import {
  GetOneIngredientByNameEntity,
  IngredientEntity,
} from '@warehouse/domain/entities/ingredient.entity';

import { INGREDIENT_MSG } from '@warehouse/domain/enums/queues.enum';

import { MessagePattern } from '@nestjs/microservices';
import { ResponseEntity } from '@core/domain/entities/response.entity';
import { IResponseService } from '@core/domain/services/response.service';
import { HttpStatusCodeEnum } from '@core/domain/enums/http-status-code.enum';
import { HttpStatusTypeEnum } from '@core/domain/enums/http-status-type.enum';
import { WharehouseMessages } from '@warehouse/domain/constants/messages';
import { ErrorHandlerService } from '@core/infrastructure/services/error-handler.service';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientController {
  constructor(
    private createIngredientUseCase: ICreateIngredientUseCase,
    private getOneByNameIngredientUseCase: IGetOneIngredientByNameUseCase,
    private responseService: IResponseService,
  ) {}

  @MessagePattern(INGREDIENT_MSG.CREATE_INGREDIENT)
  async create(@Body() payload: IngredientEntity): Promise<ResponseEntity> {
    try {
      const ingredient = await this.createIngredientUseCase.execute(
        payload as IngredientEntity,
      );

      return await this.responseService.execute(
        HttpStatusCodeEnum.OK,
        HttpStatusTypeEnum.SUCCESS,
        WharehouseMessages.INGREDIENT.CREATED_SUCCESS,
        ingredient,
      );
    } catch (error) {
      ErrorHandlerService.handle(error);
    }
  }

  @MessagePattern(INGREDIENT_MSG.GET_ONE_INGREDIENT_BY_NAME)
  async findOneByName(@Body() payload: GetOneIngredientByNameEntity): Promise<ResponseEntity> {
    try {
      const ingredient = await this.getOneByNameIngredientUseCase.execute(payload)

      if (!ingredient) {
        return await this.responseService.execute(
          HttpStatusCodeEnum.NOT_FOUND,
          HttpStatusTypeEnum.ERROR,
          WharehouseMessages.INGREDIENT.FOUND_SUCCESS,
          ingredient,
        );
      }

      return await this.responseService.execute(
        HttpStatusCodeEnum.OK,
        HttpStatusTypeEnum.SUCCESS,
        WharehouseMessages.INGREDIENT.FOUND_SUCCESS,
        ingredient,
      );
    } catch (error) {
      ErrorHandlerService.handle(error);
    }
  }
}
