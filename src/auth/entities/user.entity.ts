import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  rut: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  names: string;

  @Column('text')
  paternalSurname: string;

  @Column('text')
  maternalSurname: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  roles: Role[];
}
