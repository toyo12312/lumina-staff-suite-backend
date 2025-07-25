import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employer.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
