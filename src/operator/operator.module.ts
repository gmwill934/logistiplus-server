import { Module } from '@nestjs/common';
import { OperatorService } from './operator.service';
import { OperatorController } from './operator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatorRepository } from './operator.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OperatorRepository])],
  controllers: [OperatorController],
  providers: [OperatorService],
  exports: [OperatorService],
})
export class OperatorModule {}
