import { configuration } from '@base/config/configuration';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MicroserviceModule } from './microservice/microservice.module';
import { RestModule } from './rest/rest.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => configuration],
    }),
    MicroserviceModule,
    RestModule,
    TypeOrmModule.forRoot({
      ...configuration.typeorm,
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
