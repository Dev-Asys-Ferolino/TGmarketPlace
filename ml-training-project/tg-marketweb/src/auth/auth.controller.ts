import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
    return await this.usersService.createuser(createUserDto);
  }

  @Post('login')
  async login(@Body() LoginDto: LoginDto) {
    return await this.authService.login(LoginDto);
  }

  @Post('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return await this.usersService.changePassword(changePasswordDto);
  }

  @Get('get-token')
  async getToken(@Body() userId: number, @Body() email: string) {
    return await this.usersService.getToken(userId, email);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.usersService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.usersService.resetPassword(resetPasswordDto);
  }

  @Post('verify-reset-code')
  async verifyResetCode(@Body() verifyCodeDto: VerifyCodeDto) {
    return await this.usersService.verifyResetCode(verifyCodeDto);
  }

  @Post('logout')
  async logout(@Body() userId: number) {
    return await this.authService.logout(userId);
  }
}
