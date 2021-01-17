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
import { CreateTrailerDto } from './dto/create-trailer.dto';
import { UpdateTrailerDto } from './dto/update-trailer.dto';
import { TrailerService } from './trailer.service';

@UseGuards(JwtAuthGuard)
@Controller('trailer')
export class TrailerController {
  constructor(private readonly trailerService: TrailerService) {}

  @Get()
  async findAll() {
    return await this.trailerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.trailerService.findOne(id);
  }

  @Post()
  async create(@Body() createTrailerDto: CreateTrailerDto) {
    return await this.trailerService.create(createTrailerDto);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrailerDto: UpdateTrailerDto,
  ) {
    return await this.trailerService.update(id, updateTrailerDto);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.trailerService.updateStatus(id);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.trailerService.delete(id);
  }
}
