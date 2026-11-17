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
import { EmployeesService } from './employees.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@Controller('employees')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Owner', 'Store Manager')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Request() req: any, @Body() createEmployeeDto: any) {
    return this.employeesService.create(req.user.storeId, createEmployeeDto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.employeesService.findAll(req.user.storeId);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.employeesService.findOne(req.user.storeId, id);
  }

  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateEmployeeDto: any,
  ) {
    return this.employeesService.update(req.user.storeId, id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.employeesService.remove(req.user.storeId, id);
  }
}
