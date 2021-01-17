import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { hashPassword } from 'src/common/utils/hashPassword';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserById(id: string) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`Invalid Credentials`);
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.findOne({ where: { email } });
    if (!user) throw new NotFoundException(`Invalid Credentials`);
    return user;
  }

  async findUserByEmailForRegistering(email: string) {
    const user = await this.findOne({ where: { email } });
    if (user) throw new BadRequestException(`Email already exists.`);
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const { email, password } = registerUserDto;
    await this.findUserByEmailForRegistering(email);
    const user = new User();
    user.email = email;
    user.password = await hashPassword(password);
    return this.save(user);
  }
}
