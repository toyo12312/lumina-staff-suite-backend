import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Employee,
  EmployeeStatus,
} from '../employers/entities/employer.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async getSummary() {
    const totalEmployees = await this.employeeRepository.count();
    const activeEmployees = await this.employeeRepository.count({
      where: { status: EmployeeStatus.Active },
    });
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
