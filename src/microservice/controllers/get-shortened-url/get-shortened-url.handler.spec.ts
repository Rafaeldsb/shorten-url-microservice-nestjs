import { Url } from '@base/models/url.model';
import {
  UrlRepository,
  urlRepositorySymbol,
} from '@base/repositories/url.repository';
import { CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { GetShortenedUrlHandler } from './get-shortened-url.handler';

describe('ShortenUrlHandler', () => {
  let handler: GetShortenedUrlHandler;
  let cache: Cache;
  let urlRepository: UrlRepository;

  const url: Url = new Url({
    code: 'abc',
    expiration: new Date().toISOString(),
    originalUrl: 'https://google.com/',
    shortenedUrl: 'https://teste.com/abc',
  });

  beforeEach(async () => {
    const cacheMock = jest.fn().mockImplementation(() => ({ get: jest.fn() }));
    const urlRepositoryMock = jest.fn().mockImplementation(() => ({
      getByCode: jest.fn(),
    }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetShortenedUrlHandler,
        { provide: CACHE_MANAGER, useClass: cacheMock },
        { provide: urlRepositorySymbol, useClass: urlRepositoryMock },
      ],
    }).compile();

    handler = module.get<GetShortenedUrlHandler>(GetShortenedUrlHandler);
    cache = module.get<Cache>(CACHE_MANAGER);
    urlRepository = module.get<UrlRepository>(urlRepositorySymbol);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return cache Url when has it and not call db repository', async () => {
    jest.spyOn(cache, 'get').mockResolvedValue(url);
    expect(await handler.execute({ code: 'abc' }).toPromise()).toBe(url);
    expect(urlRepository.getByCode).toBeCalledTimes(0);
  });

  it('should return db Url when no has on db repository', async () => {
    jest.spyOn(cache, 'get').mockResolvedValue(undefined);
    jest.spyOn(urlRepository, 'getByCode').mockResolvedValue(url);
    expect(await handler.execute({ code: 'abc' }).toPromise()).toBe(url);
    expect(cache.get).toBeCalledTimes(1);
    expect(urlRepository.getByCode).toBeCalled();
  });
});
