import {
  IsString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsDateString,
  Matches,
  MinLength,
  MaxLength,
  IsOptional,
  IsEmpty,
} from 'class-validator';
import { EmployeeStatus } from '../entities/employer.entity';
import { IsElegantText } from './is-elegant-text.validator';
import { IsElegantEmail } from './is-elegant-email.validator';

export class CreateEmployeeDto {
  @IsString({ message: 'errors.validation.isString' })
  @IsNotEmpty({ message: 'errors.validation.isNotEmpty' })
  @MinLength(2, { message: 'errors.validation.minLength' })
  @MaxLength(50, { message: 'errors.validation.maxLength' })
  @Matches(/^[a-zA-Zа-яА-ЯєЄіІїЇґҐ\s\-']+$/, {
    message: 'errors.validation.invalidNameFormat',
  })
  @IsElegantText({ message: 'errors.validation.invalidNameFormat' })
  firstName!: string;

  @IsString({ message: 'errors.validation.isString' })
  @IsNotEmpty({ message: 'errors.validation.isNotEmpty' })
  @MinLength(2, { message: 'errors.validation.minLength' })
  @MaxLength(50, { message: 'errors.validation.maxLength' })
  @Matches(/^[a-zA-Zа-яА-ЯєЄіІїЇґҐ\s\-']+$/, {
    message: 'errors.validation.invalidNameFormat',
  })
  @IsElegantText()
  lastName!: string;

  @IsString({ message: 'errors.validation.isString' })
  @IsNotEmpty({ message: 'errors.validation.isNotEmpty' })
  @MinLength(2, { message: 'errors.validation.minLength' })
  @MaxLength(100, { message: 'errors.validation.maxLength' })
  @IsElegantText()
  position!: string;

  @IsEmail({}, { message: 'errors.validation.isEmail' })
  @IsNotEmpty({ message: 'errors.validation.isNotEmpty' })
  @MaxLength(100, { message: 'errors.validation.maxLength' })
  @IsElegantEmail()
  email!: string;

  @IsEnum(EmployeeStatus, { message: 'errors.validation.isEnum' })
  @IsNotEmpty({ message: 'errors.validation.isNotEmpty' })
  status!: EmployeeStatus;

  @IsDateString({}, { message: 'errors.validation.isDate' })
  @IsNotEmpty({ message: 'errors.validation.isNotEmpty' })
  hireDate!: string;

  @IsOptional()
  @IsEmpty({ message: 'Validation failed' })
  faxNumber?: string;
}
