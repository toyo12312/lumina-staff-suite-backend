import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Використовуємо той самий Enum, що й на фронтенді для консистентності
export enum EmployeeStatus {
  Active = 'active',
  OnLeave = 'on_leave',
  Terminated = 'terminated',
}

@Entity('employees') // Вказує, що цей клас відповідає таблиці 'employees'
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  position: string;

  @Column({ unique: true }) // Email має бути унікальним
  email: string;

  @Column({
    type: 'enum',
    enum: EmployeeStatus,
    default: EmployeeStatus.Active,
  })
  status: EmployeeStatus;

  @Column({ type: 'date' })
  hireDate: string;
}
