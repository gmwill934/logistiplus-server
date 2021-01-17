import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.jwt-guard';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { OperatorService } from './operator.service';

@UseGuards(JwtAuthGuard)
@Controller('operator')
export class OperatorController {
  constructor(private readonly operatorService: OperatorService) {}
  @Get()
  async findAll() {
    return await this.operatorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.operatorService.findOne(id);
  }

  @Post()
  async create(@Body() createOperatorDto: CreateOperatorDto) {
    return await this.operatorService.create(createOperatorDto);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateOperatorDto: UpdateOperatorDto,
  ) {
    return await this.operatorService.update(id, updateOperatorDto);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id', new ParseIntPipe()) id: number) {
    return await this.operatorService.updateStatus(id);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return await this.operatorService.delete(id);
  }
}
