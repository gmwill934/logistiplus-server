import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { CustomerMiddleware } from './customer.middleware';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customer.service';
import { TripRepository } from 'src/trip/trip.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRepository, TripRepository])],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomerMiddleware).forRoutes('customer');
  }
}
