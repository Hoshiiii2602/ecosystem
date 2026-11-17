import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  checkout(@Request() req: any, @Body() checkoutDto: any) {
    return this.ordersService.checkout(req.user.storeId, req.user.sub, checkoutDto);
  }

  @Get()
  findAll(@Request() req: any, @Query() query: any) {
    return this.ordersService.findAll(req.user.storeId, query);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.ordersService.findOne(req.user.storeId, id);
  }
}
