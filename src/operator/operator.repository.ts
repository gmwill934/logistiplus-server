import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { Operator } from './entities/operator.entity';

@EntityRepository(Operator)
export class OperatorRepository extends Repository<Operator> {
  async findAll() {
    const operators = await this.createQueryBuilder('operator')
      .innerJoinAndSelect('operator.createdByUser', 'o')
      .select(['operator', 'o.id'])
      .getMany();
    return operators;
  }
  async findOperatorById(id: number) {
    const operator = await this.findOne(id);
    if (!operator) throw new NotFoundException(`Operator does not exist`);
    return operator;
  }

  async createOperator(createOperatorDto: CreateOperatorDto, user: User) {
    const operator = this.create(createOperatorDto);
    operator.createdByUser = user;
    return await this.save(operator);
  }

  async updateOperatorById(id: number, updateOperatorDto: UpdateOperatorDto) {
    const operator = await this.preload({ id, ...updateOperatorDto });
    return await this.save(operator);
  }

  async updateOperatorStatusById(id: number) {
    const existingOperator = await this.findOperatorById(id);
    const operator = await this.preload({
      id,
      isActive: !existingOperator.isActive,
    });
    return await this.save(operator);
  }

  async deleteOperatorById(id: number) {
    const operator = await this.findOperatorById(id);
    try {
      await this.remove(operator);
      return true;
    } catch (error) {
      if (error.code === '23503') {
        throw new BadRequestException(`Operator '${id}' is in use`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
