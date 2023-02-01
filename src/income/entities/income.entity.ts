import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { Leadership } from './leadership.entity';
import { User } from 'src/auth/entities';

@Entity()
export class Income {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  rut: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column('text')
  names: string;

  @Column('text')
  paternalSurname: string;

  @Column('text')
  maternalSurname: string;

  @Column({ type: 'numeric', unique: true })
  phoneNumber: number;

  @Column('text')
  jobName: string;

  @Column({ type: 'numeric', unique: true })
  idWf: number;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Company, (company) => company.income)
  company: Company;

  @ManyToOne(() => Leadership, (leadership) => leadership.income)
  leadership: Leadership;

  @ManyToOne(() => User, (user) => user.income)
  user: User;
}
