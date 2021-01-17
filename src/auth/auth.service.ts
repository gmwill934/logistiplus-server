import { Injectable, NotFoundException } from '@nestjs/common';
import { verifyPassword } from 'src/common/utils/verifyPassword';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    const isValidPassword = await verifyPassword(pass, user.password);
    if (user && isValidPassword) {
      return user;
    }
    throw new NotFoundException(`Invalid Credentials`);
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    return await this.userService.registerUser(registerUserDto);
  }
}
