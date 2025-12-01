import { Controller, All, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProxyService } from './proxy.service';
import { CognitoAuthGuard } from '../auth/cognito-auth.guard';

@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  // User Service Routes
  @All('user/*')
  @UseGuards(CognitoAuthGuard)
  async proxyToUserService(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.forwardRequest('user', req, res);
  }

  // Admin Service Routes
  @All('admin/*')
  @UseGuards(CognitoAuthGuard)
  async proxyToAdminService(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.forwardRequest('admin', req, res);
  }

  // Partner Service Routes
  @All('partner/*')
  @UseGuards(CognitoAuthGuard)
  async proxyToPartnerService(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.forwardRequest('partner', req, res);
  }

  // Booking Service Routes
  @All('booking/*')
  @UseGuards(CognitoAuthGuard)
  async proxyToBookingService(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.forwardRequest('booking', req, res);
  }

  // Payment Service Routes
  @All('payment/*')
  @UseGuards(CognitoAuthGuard)
  async proxyToPaymentService(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.forwardRequest('payment', req, res);
  }

  // Notification Service Routes (some might be public webhooks)
  @All('notification/*')
  async proxyToNotificationService(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.forwardRequest('notification', req, res);
  }
}

