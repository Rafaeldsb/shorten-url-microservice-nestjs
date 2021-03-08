import { Url } from '@base/models/url.model';
import { UrlRepository, urlRepositorySymbol } from '@base/repositories/url.repository';
import { StringHelper } from '@microservice/helpers/string.helper';
import { UrlHelper } from '@microservice/helpers/url.helper';
import { CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { ShortenUrlController } from './shorten-url.controller';
import { ShortenUrlHandler } from './shorten-url.handler';
import { CreateUrl } from './shorten-url.model';

describe('ShortenUrlHandler', () => {
  let handler: ShortenUrlHandler;
  let cache: Cache;
  let urlRepository: UrlRepository;

  beforeEach(async () => {
    const cacheMock = jest.fn().mockImplementation(() => ({ set: jest.fn() }));
    const urlRepositoryMock = jest.fn().mockImplementation(() => ({
      add: jest.fn(),
      existsByCode: jest.fn().mockReturnValue(false),
    }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortenUrlHandler,
        StringHelper,
        UrlHelper,
        { provide: CACHE_MANAGER, useClass: cacheMock },
        { provide: urlRepositorySymbol, useClass: urlRepositoryMock },
      ],
    }).compile();

    handler = module.get<ShortenUrlHandler>(ShortenUrlHandler);
    cache = module.get<Cache>(CACHE_MANAGER);
    urlRepository = module.get<UrlRepository>(urlRepositorySymbol);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return a Url instance given a url and basePath', () => {
    const data: CreateUrl = {
      url: 'http://google.com',
      basePath: 'teste.com',
    };

    expect(handler.execute(data).toPromise()).resolves.toBeInstanceOf(Url);
  });

  it('should be called urlRepository.add and cache.set', async () => {
    const data: CreateUrl = {
      url: 'http://google.com',
      basePath: 'teste.com',
    };
    await handler.execute(data).toPromise();

    expect(urlRepository.add).toBeCalled();
    expect(cache.set).toBeCalled();
  });
});
