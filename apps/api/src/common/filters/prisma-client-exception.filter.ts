import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

type PrismaException =
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientValidationError
  | Prisma.PrismaClientInitializationError;

/* 
    Prisma exception filter error references:
    https://www.prisma.io/docs/orm/reference/error-reference
*/
@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientInitializationError,
)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const status = this.resolveStatus(exception);

    res.status(status).json({
      statusCode: status,
      message: this.resolveMessage(status),
    });
  }

  private resolveStatus(error: PrismaException): HttpStatus {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      return HttpStatus.SERVICE_UNAVAILABLE;
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      return HttpStatus.BAD_REQUEST;
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P1001':
          return HttpStatus.SERVICE_UNAVAILABLE;
        case 'P2002':
          return HttpStatus.CONFLICT;
        case 'P2025':
          return HttpStatus.NOT_FOUND;
        case 'P2021':
        case 'P2022':
          return HttpStatus.SERVICE_UNAVAILABLE;
        default:
          return HttpStatus.BAD_REQUEST;
      }
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private resolveMessage(status: HttpStatus): string {
    switch (status) {
      case HttpStatus.SERVICE_UNAVAILABLE:
        return 'Service temporarily unavailable';
      case HttpStatus.CONFLICT:
        return 'Conflict';
      case HttpStatus.NOT_FOUND:
        return 'Not found';
      case HttpStatus.BAD_REQUEST:
        return 'Bad request';
      default:
        return 'Internal server error';
    }
  }
}
