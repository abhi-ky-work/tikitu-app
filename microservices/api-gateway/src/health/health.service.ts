import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HealthService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  check() {
    return {
      status: 'ok',
      service: 'api-gateway',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: this.configService.get('NODE_ENV'),
    };
  }

  async checkAllServices() {
    const services = {
      user: this.configService.get('USER_SERVICE_URL'),
      admin: this.configService.get('ADMIN_SERVICE_URL'),
      partner: this.configService.get('PARTNER_SERVICE_URL'),
      booking: this.configService.get('BOOKING_SERVICE_URL'),
      payment: this.configService.get('PAYMENT_SERVICE_URL'),
      notification: this.configService.get('NOTIFICATION_SERVICE_URL'),
    };

    const results = {};

    for (const [name, url] of Object.entries(services)) {
      try {
        const response = await firstValueFrom(
          this.httpService.get(`${url}/api/v1/${name}/health`),
        );
        results[name] = {
          status: 'healthy',
          url: url,
          response: response.data,
        };
      } catch (error) {
        results[name] = {
          status: 'unhealthy',
          url: url,
          error: error.message,
        };
      }
    }

    return {
      gateway: this.check(),
      services: results,
    };
  }
}

