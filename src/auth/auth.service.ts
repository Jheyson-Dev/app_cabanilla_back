import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { envs } from 'src/config';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { username: loginDto.username },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // COMPARACION DE LAS CONTRASEÑAS
    const pwd = bcrypt.compareSync(loginDto.password, user.password);

    const payload = user;
    const token = this.jwtService.sign(payload, {});

    if (pwd === true) {
      return {
        token,
        message: `lOGIN SUCCESFULL`,
      };
    } else {
      throw new BadRequestException('Password Incorrect');
    }
  }

  verifyToken(token: string) {
    try {
      const {} = this.jwtService.verify(token, {
        secret: envs.JWT_SECRET,
      });
    } catch (err) {
      throw new NotFoundException('Token not found');
    }
  }

  register() {
    return `This action returns all auth`;
  }
}
