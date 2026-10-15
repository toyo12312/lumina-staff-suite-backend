import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Employee } from './entities/employer.entity';
import { CreateEmployeeDto } from './dto/create-employer.dto';
import { UpdateEmployeeDto } from './dto/update-employer.dto';

@Injectable()
export class EmployersService {
  private readonly logger = new Logger(EmployersService.name);
  private activeCaptchas = new Map<
    string,
    { answer: number; expires: number }
  >();

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = Math.random() > 0.5 ? '+' : '-';

    let answer = 0;
    if (operator === '+') {
      answer = num1 + num2;
    } else {
      answer = num1 >= num2 ? num1 - num2 : num2 - num1;
    }

    const token = Math.random().toString(36).substring(2);
    const question =
      operator === '+'
        ? `${num1} + ${num2} = ?`
        : `${Math.max(num1, num2)} - ${Math.min(num1, num2)} = ?`;
    const finalAnswer =
      operator === '+' ? answer : Math.max(num1, num2) - Math.min(num1, num2);

    this.activeCaptchas.set(token, {
      answer: finalAnswer,
      expires: Date.now() + 5 * 60 * 1000,
    });

    return { token, question };
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { captchaToken, captchaAnswer, position, email } = createEmployeeDto;

    if (!captchaToken || !this.activeCaptchas.has(captchaToken)) {
      throw new BadRequestException('errors.validation.invalidCaptcha');
    }

    const captchaData = this.activeCaptchas.get(captchaToken);
    this.activeCaptchas.delete(captchaToken);

    if (Date.now() > captchaData!.expires) {
      throw new BadRequestException('errors.validation.expiredCaptcha');
    }

    if (Number(captchaAnswer) !== captchaData!.answer) {
      throw new BadRequestException('errors.validation.incorrectCaptcha');
    }

    if (
      position?.toLowerCase() === 'shithead' ||
      email?.includes('larry_po_opeater')
    ) {
      throw new BadRequestException('errors.validation.spamDetected');
    }

    const newEmployee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(newEmployee);
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleSpamCleanup() {
    this.logger.debug('Running automated spam cleanup...');
    try {
      await this.employeeRepository
        .createQueryBuilder()
        .delete()
        .where('position ILIKE :pos OR email ILIKE :mail', {
          pos: '%shithead%',
          mail: '%larry_po_opeater%',
        })
        .execute();
      this.logger.debug('Spam cleanup completed successfully.');
    } catch (error) {
      this.logger.error('Error during automated spam cleanup:', error);
    }
  }

  async findAll(query: {
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    data: Employee[];
    total: number;
    page: number;
    lastPage: number;
  }> {
    const { search = '', page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const qb = this.employeeRepository.createQueryBuilder('employee');

    if (search) {
      qb.where(
        new Brackets((qb) => {
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
            .orWhere(
              "CONCAT(employee.firstName, ' ', employee.lastName) ILIKE :search",
              { search: `%${search}%` },
            );
        }),
      );
    }

    qb.orderBy('employee.id', 'DESC');
    qb.skip(skip);
    qb.take(limit);

    const [result, total] = await qb.getManyAndCount();

    return {
      data: result,
      total: total,
      page: Number(page),
      lastPage: Math.ceil(total / limit),
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
