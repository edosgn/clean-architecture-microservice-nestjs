import {
  ResponseEntity,
} from '../entities/response.entity';
import { HttpStatusCodeEnum } from '../enums/http-status-code.enum';
import { HttpStatusTypeEnum } from '../enums/http-status-type.enum';

export abstract class IResponseService {
  abstract execute<T = null>(
    statusCode: HttpStatusCodeEnum,
    statusDesc: HttpStatusTypeEnum,
    message: string,
    data?: T,
  ): Promise<ResponseEntity>;
}
