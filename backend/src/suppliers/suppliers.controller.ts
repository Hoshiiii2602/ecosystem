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
import { SuppliersService } from './suppliers.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';

@Controller('suppliers')
@UseGuards(JwtAuthGuard)
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  create(@Request() req: any, @Body() createSupplierDto: any) {
    return this.suppliersService.create(req.user.storeId, createSupplierDto);
  }

  @Get()
  findAll(@Request() req: any, @Query() query: any) {
    return this.suppliersService.findAll(req.user.storeId, query);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.suppliersService.findOne(req.user.storeId, id);
  }

  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateSupplierDto: any,
  ) {
    return this.suppliersService.update(
      req.user.storeId,
      id,
      updateSupplierDto,
    );
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.suppliersService.remove(req.user.storeId, id);
  }
}
