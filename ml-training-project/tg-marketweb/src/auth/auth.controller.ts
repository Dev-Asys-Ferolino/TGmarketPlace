import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ChangePasswordDto } from 'src/users/dto/change-password.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ForgotPasswordDto } from 'src/users/dto/forgot-password.dto';
import { ResetPasswordDto } from 'src/users/dto/reset-password.dto';
import { VerifyCodeDto } from 'src/users/dto/verify-code.dto';
import { verify } from 'crypto';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.createuser(createUserDto);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('login')
  async login(@Body() LoginDto: LoginDto) {
    try {
      const user = await this.authService.login(LoginDto);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    try {
      const user = await this.usersService.changePassword(changePasswordDto);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('get-token')
  async getToken(@Body() userId: number, @Body() email: string) {
    try {
      const token = await this.usersService.getToken(userId, email);
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    try {
      const status = await this.usersService.forgotPassword(forgotPasswordDto);
      return status;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      const status = await this.usersService.resetPassword(resetPasswordDto);
      return status;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('verify-reset-code')
  async verifyResetCode(@Body() verifyCodeDto: VerifyCodeDto) {
    try {
      const status = await this.usersService.verifyResetCode(verifyCodeDto);
      return status;
    } catch (error) {
      throw new Error(error);
    }
  }
  @Post('logout')
  async logout(@Body() userId: number) {
    try {
      const status = await this.authService.logout(userId);
      return status;
    } catch (error) {
      throw new Error(error);
    }
  }
}
