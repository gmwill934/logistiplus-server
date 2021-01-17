import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async findOneById(id: string) {
    return await this.userRepository.findUserById(id);
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    return await this.userRepository.registerUser(registerUserDto);
  }
}
