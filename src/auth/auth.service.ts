import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { In, Repository } from 'typeorm';

import { User, Role } from './entities';
import { CommonService } from 'src/common/common.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { CreateRole, CreateUser, JwtPayload } from './interfaces';

// TODO: Agregar la logica para validacion de roles y endpoint
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
    private readonly commonService: CommonService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { roles = [], ...userDetail } = createUserDto;
      const encryptPassword = bcrypt.hashSync(userDetail.password, 10);
      const getRoleIds = await this.findRolesByIds(roles);
      const user = this.userRepository.create({
        ...userDetail,
        password: encryptPassword,
        roles: getRoleIds,
      });
      const { email, id, rut } = await this.userRepository.save(user);
      const token = this.getJwtToken({ email, rut, id });
      return { token };
    } catch (error) {
      this.commonService.handleError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const credentials = await this.userRepository.findOneBy({ email });
    if (!credentials) throw new UnauthorizedException('Invalid credentials');
    const correctPassword = bcrypt.compareSync(password, credentials.password);
    if (!correctPassword)
      throw new UnauthorizedException('Invalid credentials');

    const token = this.getJwtToken({
      email,
      id: credentials.id,
      rut: credentials.rut,
    });
    return { token };
  }

  async findOneUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User id ${id} not found`);
    return user;
  }

  async processAuthSeed(
    isCreate: boolean,
    createRole?: CreateRole[],
    createUser?: CreateUser[],
  ) {
    if (isCreate) {
      for await (const role of createRole) {
        const newRole = this.roleRepository.create(role);
        await this.roleRepository.save(newRole);
      }
      for await (const user of createUser) {
        await this.createUser(user);
      }
    } else {
      this.userRepository.delete({});
      this.roleRepository.delete({});
    }
  }

  private async findRolesByIds(roles: string[]) {
    roles.forEach((role) => {
      let isUuid = this.commonService.checkIsUuID(role);
      if (!isUuid)
        throw new BadRequestException(
          `The ${role} entered id is not a valid uuid`,
        );
    });
    const foundRoles = await this.roleRepository.find({
      where: { id: In(roles) },
    });

    if (foundRoles.length === 0)
      throw new NotFoundException(
        'Not found all roles you want to enter for the new user',
      );
    return foundRoles;
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
