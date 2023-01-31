import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validate as isUuid } from 'uuid';

@Injectable()
export class CommonService {
  constructor() {}

  handleError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    if (typeof error === 'object') throw error;

    console.error(error);

    throw new InternalServerErrorException('Please check server logs');
  }

  checkIsUuID(value: string): boolean {
    return isUuid(value) ? true : false;
  }
}
