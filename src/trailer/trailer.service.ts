import { Injectable } from '@nestjs/common';
import { CreateTrailerDto } from './dto/create-trailer.dto';
import { UpdateTrailerDto } from './dto/update-trailer.dto';
import { TrailerRepository } from './trailer.repository';

@Injectable()
export class TrailerService {
  constructor(private readonly trailerRepository: TrailerRepository) {}
  async findAll() {
    return await this.trailerRepository.find();
  }

  async findOne(id: string) {
    return await this.trailerRepository.findTrailerById(id);
  }

  async create(createTrailerDto: CreateTrailerDto) {
    return await this.trailerRepository.createTrailer(createTrailerDto);
  }

  async update(id: string, updateTrailerDto: UpdateTrailerDto) {
    return await this.trailerRepository.updateTrailerById(id, updateTrailerDto);
  }

  async updateStatus(id: string) {
    return await this.trailerRepository.updateTrailerStatusById(id);
  }

  async delete(id: string) {
    return await this.trailerRepository.deleteTrailer(id);
  }
}
