import { ResponseEntity } from '@core/domain/entities/response.entity';
import { IResponseService } from '@core/domain/services/response.service';

import { HttpStatusCodeEnum } from '@core/domain/enums/http-status-code.enum';
import { HttpStatusTypeEnum } from '@core/domain/enums/http-status-type.enum';

export class ResponseServiceImpl implements IResponseService {
  async execute<T = null>(
    statusCode: HttpStatusCodeEnum,
    statusDesc: HttpStatusTypeEnum,
    message: string,
    data?: T,
  ): Promise<ResponseEntity> {
    return {
      statusCode,
      statusDesc,
      message,
      data,
    };
  }
}
