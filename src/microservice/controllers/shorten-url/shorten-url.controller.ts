import { Url } from '@base/models/url.model';
import { ShortenUrlHandler } from '@microservice/controllers/shorten-url/shorten-url.handler';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateUrl } from './shorten-url.model';

@Controller()
export class ShortenUrlController {
  constructor(private readonly handler: ShortenUrlHandler) {}

  @MessagePattern({ cmd: 'shorten_url' })
  public shorten(data: CreateUrl): Observable<Url> {
    return this.handler.execute(data);
  }
}
