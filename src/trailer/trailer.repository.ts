import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTrailerDto } from './dto/create-trailer.dto';
import { UpdateTrailerDto } from './dto/update-trailer.dto';
import { Trailer } from './entities/trailer.entity';

@EntityRepository(Trailer)
export class TrailerRepository extends Repository<Trailer> {
  async findTrailerById(id: string) {
    const trailer = await this.findOne(id);
    if (!trailer) throw new NotFoundException(`Trailer does not exist`);
    return trailer;
  }

  async updateTrailerById(id: string, updateTrailerDto: UpdateTrailerDto) {
    await this.findTrailerById(id);
    const trailer = await this.preload({ id, ...updateTrailerDto });
    return await this.save(trailer);
  }

  async updateTrailerStatusById(id: string) {
    const existingTrailer = await this.findTrailerById(id);
    const trailer = await this.preload({
      id,
      isActive: !existingTrailer.isActive,
    });
    return await this.save(trailer);
  }

  async createTrailer(createTrailerDto: CreateTrailerDto) {
    const trailer = this.create(createTrailerDto);
    return await this.save(trailer);
  }

  async deleteTrailer(id: string) {
    const trailer = await this.findTrailerById(id);
    try {
      await this.remove(trailer);
      return true;
    } catch (error) {
      if (error.code === '23503') {
        throw new BadRequestException(`Trailer '${id}' is in use`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
