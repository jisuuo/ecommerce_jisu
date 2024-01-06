import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const reponse = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };
    if (typeof error === 'string') {
      reponse.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        message: error,
        data: null,
      });
    } else {
      reponse.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        message: error.message,
        data: null,
      });
    }
  }
}
