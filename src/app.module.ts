import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { TripModule } from './trip/trip.module';
import { OperatorModule } from './operator/operator.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { TrailerModule } from './trailer/trailer.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CustomerModule,
    TripModule,
    OperatorModule,
    VehicleModule,
    TrailerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 54321,
      username: 'postgres',
      password: 'Fender92!',
      database: 'logistiplus',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
