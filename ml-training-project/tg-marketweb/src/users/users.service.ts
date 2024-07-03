import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Token } from './types/token';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from '@prisma/client';
import * as nodemailer from 'nodemailer';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { generateResetCode } from './utils/token.utils';
import { VerifyCodeDto } from './dto/verify-code.dto';

import { text } from 'stream/consumers';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createuser(CreateUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: CreateUserDto.email,
        },
      });
      if (user) {
        throw new Error('User already exists');
      }
      const newUser = await this.prisma.user.create({
        data: {
          ...CreateUserDto,
          password: await hash(CreateUserDto.password, 10),
        },
      });
      const { password, ...result } = newUser;
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findbyemail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findbyid(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: changePasswordDto.email,
        },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      if (
        !(await bcrypt.compare(changePasswordDto.oldPassword, user.password))
      ) {
        throw new UnauthorizedException('Old password is incorrect');
      }

      if (changePasswordDto.newPassword === changePasswordDto.oldPassword) {
        throw new UnauthorizedException('New password is same as old password');
      }
      const newUser = await this.prisma.user.update({
        where: {
          email: changePasswordDto.email,
        },
        data: {
          password: await hash(changePasswordDto.newPassword, 10),
        },
      });
      const { password, ...result } = newUser;
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: forgotPasswordDto.email,
        },
      });
      if (!user) {
        throw new Error('User not found');
      }
      const resetCode = generateResetCode();
      user.resetCode = resetCode;
      user.resetCodeExpiresAt = new Date(Date.now() + 3600000);
      await this.prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          resetCode: resetCode,
          resetCodeExpiresAt: user.resetCodeExpiresAt,
        },
      });
      const emailData = {
        to: user.email,
        from: 'michael.desucatan@mlhuillier.com',
        subject: 'Reset Password',
        text: 'Your reset code is ' + resetCode,
      };
      await this.sendMail(emailData);
      return { message: 'Password reset email sent' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyResetCode(verifyCodeDto: VerifyCodeDto): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: verifyCodeDto.email,
        },
      });
      if (user.resetCode !== verifyCodeDto.resetCode) {
        throw new Error('Reset code is incorrect');
      }
      if (user.resetCodeExpiresAt < new Date()) {
        throw new Error('Reset code expired');
      }
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserByResetCode(email: string, resetCode: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
          resetCode: resetCode,
        },
      });
      if (!user) {
        throw new Error('User not found');
      }
      if (user.resetCodeExpiresAt < new Date()) {
        throw new Error('Reset code expired');
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: resetPasswordDto.email,
        },
      });
      if (!user) {
        throw new Error('User not found');
      }
      const isPasswordMatch = await bcrypt.compare(
        resetPasswordDto.password,
        user.password,
      );
      if (isPasswordMatch) {
        throw new Error('Password should not match old password');
      }
      const newUser = await this.prisma.user.update({
        where: {
          email: resetPasswordDto.email,
        },
        data: {
          password: await hash(resetPasswordDto.password, 10),
        },
      });
      const { password, ...result } = newUser;
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async sendMail(emailData: any) {
    try {
      await this.mailerService(emailData);
      return { message: 'Password reset email sent' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async mailerService(emailData: any) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'michael.desucatan@mlhuillier.com',
        pass: 'fzhbgfjdafbvxcfy',
      },
    });
    return transporter.sendMail(emailData);
  }

  async getToken(userId: number, email: string): Promise<Token> {
    const [at] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        { secret: 'get-token', expiresIn: '1h' },
      ),
    ]);
    return { access_token: at };
  }
}
