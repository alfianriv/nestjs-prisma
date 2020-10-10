import { ArgumentsHost, Catch, ExceptionFilter, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.getResponse();

    response
      .status(status)
      .json({
        meta: {
          code: status,
          message: message.error
        },
        data: {},
        errors: message['message']
      });
  }
}
