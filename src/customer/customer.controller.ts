import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.jwt-guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@UseGuards(JwtAuthGuard)
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get()
  async findAll() {
    return await this.customerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.customerService.findOne(id);
  }

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customerService.create(createCustomerDto);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return await this.customerService.update(id, updateCustomerDto);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.customerService.updateStatus(id);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.customerService.delete(id);
  }
}
