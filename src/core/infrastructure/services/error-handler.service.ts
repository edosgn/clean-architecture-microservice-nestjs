import { RpcException } from '@nestjs/microservices';
import {
  BadRequestCustomException,
  UnauthorizedCustomException,
  ForbiddenCustomException,
  NotFoundCustomException,
  ConflictCustomException,
  PayloadTooLargeCustomException,
  RequestTimeoutCustomException,
  ServiceUnavailableCustomException,
  InternalServerCustomException,
} from '@core/domain/exeptions/custom.exception';

export class ErrorHandlerService {
  private static errorMap: Record<number, new (message?: string) => Error> = {
    400: BadRequestCustomException,
    401: UnauthorizedCustomException,
    403: ForbiddenCustomException,
    404: NotFoundCustomException,
    409: ConflictCustomException,
    413: PayloadTooLargeCustomException,
    408: RequestTimeoutCustomException,
    503: ServiceUnavailableCustomException,
  };

  static handle(error: any): never {
    const ExceptionClass =
      this.errorMap[error?.status] || InternalServerCustomException;
    throw new RpcException(
      new ExceptionClass(error?.message || 'Error inesperado'),
    );
  }
}
