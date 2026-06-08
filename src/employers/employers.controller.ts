Import { Throttle } from '@nestjs/throttler';

@Throttle({ default: { limit: 2, ttl: 60000 } })
@Post()
create(@Body() createEmployeeDto: CreateEmployeeDto) {
  return this.employeesService.create(createEmployeeDto);
}

@Get()
findAll(
  @Query('search') search?: string,
  @Query('page') page?: string,
  @Query('limit') limit?: string,
) {
  const pageNum = page ? parseInt(page, 10) : 1;
  const limitNum = limit ? parseInt(limit, 10) : 10;
  return this.employeesService.findAll({
    search,
    page: pageNum,
    limit: limitNum,
  });
}

@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.employeesService.findOne(id);
}
