import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './employers.controller';
import { EmployersService } from './employers.service';
import { Employee } from './entities/employer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeesController],
  providers: [EmployersService],
})
export class EmployersModule {}
