import {
  IsString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsDateString,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';
import { EmployeeStatus } from '../entities/employer.entity';

export class CreateEmployeeDto {
  @IsString({ message: 'errors.validation.isString' })
  @IsNotEmpty({ message: 'errors.validation.isNotEmpty' })
  @MinLength(2, { message: 'errors.validation.minLength' })
  @MaxLength(50, { message: 'errors.validation.maxLength' })
  @Matches(/^[а-яА-ЯєЄіІїЇґҐa-zA-Z\s\-']+$/, {
    message: 'errors.validation.invalidNameFormat',
  })
  firstName!: string;

  @IsString({ message: 'errors.validation.isString' })
  @IsNotEmpty({ message: 'errors.validation.isNotEmpty' })
  @MinLength(2, { message: 'errors.validation.minLength' })
  @MaxLength(50, { message: 'errors.validation.maxLength' })
  @Matches(/^[а-яА-ЯєЄіІїЇґҐa-zA-Z\s\-']+$/, {
    message: 'errors.validation.invalidNameFormat',
  })
  lastName!: string;

  @IsString({ message: 'errors.validation.isString' })
  @IsNotEmpty({ message: 'errors.validation.isNotEmpty' })
  @MinLength(2, { message: 'errors.validation.minLength' })
  @MaxLength(100, { message: 'errors.validation.maxLength' })
  position!: string;

  @IsEmail({}, { message: 'errors.validation.isEmail' })
  @IsNotEmpty({ message: 'errors.validation.isNotEmpty' })
  @MaxLength(100, { message: 'errors.validation.maxLength' })
  email!: string;

  @IsEnum(EmployeeStatus, { message: 'errors.validation.isEnum' })
  @IsNotEmpty({ message: 'errors.validation.isNotEmpty' })
  status!: EmployeeStatus;

  @IsDateString({}, { message: 'errors.validation.isDate' })
  @IsNotEmpty({ message: 'errors.validation.isNotEmpty' })
  hireDate!: string;
}
