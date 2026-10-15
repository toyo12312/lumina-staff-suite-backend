import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { EmployersService } from './employers.service';
import { CreateEmployeeDto } from './dto/create-employer.dto';
import { UpdateEmployeeDto } from './dto/update-employer.dto';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employersService: EmployersService) {}

  @Get('captcha')
  getCaptcha() {
    return this.employersService.generateCaptcha();
  }

  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employersService.create(createEmployeeDto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.employersService.findAll({
      search,
      page: pageNum,
      limit: limitNum,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employersService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employersService.remove(id);
  }
}
