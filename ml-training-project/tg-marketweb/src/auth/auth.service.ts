import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaClient,
  ) {}

  async login(LoginDto: LoginDto) {
    const user = await this.validateuser(LoginDto);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const token = await this.usersService.getToken(user.id, user.email);
    await this.prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        token: token.access_token,
      },
    });
    return user;
  }

  async logout(userId: number) {
    const token = await this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        secret: 'get-token',
        expiresIn: '1h',
      },
    );
    return { access_token: token };
  }

  async validateuser(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email.toLowerCase() },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const isPasswordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (isPasswordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async decodeToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}
