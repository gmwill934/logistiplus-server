import { EntityRepository, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { User } from 'src/user/entities/user.entity';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async findAll() {
    const users = await this.createQueryBuilder('customer')
      .innerJoinAndSelect('customer.createdByUser', 'u')
      .select(['customer', 'u.id'])
      .getMany();
    return users;
  }

  async findCustomerById(id: string) {
    const customer = await this.findOne(id);
    if (!customer) throw new NotFoundException(`Customer does not exist`);
    return customer;
  }

  async updateCustomerById(id: string, updateCustomerDto: UpdateCustomerDto) {
    await this.findCustomerById(id);
    const customer = await this.preload({ id, ...updateCustomerDto });
    return await this.save(customer);
  }

  async updateCustomerStatusById(id: string) {
    const existingCustomer = await this.findCustomerById(id);
    const customer = await this.preload({
      id,
      isActive: !existingCustomer.isActive,
    });
    return await this.save(customer);
  }

  async createCustomer(createCustomerDto: CreateCustomerDto, user: User) {
    const customer = this.create(createCustomerDto);
    customer.createdByUser = user;
    return await this.save(customer);
  }

  async deleteCustomerById(id: string) {
    const customer = await this.findCustomerById(id);
    try {
      await this.remove(customer);
      return true;
    } catch (error) {
      if (error.code === '23503') {
        throw new BadRequestException(`Customer '${id}' is in use`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
