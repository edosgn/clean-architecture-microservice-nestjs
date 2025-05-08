import {
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  PayloadTooLargeException,
  RequestTimeoutException,
  ServiceUnavailableException,
} from '@nestjs/common';

export class BadRequestCustomException extends BadRequestException {
  constructor(message: string = 'Solicitud incorrecta') {
    super({ statusCode: 400, message });
  }
}

export class UnauthorizedCustomException extends UnauthorizedException {
  constructor(message: string = 'No autorizado') {
    super({ statusCode: 401, message });
  }
}

export class ForbiddenCustomException extends ForbiddenException {
  constructor(message: string = 'Prohibido') {
    super({ statusCode: 403, message });
  }
}

export class NotFoundCustomException extends NotFoundException {
  constructor(message: string = 'Recurso no encontrado') {
    super({ statusCode: 404, message });
  }
}

export class ConflictCustomException extends ConflictException {
  constructor(message: string = 'Conflicto con el estado actual del recurso') {
    super({ statusCode: 409, message });
  }
}

export class PayloadTooLargeCustomException extends PayloadTooLargeException {
  constructor(message: string = 'El tamaño de la carga es demasiado grande') {
    super({ statusCode: 413, message });
  }
}

export class RequestTimeoutCustomException extends RequestTimeoutException {
  constructor(message: string = 'Tiempo de espera agotado') {
    super({ statusCode: 408, message });
  }
}

export class ServiceUnavailableCustomException extends ServiceUnavailableException {
  constructor(message: string = 'Servicio no disponible') {
    super({ statusCode: 503, message });
  }
}

export class InternalServerCustomException extends InternalServerErrorException {
  constructor(message: string = 'Error interno del servidor') {
    super({ statusCode: 500, message });
  }
}
