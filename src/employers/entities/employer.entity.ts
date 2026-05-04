import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum EmployeeStatus {
  Active = 'active',
  OnLeave = 'on_leave',
  Terminated = 'terminated',
}

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  position!: string;

  @Column({ unique: true })
  email!: string;

  @Column({
    type: 'enum',
    enum: EmployeeStatus,
    default: EmployeeStatus.Active,
  })
  status!: EmployeeStatus;

  @Column({ type: 'date' })
  hireDate!: string;
}
