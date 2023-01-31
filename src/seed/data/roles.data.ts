import { v4 as uuid } from 'uuid';
import { CreateRole } from '../../auth/interfaces';

export const uuidRef = {
  assistant: uuid(),
  administrator: uuid(),
  executive: uuid(),
  development: uuid(),
};

export const roleData: CreateRole[] = [
  {
    id: uuidRef.administrator,
    name: 'Administrator',
    isActive: true,
  },
  {
    id: uuidRef.assistant,
    name: 'Assistant',
    isActive: true,
  },
  {
    id: uuidRef.executive,
    name: 'Executive',
    isActive: true,
  },
  {
    id: uuidRef.development,
    name: 'Development',
    isActive: true,
  },
];
