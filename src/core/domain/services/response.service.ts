import {
  ResponseEntity,
  StatusCode,
  StatusType,
} from '../entities/response.entity';

export abstract class IResponseService {
  abstract execute<T = null>(
    statusCode: StatusCode,
    statusDesc: StatusType,
    message: string,
    data?: T,
  ): Promise<ResponseEntity>;
}
