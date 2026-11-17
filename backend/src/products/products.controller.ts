import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Request() req: any, @Body() createProductDto: any) {
    return this.productsService.create(req.user.storeId, createProductDto);
  }

  @Get()
  findAll(@Request() req: any, @Query() query: any) {
    return this.productsService.findAll(req.user.storeId, query);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.productsService.findOne(req.user.storeId, id);
  }

  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateProductDto: any,
  ) {
    return this.productsService.update(req.user.storeId, id, updateProductDto);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.productsService.remove(req.user.storeId, id);
  }
}
