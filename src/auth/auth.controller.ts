import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Request as Req } from 'express';
import { LocalAuthGuard } from './auth.local-guard';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: Req) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.register(registerUserDto);
  }
}
