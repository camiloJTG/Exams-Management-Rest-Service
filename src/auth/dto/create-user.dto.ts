import {
  IsArray,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(60)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsString()
  @Matches(/^[0-9]+[-|‐]{1}[0-9kK]{1}$/, {
    message: 'The format of the routine should be as follows: 11111111-1',
  })
  rut: string;

  @IsString()
  @MinLength(1)
  names: string;

  @IsString()
  @MinLength(1)
  paternalSurname: string;

  @IsString()
  @MinLength(1)
  maternalSurname: string;

  @IsString({ each: true })
  @IsArray()
  roles: string[];
}
