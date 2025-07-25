import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employers/entities/employer.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  // Метод для генерації простого звіту
  async getSomeReport() {
    const employees = await this.employeeRepository.find({
      select: ['id', 'firstName', 'lastName', 'position', 'status'],
      order: {
        lastName: 'ASC', // Сортуємо за прізвищем
      },
    });
    return employees;
  }
}
