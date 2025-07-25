import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Employee } from '../employers/entities/employer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
