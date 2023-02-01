import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Income } from './income.entity';

@Entity()
export class Leadership {
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

  @Column('text')
  jobName: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Income, (income) => income.leadership)
  income: Income[];
}
