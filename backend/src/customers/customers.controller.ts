import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Request() req: any, @Body() createCustomerDto: any) {
    return this.customersService.create(req.user.storeId, createCustomerDto);
  }

  @Get()
  findAll(@Request() req: any, @Query() query: any) {
    return this.customersService.findAll(req.user.storeId, query);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.customersService.findOne(req.user.storeId, id);
  }

  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateCustomerDto: any,
  ) {
    return this.customersService.update(
      req.user.storeId,
      id,
      updateCustomerDto,
    );
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.customersService.remove(req.user.storeId, id);
  }
}
