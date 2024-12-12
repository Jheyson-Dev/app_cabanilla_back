import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('/profile/:id')
  getProfile(@Param('id') id: string) {
    return this.authService.getprofile(id);
  }

  // @Post('/register')
  // register(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.register();
  // }
}
