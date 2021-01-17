import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}
  async findAll() {
    return await this.customerRepository.findAll();
  }

  async findOne(id: string) {
    return await this.customerRepository.findCustomerById(id);
  }

  async create(createCustomerDto: CreateCustomerDto, user: User) {
    return await this.customerRepository.createCustomer(
      createCustomerDto,
      user,
    );
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return await this.customerRepository.updateCustomerById(
      id,
      updateCustomerDto,
    );
  }

  async updateStatus(id: string) {
    return await this.customerRepository.updateCustomerStatusById(id);
  }

  async delete(id: string) {
    return await this.customerRepository.deleteCustomerById(id);
  }
}
