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
} from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Request() req: any, @Body() createCategoryDto: any) {
    return this.categoriesService.create(req.user.storeId, createCategoryDto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.categoriesService.findAll(req.user.storeId);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.categoriesService.findOne(req.user.storeId, id);
  }

  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateCategoryDto: any,
  ) {
    return this.categoriesService.update(
      req.user.storeId,
      id,
      updateCategoryDto,
    );
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.categoriesService.remove(req.user.storeId, id);
  }
}
