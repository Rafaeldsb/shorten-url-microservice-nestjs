import { Url } from '@infrastructure/postgres/models/url.model';
import { urlRepositorySymbol } from '@base/repositories/url.repository';
import { UrlRepositoryPostgres } from '@infrastructure/postgres/providers/url.provider';
import { CacheModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { urlClient } from './client.module';
import { GetShortenedUrlController } from './controllers/get-shortened-url/get-shortened-url.controller';
import { GetShortenedUrlHandler } from './controllers/get-shortened-url/get-shortened-url.handler';
import { ShortenUrlController } from './controllers/shorten-url/shorten-url.controller';
import { ShortenUrlHandler } from './controllers/shorten-url/shorten-url.handler';
import { StringHelper } from './helpers/string.helper';
import { UrlHelper } from './helpers/url.helper';

const providers: Provider[] = [
  {
    provide: urlRepositorySymbol,
    useClass: UrlRepositoryPostgres,
  },
  StringHelper,
  UrlHelper,
  ShortenUrlHandler,
  GetShortenedUrlHandler,
];

@Module({
  imports: [urlClient, CacheModule.register(), TypeOrmModule.forFeature([Url])],
  controllers: [ShortenUrlController, GetShortenedUrlController],
  providers: providers,
})
export class MicroserviceModule {}
