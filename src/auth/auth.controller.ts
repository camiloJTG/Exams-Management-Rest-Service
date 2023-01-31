import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }
}
