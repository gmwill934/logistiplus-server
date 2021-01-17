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
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripService } from './trip.service';

@UseGuards(JwtAuthGuard)
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}
  @Get()
  async findAll() {
    return await this.tripService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.tripService.findOne(id);
  }

  @Post()
  async create(@Body() createTripDto: CreateTripDto) {
    return await this.tripService.create(createTripDto);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return await this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tripService.delete(id);
  }
}
