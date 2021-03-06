import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/user/user.decorator';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { OperatorRepository } from './operator.repository';

@Injectable()
export class OperatorService {
  constructor(private readonly operatorRepository: OperatorRepository) {}
  async findAll() {
    return await this.operatorRepository.findAll();
  }

  async findOne(id: number) {
    return await this.operatorRepository.findOperatorById(id);
  }

  async create(createOperatorDto: CreateOperatorDto, user: User) {
    return await this.operatorRepository.createOperator(
      createOperatorDto,
      user,
    );
  }

  async update(id: number, updateOperatorDto: UpdateOperatorDto) {
    return await this.operatorRepository.updateOperatorById(
      id,
      updateOperatorDto,
    );
  }

  async updateStatus(id: number) {
    return await this.operatorRepository.updateOperatorStatusById(id);
  }

  async delete(id: number) {
    return await this.operatorRepository.deleteOperatorById(id);
  }
}
