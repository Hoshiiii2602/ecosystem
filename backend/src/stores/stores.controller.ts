import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { StoresService } from './stores.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RegisterDto } from '../auth/dto/register.dto.js';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.storesService.registerStore(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getStoreInfo(@Request() req: any) {
    return this.storesService.getStoreInfo(req.user.storeId);
  }
}
