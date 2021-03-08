import { urlClient } from '@microservice/client.module';
import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';

@Module({
  imports: [urlClient],
  controllers: [UrlController],
})
export class UrlModule {}
