export interface CreateUser {
  rut: string;
  email: string;
  password: string;
  names: string;
  maternalSurname: string;
  paternalSurname: string;
  isActive: boolean;
  roles: string[];
}
