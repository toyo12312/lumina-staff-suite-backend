import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employers.service';
import { EmployeesController } from './employers.controller';
import { Employee } from './entities/employer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])], // Реєструємо нашу Entity
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
