import { EntityRepository, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
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

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    const customer = this.create(createCustomerDto);
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
