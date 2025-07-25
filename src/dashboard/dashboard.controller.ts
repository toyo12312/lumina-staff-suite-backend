import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard') // Всі маршрути будуть починатися з /dashboard
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary') // Створюємо новий маршрут /dashboard/summary
  getSummary() {
    // Викликаємо метод з сервісу, який ми створили раніше
    return this.dashboardService.getSummary();
  }
}
