import { urlClient } from '@microservice/client.module';
import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';

describe('UrlController', () => {
  let controller: UrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [urlClient],
      controllers: [UrlController],
    }).compile();

    controller = module.get<UrlController>(UrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
