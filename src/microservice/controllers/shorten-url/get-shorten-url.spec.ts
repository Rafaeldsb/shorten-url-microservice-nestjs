import { Test, TestingModule } from '@nestjs/testing';
import { ShortenUrlController } from './shorten-url.controller';
import { ShortenUrlHandler } from './shorten-url.handler';
import { CreateUrl } from './shorten-url.model';

describe('ShortenUrlController', () => {
  let controller: ShortenUrlController;
  let handler: ShortenUrlHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortenUrlController],
      providers: [
        {
          provide: ShortenUrlHandler,
          useClass: jest
            .fn()
            .mockImplementation(() => ({ execute: jest.fn() })),
        },
      ],
    }).compile();

    controller = module.get<ShortenUrlController>(ShortenUrlController);
    handler = module.get<ShortenUrlHandler>(ShortenUrlHandler);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call handle.execute', () => {
    const data: CreateUrl = {
      url: 'http://google.com',
      basePath: 'teste.com',
    };
    controller.shorten(data);
    expect(handler.execute).toBeCalled();
  });
});
