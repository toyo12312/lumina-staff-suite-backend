import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Employee } from '../employers/entities/employer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
