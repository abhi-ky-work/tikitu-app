import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  private serviceUrls: Map<string, string>;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.serviceUrls = new Map([
      ['user', this.configService.get('USER_SERVICE_URL')],
      ['admin', this.configService.get('ADMIN_SERVICE_URL')],
      ['partner', this.configService.get('PARTNER_SERVICE_URL')],
      ['booking', this.configService.get('BOOKING_SERVICE_URL')],
      ['payment', this.configService.get('PAYMENT_SERVICE_URL')],
      ['notification', this.configService.get('NOTIFICATION_SERVICE_URL')],
    ]);
  }

  async forwardRequest(
    service: string,
    req: Request,
    res: Response,
  ): Promise<void> {
    const serviceUrl = this.serviceUrls.get(service);

    if (!serviceUrl) {
      throw new HttpException(`Service ${service} not found`, 404);
    }

    // Build the target URL
    const targetUrl = `${serviceUrl}${req.url}`;

    try {
      // Forward the request to the microservice
      const response = await firstValueFrom(
        this.httpService.request({
          method: req.method,
          url: targetUrl,
          data: req.body,
          headers: {
            ...req.headers,
            host: new URL(serviceUrl).host,
          },
          params: req.query,
        }),
      );

      // Forward the response back to the client
      res.status(response.status).json(response.data);
    } catch (error) {
      const status = error.response?.status || 500;
      const message = error.response?.data || { message: 'Service unavailable' };
      res.status(status).json(message);
    }
  }
}

