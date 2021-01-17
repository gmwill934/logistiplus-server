import { Injectable, NotFoundException } from '@nestjs/common';
import { verifyPassword } from 'src/common/utils/verifyPassword';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);
    const isValidPassword = await verifyPassword(pass, user.password);
    if (user && isValidPassword) {
      //eslint-disable-next-line
      const { password, ...result } = user;
      return result;
    }
    throw new NotFoundException(`Invalid Credentials`);
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    return await this.userService.registerUser(registerUserDto);
  }
}
