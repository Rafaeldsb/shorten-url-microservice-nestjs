import { Url } from '@base/models/url.model';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GetShortenedUrlHandler } from './get-shortened-url.handler';
import { GetUrl } from './get-shortened-url.model';

@Controller()
export class GetShortenedUrlController {
  constructor(private readonly handler: GetShortenedUrlHandler) {}

  @MessagePattern({ cmd: 'get_shortened_url' })
  public getShortened(data: GetUrl): Observable<Url> {
    return this.handler.execute(data);
  }
}
