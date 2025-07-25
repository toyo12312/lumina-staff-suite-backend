import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Employee } from './entities/employer.entity';
import { CreateEmployeeDto } from './dto/create-employer.dto';
import { UpdateEmployeeDto } from './dto/update-employer.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(newEmployee);
  }

  // Оновлена функція для підтримки пошуку та пагінації
  async findAll(query: {
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Employee[]; total: number }> {
    const { search = '', page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [result, total] = await this.employeeRepository.findAndCount({
      where: [
        { firstName: Like(`%${search}%`) },
        { lastName: Like(`%${search}%`) },
        { email: Like(`%${search}%`) },
        { position: Like(`%${search}%`) },
      ],
      order: { id: 'DESC' }, // За замовчуванням сортуємо за ID
      take: limit,
      skip: skip,
    });

    return {
      data: result,
      total: total,
    };
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException(`Співробітника з ID ${id} не знайдено`);
    }
    return employee;
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.employeeRepository.preload({
      id: id,
      ...updateEmployeeDto,
    });
    if (!employee) {
      throw new NotFoundException(`Співробітника з ID ${id} не знайдено`);
    }
    return this.employeeRepository.save(employee);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.employeeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Співробітника з ID ${id} не знайдено`);
    }
    return { message: `Співробітника з ID ${id} було успішно видалено` };
  }
}
