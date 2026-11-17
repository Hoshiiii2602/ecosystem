import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { ReportsService } from './reports.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('dashboard')
  getDashboardStats(@Request() req: any, @Query() query: any) {
    return this.reportsService.getDashboardStats(req.user.storeId, query);
  }

  @Get('revenue-chart')
  getRevenueChart(@Request() req: any, @Query('days') days: number) {
    return this.reportsService.getRevenueChart(req.user.storeId, days);
  }
}
