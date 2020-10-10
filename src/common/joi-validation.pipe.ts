import { ArgumentMetadata, Injectable, PipeTransform, HttpException, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export abstract class JoiValidationPipe implements PipeTransform {
  public transform(value: any, metadata: ArgumentMetadata) {
    const result = this.buildSchema().validate(value)
    if(result.error){
      throw new BadRequestException([result.error.message.replace(/"/g, ``)])
    }
    return result.value;
  }

  public abstract buildSchema(): Joi.Schema;
}
