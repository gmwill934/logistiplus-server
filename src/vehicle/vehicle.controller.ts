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
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/user/user.decorator';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleService } from './vehicle.service';

@UseGuards(JwtAuthGuard)
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}
  @Get()
  async findAll() {
    return await this.vehicleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.vehicleService.findOne(id);
  }

  @Post()
  async create(
    @Body() createVehicleDto: CreateVehicleDto,
    @GetUser() user: User,
  ) {
    return await this.vehicleService.create(createVehicleDto, user);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return await this.vehicleService.update(id, updateVehicleDto);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.vehicleService.updateStatus(id);
  }

  @Patch(':id/trailer/:trailerId')
  async updateTrailer(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('trailerId', new ParseUUIDPipe()) trailerId: string,
  ) {
    return await this.vehicleService.updateTrailer(id, trailerId);
  }

  @Patch(':id/trailer')
  async updateTrailerToEmpty(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.vehicleService.updateTrailerToEmpty(id);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.vehicleService.delete(id);
  }
}
