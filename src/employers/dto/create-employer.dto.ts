import {
  IsString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';
import { EmployeeStatus } from '../entities/employer.entity';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(EmployeeStatus)
  @IsNotEmpty()
  status: EmployeeStatus;

  @IsDateString()
  @IsNotEmpty()
  hireDate: string;
}
