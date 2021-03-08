import { configuration } from '@base/config/configuration';
import { Url } from '@base/models/url.model';
import { INestMicroservice } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { appOptions, urlClientSymbol } from './client.module';
import { CreateUrl } from './controllers/shorten-url/shorten-url.model';
import { MicroserviceModule } from './microservice.module';

describe('ShortenUrlHandler', () => {
  let app: INestMicroservice;
  let client: ClientProxy;

  const createUrl: CreateUrl = {
    url: 'https://google.com',
    basePath: 'https://localhost',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MicroserviceModule,
        ConfigModule.forRoot({
          load: [() => configuration],
        }),
        TypeOrmModule.forRoot({
          ...configuration.typeorm,
          autoLoadEntities: true,
        }),
      ],
      exports: [MicroserviceModule],
    }).compile();

    app = module.createNestMicroservice(appOptions);
    await app.listenAsync();
    client = app.get<ClientProxy>(urlClientSymbol);
  });

  const resetDatabase = async () => {
    const connection = getConnection();
    await connection.createQueryBuilder().delete().from(Url).execute();
    return connection;
  };

  afterAll(async () => {
    await resetDatabase();
    await app.close();
    client.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should return a url instance when called the cmd shorten_url', async () => {
    const url: Url = await client
      .send({ cmd: 'shorten_url' }, createUrl)
      .toPromise();
    expect(url.originalUrl).toBe('https://google.com');
  });

  it('should return a url in cmd get_shortened_url when is already saved', async () => {
    const url: Url = await client
      .send({ cmd: 'shorten_url' }, createUrl)
      .toPromise();

    expect(
      await client
        .send({ cmd: 'get_shortened_url' }, { code: url.code })
        .toPromise(),
    ).toStrictEqual(url);
  });
});
