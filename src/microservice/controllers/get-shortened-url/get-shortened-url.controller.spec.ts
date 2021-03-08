import { Test, TestingModule } from '@nestjs/testing';
import { GetShortenedUrlController } from './get-shortened-url.controller';
import { GetShortenedUrlHandler } from './get-shortened-url.handler';
import { GetUrl } from './get-shortened-url.model';

describe('ShortenUrlController', () => {
  let controller: GetShortenedUrlController;
  let handler: GetShortenedUrlHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetShortenedUrlController],
      providers: [
        {
          provide: GetShortenedUrlHandler,
          useClass: jest
            .fn()
            .mockImplementation(() => ({ execute: jest.fn() })),
        },
      ],
    }).compile();

    controller = module.get<GetShortenedUrlController>(
      GetShortenedUrlController,
    );
    handler = module.get<GetShortenedUrlHandler>(GetShortenedUrlHandler);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call handle.execute', () => {
    const data: GetUrl = {
      code: 'abcde123',
    };
    controller.getShortened(data);
    expect(handler.execute).toBeCalled();
  });
});
