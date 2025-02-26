import { HttpStatusCodeEnum } from '@core/domain/enums/http-status-code.enum';
import { HttpStatusTypeEnum } from '@core/domain/enums/http-status-type.enum';

export class ResponseEntity {
  statusCode: HttpStatusCodeEnum;
  statusDesc: HttpStatusTypeEnum;
  message: string;
  data?: any;
}
