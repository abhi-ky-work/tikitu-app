import { Injectable } from '@nestjs/common';

@Injectable()
export class PartnerServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
