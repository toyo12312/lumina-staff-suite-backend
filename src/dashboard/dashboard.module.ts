import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
// 1. Виправляємо друкарську помилку в імпорті
import { Employee } from '../employers/entities/employer.entity';

@Module({
  // 2. Реєструємо Employee entity для використання в цьому модулі
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
