import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm'; // Додали Brackets
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

  // Оновлена функція з QueryBuilder для розумного пошуку
  async findAll(query: {
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Employee[]; total: number }> {
    const { search = '', page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    // Створюємо будівельник запитів
    const qb = this.employeeRepository.createQueryBuilder('employee');

    if (search) {
      qb.where(
        new Brackets((qb) => {
          // Пошук по окремих полях (регістронезалежний ILIKE)
          qb.where('employee.firstName ILIKE :search', {
            search: `%${search}%`,
          })
            .orWhere('employee.lastName ILIKE :search', {
              search: `%${search}%`,
            })
            .orWhere('employee.email ILIKE :search', { search: `%${search}%` })
            .orWhere('employee.position ILIKE :search', {
              search: `%${search}%`,
            })
            // 🔥 ГОЛОВНЕ: Склеюємо Ім'я + Пробіл + Прізвище
            .orWhere(
              "CONCAT(employee.firstName, ' ', employee.lastName) ILIKE :search",
              { search: `%${search}%` },
            );
        }),
      );
    }

    // Сортування та пагінація
    qb.orderBy('employee.id', 'DESC');
    qb.skip(skip);
    qb.take(limit);

    // Отримуємо результат і загальну кількість
    const [result, total] = await qb.getManyAndCount();

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
