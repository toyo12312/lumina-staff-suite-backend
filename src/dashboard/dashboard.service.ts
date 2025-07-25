import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// 1. Виправляємо друкарську помилку в імпорті
import {
  Employee,
  EmployeeStatus,
} from '../employers/entities/employer.entity';

@Injectable()
export class DashboardService {
  constructor(
    // 2. Використовуємо правильний тип Repository<Employee>
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  // Метод для отримання зведеної статистики для дашборду
  async getSummary() {
    // 3. Виправляємо логіку:
    //    - Отримуємо загальну кількість співробітників
    //    - Отримуємо кількість активних співробітників
    const totalEmployees = await this.employeeRepository.count();
    const activeEmployees = await this.employeeRepository.count({
      where: { status: EmployeeStatus.Active },
    });

    // Повертаємо об'єкт зі статистикою
    return {
      totalEmployees,
      activeEmployees,
      onLeave: await this.employeeRepository.count({
        where: { status: EmployeeStatus.OnLeave },
      }),
      terminated: await this.employeeRepository.count({
        where: { status: EmployeeStatus.Terminated },
      }),
    };
  }
}
