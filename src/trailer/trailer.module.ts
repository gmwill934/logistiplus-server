import { Module } from '@nestjs/common';
import { TrailerService } from './trailer.service';
import { TrailerController } from './trailer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrailerRepository } from './trailer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TrailerRepository])],
  providers: [TrailerService],
  controllers: [TrailerController],
  exports: [TrailerService],
})
export class TrailerModule {}
